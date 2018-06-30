export const DO_ADD_IDEA = 'DO_ADD_IDEA';
export const DO_DELETE_IDEA = 'DO_DELETE_IDEA';
export const DO_REMOVE_IDEA = 'DO_REMOVE_IDEA';
export const SET_EDIT_IDEA = 'SET_EDIT_IDEA';
export const DO_UPDATE_IDEA = 'DO_UPDATE_IDEA';
export const DO_CREATE_IDEA = 'DO_CREATE_IDEA';
export const AFTER_CREATE_IDEA = 'AFTER_CREATE_IDEA';
export const SET_IDEAS = 'SET_IDEAS';

export function addIdea() {
  return { type: DO_ADD_IDEA };
}

export function deleteIdea(id) {
  return { type: DO_DELETE_IDEA, id };
}

export function removeIdea(id) {
  return { type: DO_REMOVE_IDEA, id };
}

export function editIdea(id, editMode) {
  return { type: SET_EDIT_IDEA, id, editMode };
}

export function updateIdea(id, data) {
  return { type: DO_UPDATE_IDEA, id, data };
}

export function createIdea(uuid, data) {
  return { type: DO_CREATE_IDEA, uuid, data };
}

export function afterCreateIdea({
  uuid,
  id,
  content,
  impact,
  ease,
  confidence,
  average_score,
}) {
  return {
    type: AFTER_CREATE_IDEA,
    uuid,
    id,
    content,
    impact,
    ease,
    confidence,
    average_score,
  };
}

export function setIdeas(ideas) {
  return { type: SET_IDEAS, data: ideas };
}
