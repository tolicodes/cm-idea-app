import uuid from 'uuid/v4';
import update from 'immutability-helper';
import { findKey } from 'lodash';

import {
  DO_ADD_IDEA,
  DO_REMOVE_IDEA,
  SET_EDIT_IDEA,
  SET_IDEAS,
  AFTER_CREATE_IDEA,
} from './actions';

const initialState = {
  ideas: [],
};

function findIndexById(state, id) {
  return findKey(state.ideas, idea => idea.id === id);
}

export default function (state = initialState, action) {
  switch (action.type) {
    case DO_ADD_IDEA: {
      return update(
        state,
        {
          ideas: {
            $push: [{
              id: uuid(),
              newlyCreated: true,
              editMode: true,

              content: '',
              impact: 1,
              ease: 1,
              confidence: 1,
              average_score: 1,
            }],
          },
        },
      );
    }

    case DO_REMOVE_IDEA: {
      const { id } = action;

      return update(
        state,
        {
          ideas: {
            $splice: [[findIndexById(state, id), 1]],
          },
        },
      );
    }

    case SET_IDEAS: {
      return update(
        state,
        {
          ideas: {
            $set: action.data,
          },
        },
      );
    }

    case AFTER_CREATE_IDEA: {
      const {
        uuid,
        id,
        content,
        impact,
        ease,
        confidence,
        average_score,
      } = action;

      const newState = update(
        state,
        {
          ideas: {
            [findIndexById(state, uuid)]: {
              $set: {
                id,
                editMode: false,
                newlyCreated: false,
                content,
                impact,
                ease,
                confidence,
                average_score
              },
            },
          },
        },
      );

      console.log(findIndexById(state, uuid), newState);

      return newState;
    }

    case SET_EDIT_IDEA: {
      const { id, editMode } = action;

      return update(
        state,
        {
          ideas: {
            [findIndexById(state, id)]: {
              editMode: { $set: editMode },
            },
          },
        },
      );
    }

    default:
      return state;
  }
}
