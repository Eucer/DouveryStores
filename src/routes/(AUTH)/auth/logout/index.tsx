import type { RequestHandler } from '@builder.io/qwik-city';
import {
  DATA_ACCESS_COOKIE_SESSION_STORE,
  DATA_ACCESS_COOKIE_SESSION_USER,
} from '~/services/session/dataRequests';

export const onGet: RequestHandler = async ({ cookie, redirect, url }) => {
  cookie.delete(DATA_ACCESS_COOKIE_SESSION_STORE, { path: '/' });
  cookie.delete(DATA_ACCESS_COOKIE_SESSION_USER, { path: '/' });
  const query = url.searchParams.get('rr') || '';

  throw redirect(302, query);
};
