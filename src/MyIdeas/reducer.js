import uuid from 'uuid/v4';
import update from 'immutability-helper';
import { findKey } from 'lodash';

import {
  DO_ADD_IDEA,
  DO_REMOVE_IDEA,
  SET_EDIT_IDEA,
} from './actions';

const initialState = {
  ideas: [
    {
      id: uuid(),
      savedToServer: false,
      editMode: true,

      content: '',
      impact: 1,
      ease: 1,
      confidence: 1,
      average_score: 1,
    },
  ],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case DO_ADD_IDEA: {
      return update(
        state,
        {
          ideas: {
            $push: [{
              id: uuid(),
              savedToServer: false,
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
      const index = findKey(state.ideas, idea => idea.id === id);

      return update(
        state,
        {
          ideas: {
            $splice: [[index, 1]],
          },
        },
      );
    }

    case SET_EDIT_IDEA: {
      return 'a';
    }

    default:
      return initialState;
  }
}
