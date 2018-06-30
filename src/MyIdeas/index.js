import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import styled from 'styled-components';

import AddIdeaButtonImg from '../assets/btn_addanidea.png';
import GotIdeasImage from '../assets/bulb.png';

import {
  addIdea,
  deleteIdea,
  removeIdea,
  editIdea,
  updateIdea,
  createIdea,
} from './actions';

import Idea, {
  LEFT_WIDTH,
  BUTTONS_WIDTH,
  Fields,
  Field,
} from './Idea';

const PageWrapper = styled.div`
  margin-top: 41px;
  padding-right: 57px;
  padding-left: 79px;
  width: calc(100% - 57px - 79px);
`;

const PageTitle = styled.h1`
  margin: 0;
  font-weight: normal;
  border-bottom: 1px solid rgba(42,56,66,0.20);
  padding-bottom: 32px;

  display: flex;
  justify-content: space-between;
`

const AddIdeaButton = styled.button`
  background-image: url(${AddIdeaButtonImg});
  height: 50px;
  width: 50px;

  border: none;
  cursor: pointer;
`;

const GotIdeasContainer = styled.div`
  margin-top: 246px;

  display: flex;
  flex-direction: column;
  align-items: center;
`;

const GotIdeasIcon = styled.img`
  margin-bottom: 23px;
`;

const GotIdeasText = styled.h3`
  margin: 0;
  font-weight: normal;

  font-size: 20px;
  color: #2A3842;
`;

const IdeasList = styled.ul`
  margin: 0;
  padding: 0;
  margin-top: 39px;
`;

const HeaderRow = styled.div`
  display: flex;
  direction: row;
  margin-bottom: 28px;
`;

const SpacerLeft = styled.div`
  display: flex;
  flex: ${LEFT_WIDTH};
`;

const SpacerRight = styled.div`
  display: flex;
  flex: ${BUTTONS_WIDTH};
`;

const HeaderCell = styled(Field)`
  font-size: 14px;
  color: #2A3842;
`;

const AvgCell = styled(HeaderCell)`
  font-weight: bold;
`;

class MyIdeas extends Component {
  constructor(props) {
    super(props);

    this.addIdea = this.addIdea.bind(this);
  }

  addIdea() {
    this.props.addIdea();
  }

  renderGotIdeas() {
    return (
      <GotIdeasContainer>
        <GotIdeasIcon src={GotIdeasImage}/>

        <GotIdeasText>Got Ideas?</GotIdeasText>
      </GotIdeasContainer>
    );
  }

  renderIdeasList() {
    const {
      ideas,
      deleteIdea,
      removeIdea,
      editIdea,
      updateIdea,
      createIdea,
    } = this.props;

    return (
      <IdeasList>
        <HeaderRow>
          <SpacerLeft/>

          <Fields>
            <HeaderCell>
              Impact
            </HeaderCell>

            <HeaderCell>
              Ease
            </HeaderCell>

            <HeaderCell>
              Confidence
            </HeaderCell>

            <AvgCell>
              Avg
            </AvgCell>
          </Fields>

          <SpacerRight/>
        </HeaderRow>
        {
          ideas.map(idea => (
            <Idea
              key={idea.id}
              deleteIdea={deleteIdea}
              removeIdea={removeIdea}
              editIdea={editIdea}
              updateIdea={updateIdea}
              createIdea={createIdea}
              {...idea}
            />
          ))
        }
      </IdeasList>
    );
  }

  render() {
    const { ideas } = this.props || {};

    return (
      <PageWrapper>
        <PageTitle>
          My Ideas

          <AddIdeaButton onClick={this.addIdea}/>
        </PageTitle>

        {
          ideas && ideas.length ?
          this.renderIdeasList() :
          this.renderGotIdeas()
        }
      </PageWrapper>
    );
  }
}

export default connect(
  ({ myIdeas: { ideas }}) => ({
    ideas,
  }),
  dispatch => bindActionCreators({
    addIdea,
    deleteIdea,
    removeIdea,
    editIdea,
    updateIdea,
    createIdea,
  }, dispatch),
)(MyIdeas);
