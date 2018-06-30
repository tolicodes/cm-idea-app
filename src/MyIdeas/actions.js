export const DO_ADD_IDEA = 'DO_ADD_IDEA';
export const DO_DELETE_IDEA = 'DO_DELETE_IDEA';
export const DO_REMOVE_IDEA = 'DO_REMOVE_IDEA';
export const SET_EDIT_IDEA = 'SET_EDIT_IDEA';
export const DO_UPDATE_IDEA = 'DO_UPDATE_IDEA';
export const DO_CREATE_IDEA = 'DO_CREATE_IDEA';

export function addIdea() {
  return { type: DO_ADD_IDEA };
}

export function deleteIdea(id) {
  return { type: DO_DELETE_IDEA, id };
}

export function removeIdea(id) {
  return { type: DO_REMOVE_IDEA, id };
}

export function editIdea(id) {
  return { type: SET_EDIT_IDEA, id };
}

export function updateIdea(id, data) {
  return { type: DO_UPDATE_IDEA, data };
}

export function createIdea(id, data) {
  return { type: DO_CREATE_IDEA, data };
}
