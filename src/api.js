import { apiBase } from './config';

async function api(path, data, method = 'GET', extraParams) {
  const response = await fetch(apiBase + path, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
    method,
    ...extraParams,
  });

  const {
    ok,
    statusText,
  } = response || {};

  const body = await response.json();

  if (!response || !ok) {
    throw new Error(`Request to ${path} resulted in a ${statusText} error: ${body.reason}`);
  }

  return body;
}

export async function GET(path, data, extraParams) {
  return api(path, data, 'GET', extraParams);
}

export async function POST(path, data, extraParams) {
  return api(path, data, 'POST', extraParams);
}

export async function DELETE(path, data, extraParams) {
  return api(path, data, 'DELETE', extraParams);
}

export async function handleError(code) {
  try {
    const response = await code();
    return response;
  } catch (e) {
    // replace with something...prettier
    alert(e);
  }
}
