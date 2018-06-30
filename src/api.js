import { stringify } from 'query-string';
import { apiBase } from './config';

async function api(path, data, method = 'GET', extraParams) {
  let reqBody;
  let params = '';

  if (['GET', 'DELETE'].includes(method)) {
    params = '?' + stringify(data);
  } else {
    reqBody = JSON.stringify(data);
  }
  const response = await fetch(apiBase + path + params, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'x-access-token': localStorage.getItem('jwt'),
    },
    body: reqBody,
    method,
    ...extraParams,
  });

  const {
    ok,
    statusText,
  } = response || {};

  let body = {};

  if (method !== 'DELETE') {
    body = await response.json()
  }

  if (!ok) {
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

export async function PUT(path, data, extraParams) {
  return api(path, data, 'PUT', extraParams);
}

export async function UPDATE(path, data, extraParams) {
  return api(path, data, 'UPDATE', extraParams);
}

export async function handleError(code, { silent } = {}) {
  try {
    const response = await code();
    return response;
  } catch (e) {
    // replace with something...prettier
    console.error(e);
    if (!silent) {
      alert(e);
    }
  }
}
