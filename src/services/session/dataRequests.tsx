import type { Cookie } from '@builder.io/qwik-city';
import Cookies from 'universal-cookie';

export const DATA_ACCESS_COOKIE_SESSION_USER = 'SS_US';
export const DATA_ACCESS_COOKIE_SESSION_STORE = 'SS_ST';

export const getCookieData = (cookieName: string) => {
  const cookies = new Cookies();
  return cookies.get(cookieName);
}

// USER DATA
export const setCookiesDataUser = (dataAccess: string, cookie: Cookie) => {
  cookie.set(DATA_ACCESS_COOKIE_SESSION_USER, dataAccess, {
    path: '/',
    sameSite: 'strict',
    httpOnly: true,
    expires: new Date(new Date().getTime() + DATA_ACCESS_COOKIE_SESSION_USER),
  });
};

// STORE DATA
export const setCookiesDataStore = (dataAccess: string, cookie: Cookie) => {
  cookie.set(DATA_ACCESS_COOKIE_SESSION_STORE, dataAccess, {
    path: '/',
    sameSite: 'strict',
    httpOnly: true,
    expires: new Date(new Date().getTime() + DATA_ACCESS_COOKIE_SESSION_STORE),
  });
};
