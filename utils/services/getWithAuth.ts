import { NextPageContext } from 'next';
import Router from 'next/router';

export const getWithAuth = async (url: string, ctx: NextPageContext) => {
  const HOST = process.env.NEXT_PUBLIC_HOST;
  const cookie = ctx.req?.headers.cookie;

  const resp = await fetch(url, {
    headers: {
      cookie: cookie!,
    },
  });

  if (resp.status === 401 && !ctx.req) {
    Router.replace('/login');
    return {};
  }

  if (resp.status === 401 && ctx.req) {
    ctx.res?.writeHead(302, {
      Location: `${HOST}/login`,
    });
    return ctx.res?.end();
  }

  const json = await resp.json();
  return json;
};
