import {
  GET,
  POST,
  DELETE,
  PUT,
} from '../api';

export async function getIdeas() {
  const ideas = [];

  let currentPage = 1;
  let hasMoreResults = true;

  while (hasMoreResults) {
    const currentPageResults = await GET('/ideas', { page: currentPage });

    if (!currentPageResults.length) {
      hasMoreResults = false;
    } else {
      ideas.push.apply(ideas, currentPageResults);
      currentPage += 1;
    }
  }

  return ideas;
}

export function deleteIdea(id) {
  return DELETE(`/ideas/${id}`);
}

export function updateIdea(id, data) {
  return PUT(`/ideas/${id}`, data);
}

export function createIdea(data) {
  return POST('/ideas', data);
}
