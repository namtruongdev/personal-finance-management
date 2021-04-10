const fetchAPI = async ({ url, method, payload }: FetchAPI) => {
  if (method === 'POST') {
    const res = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    return res;
  }

  if (method === 'GET') {
    const res = await fetch(url);
    return res;
  }

  return null;
};

export { fetchAPI };
