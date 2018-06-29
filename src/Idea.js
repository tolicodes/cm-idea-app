import React, { Component } from 'react';
import styled from 'styled-components';

import EditButtonImage from './assets/pen.png';
import DeleteButtonImage from './assets/bin.png';
import SaveButtonImage from './assets/check.png';
import RemoveButtonImage from './assets/x.png';

const IdeaWrapper = styled.div`
  display: flex;
`;

const IdeaContent = styled.div`

`;

const IdeaContentInput = styled.input`

`;

const Field = styled.div`

`;

const Select = styled.select`

`;

const Buttons = styled.div`

`;

const Button = styled.button`
  width: 20px;
  height: 20px;
`;

const EditButton = styled(Button)`
  background: url(${EditButtonImage});
`;

const DeleteButton = styled(Button)`
  background: url(${DeleteButtonImage});
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
  renderEditIdea() {
    const {
      content,
      impact,
      ease,
      confidence,
      average_score
    } = this.props;

    return (
      <IdeaWrapper>
        <IdeaContentInput value={content}/>

        <Field>
          <Select value={impact}>
            {this.renderOptions()}
          </Select>
        </Field>

        <Field>
          <Select value={ease}>
            {this.renderOptions()}
          </Select>
        </Field>

        <Field>
          <Select value={confidence}>
            {this.renderOptions()}
          </Select>
        </Field>

        <Field>{average_score}</Field>

        <Buttons>
          <SaveButton/>
          <RemoveButton/>
        </Buttons>
      </IdeaWrapper>
    );
  }

  renderIdea() {
    const {
      content,
      impact,
      ease,
      confidence,
      average_score
    } = this.props;

    return (
      <IdeaWrapper>
        <IdeaContent>{content}</IdeaContent>

        <Field>{impact}</Field>
        <Field>{ease}</Field>
        <Field>{confidence}</Field>
        <Field>{average_score}</Field>

        <Buttons>
          <EditButton />
          <DeleteButton />
        </Buttons>
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
