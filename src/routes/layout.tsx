import { component$, Slot, useStylesScoped$ } from '@builder.io/qwik';
import { Footer } from '~/components/footer/footer';

import style from './index.css?inline';
import { routeLoader$ } from '@builder.io/qwik-city';

import {

  DATA_ACCESS_COOKIE_SESSION_USER,
} from '~/services/session/dataRequests';
import type { UserACC } from '~/services/util/types/user';
import { verifyAuthToken } from '~/services/util/token/verifyAuthToken';

export const useGetCurrentUser = routeLoader$<UserACC | any>(
  async ({ cookie }) => {
    const accessCookie = cookie.get(DATA_ACCESS_COOKIE_SESSION_USER)?.value;
    if (accessCookie) {
      return verifyAuthToken(accessCookie);
    }
    return null;
  }
);

export const useGetCurrentTokenUser = routeLoader$(async ({ cookie }) => {
  const acccessToken = cookie.get(DATA_ACCESS_COOKIE_SESSION_USER)?.value;
  return acccessToken;
});


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
