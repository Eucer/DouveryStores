import { component$, Slot, useStylesScoped$ } from '@builder.io/qwik';
import { Footer } from '~/components/footer/footer';

import style from './index.css?inline';
import { routeLoader$ } from '@builder.io/qwik-city';
import {
  decodeToken,
  passwordKEY,
  serverKey,
} from '~/services/util/fuction/token';
import {
  DATA_ACCESS_COOKIE_SESSION_STORE,
  DATA_ACCESS_COOKIE_SESSION_USER,
} from '~/services/session/dataRequests';
import type { UserACC } from '~/services/util/types/user';

export const useGetCurrentUser = routeLoader$<UserACC | null>(
  async ({ cookie }) => {
    const accessCookie = cookie.get(DATA_ACCESS_COOKIE_SESSION_USER)?.value;

    if (accessCookie) {
      return decodeToken(accessCookie, passwordKEY, serverKey);
    }
    return null;
  }
);
export const useGetCurrentStore = routeLoader$<UserACC | null>(
  async ({ cookie }) => {
    const accessCookie = cookie.get(DATA_ACCESS_COOKIE_SESSION_STORE)?.value;

    if (accessCookie) {
      return decodeToken(accessCookie, passwordKEY, serverKey);
    }
    return null;
  }
);

export default component$(() => {
  useStylesScoped$(style);
  return (
    <>
      <main>
        <Slot />
      </main>
      <Footer />
    </>
  );
});
