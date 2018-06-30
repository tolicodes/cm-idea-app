import { apiBase } from './config';

export default async function api (path, data, method = 'GET', extraParams) {
  const result = await fetch(apiBase + path, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
    method,
    ...extraParams,
  });

  return JSON.parse(result);
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
