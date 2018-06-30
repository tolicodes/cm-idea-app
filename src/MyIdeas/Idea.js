import React, { Fragment, Component } from 'react';
import styled from 'styled-components';
import { times, pick } from 'lodash';
import autoBind from 'react-autobind';

import EditButtonImage from '../assets/pen.png';
import DeleteButtonImage from '../assets/bin.png';
import SaveButtonImage from '../assets/check.png';
import RemoveButtonImage from '../assets/x.png';

import {
  Input
} from '../styles';

import ConfirmationModal from './ConfirmationModal';

const NUMBER_OF_OPTIONS = 10;

const BULLET_CELL_WIDTH = 32;
const IDEA_CONTENT_CELL_WIDTH = 482;

export const LEFT_WIDTH = BULLET_CELL_WIDTH + IDEA_CONTENT_CELL_WIDTH;

export const FIELD_WIDTH = 63;

// check + x + space in between + left margin
export const BUTTONS_WIDTH = 87;

const IdeaWrapper = styled.li`
  display: flex;
  flex-direction: row;
  width: 100%;

  align-items: center;

  margin-bottom: 36px;
`;

const BulletCell = styled.div`
  flex: ${BULLET_CELL_WIDTH};
`;

const Bullet = styled.div`
  background: rgba(42,56,66,0.40);
  height: 8px;
  width: 8px;
  border-radius: 4px;

  margin: 0 16px;
`;

const IdeaContentCell = styled.div`
  flex: ${IDEA_CONTENT_CELL_WIDTH};
`;

const IdeaContent = styled.div`

`;

const IdeaContentInput = styled(Input)`
  flex: 422;
  margin-bottom: 0;
  border-bottom: 1px solid rgba(42,56,66,0.50);
`;

export const Fields = styled.div`
  display: flex;
  flex: ${FIELD_WIDTH * 4 + 60};
  margin-left: 60px;
`;

export const Field = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: ${FIELD_WIDTH};
`;

const Select = styled.select`
  background-image: linear-gradient(-180deg, #F2F2F2 0%, #D4D4D4 100%);
  border: 1px solid #979797;
  box-shadow: 0 1px 2px 0 rgba(0,0,0,0.20), inset 0 2px 0 0 #FFFFFF;
  border-radius: 3px;
  width: 49px;
  height: 36px;
`;

const Buttons = styled.div`
  display: flex;
  flex: ${BUTTONS_WIDTH};
  cursor: pointer;
`;

const Button = styled.button`
  border: none;
  cursor: pointer;
  margin: 0 11px;
`;

const EditButton = styled(Button)`
  width: 20px;
  height: 20px;
  background: url(${EditButtonImage});
`;

const DeleteButton = styled(Button)`
  background: url(${DeleteButtonImage});
  width: 16px;
  height: 20px;
`;

const SaveButton = styled(Button)`
  width: 21px;
  height: 16px;
  background: url(${SaveButtonImage});
`;

const RemoveButton = styled(Button)`
  width: 16px;
  height: 16px;
  background: url(${RemoveButtonImage});
`;

export default class Idea extends Component {
  constructor({ content, impact, ease, confidence }) {
    super();
    autoBind(this);

    this.state = {
      content,
      impact,
      ease,
      confidence,
      average_score: this.getAverageScore({ impact, ease, confidence }),
    };
  }

  getAverageScore({ impact, ease, confidence }) {
    return Math.round((impact + ease + confidence ) / 3);
  }

  updateAverageScore() {
    const {
      impact,
      ease,
      confidence
    } = this.state;

    this.setState({
      average_score: this.getAverageScore({ impact, ease, confidence })
    });
  }

  componentWillReceiveProps({ impact, ease, confidence, ...rest }) {
    this.setState({
      ...rest,
      average_score: this.getAverageScore({ impact, ease, confidence }),
    });
  }

  renderOptions () {
    return (
      <Fragment>
        {times(NUMBER_OF_OPTIONS, n => (
          <option key={n}>
            {n + 1}
          </option>
        ))}
      </Fragment>
    )
  }

  onChangeField(name, e) {
    this.setState(
      { [name]: parseInt(e.target.value, 0) },
      this.updateAverageScore,
    );
  }

  onChangeContent(e) {
    this.setState({ content: e.target.value });
  }

  onChangeImpact(e) {
    this.onChangeField('impact', e);
  }

  onChangeEase(e) {
    this.onChangeField('ease', e);
  }

  onChangeConfidence(e) {
    this.onChangeField('confidence', e);
  }

  onClickSave() {
    const {
      id,
      newlyCreated,
      updateIdea,
      createIdea,
    } = this.props;

    const propsToSave = pick(
      this.state,
      [
        'content',
        'impact',
        'ease',
        'confidence',
        'average_score',
      ],
    );

    if (!newlyCreated) {
      updateIdea(id, propsToSave);
    } else {
      createIdea(id, propsToSave);
    }
  }

  onClickRemove() {
    this.setState({
      showRemoveModal: true
    });
  }

  onCancelRemove() {
    this.setState({
      showRemoveModal: false
    });
  }

  onConfirmRemove() {
    const {
      id,
      newlyCreated,
      deleteIdea,
      removeIdea,
    } = this.props;

    if (!newlyCreated) {
      deleteIdea(id);
    } else {
      removeIdea(id);
    }
  }

  onClickEdit() {
    const {
      id,
      editIdea,
    } = this.props;

    editIdea(id, true);
  }

  renderRemoveModal() {
    const { showRemoveModal } = this.state;
    return (
      showRemoveModal
        ? (
          <ConfirmationModal
            hideModal={this.onCancelRemove}
            confirm={this.onConfirmRemove}
          />
        )
        : null
    )
  }

  renderEditIdea() {
    const {
      content,
      impact,
      ease,
      confidence,
      average_score,
    } = this.state;

    return (
      <IdeaWrapper>
        <BulletCell>
          <Bullet/>
        </BulletCell>

        <IdeaContentCell>
          <IdeaContentInput value={content} onChange={this.onChangeContent} />
        </IdeaContentCell>

        <Fields>
          <Field>
            <Select value={impact} onChange={this.onChangeImpact} >
              {this.renderOptions()}
            </Select>
          </Field>

          <Field>
            <Select value={ease} onChange={this.onChangeEase} >
              {this.renderOptions()}
            </Select>
          </Field>

          <Field>
            <Select value={confidence} onChange={this.onChangeConfidence} >
              {this.renderOptions()}
            </Select>
          </Field>

          <Field>{average_score}</Field>
        </Fields>

        <Buttons>
          <SaveButton onClick={this.onClickSave} />
          <RemoveButton onClick={this.onClickRemove}/>
        </Buttons>

        {this.renderRemoveModal()}
      </IdeaWrapper>
    );
  }

  renderIdea() {
    const {
      content,
      impact,
      ease,
      confidence,
      average_score,
    } = this.state;

    return (
      <IdeaWrapper>
        <BulletCell>
          <Bullet/>
        </BulletCell>

        <IdeaContentCell>
          <IdeaContent>{content}</IdeaContent>
        </IdeaContentCell>

        <Fields>
          <Field>{impact}</Field>
          <Field>{ease}</Field>
          <Field>{confidence}</Field>
          <Field>{average_score}</Field>
        </Fields>

        <Buttons>
          <EditButton onClick={this.onClickEdit} />
          <DeleteButton onClick={this.onClickRemove} />
        </Buttons>

        {this.renderRemoveModal()}
      </IdeaWrapper>
    );
  }

  render() {
    const {
      editMode
    } = this.props;

    return editMode ? this.renderEditIdea() : this.renderIdea();
  }
}
