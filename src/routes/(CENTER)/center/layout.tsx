import { component$, Slot } from '@builder.io/qwik';
import type { RequestHandler } from '@builder.io/qwik-city';
import { NavBarCenter } from '~/components/(Center)/navbar-center/navbar-center';
import { DATA_ACCESS_COOKIE_SESSION_STORE } from '~/services/session/dataRequests';
export const onGet: RequestHandler = async ({ cookie, redirect }) => {
  const acccessToken = cookie.get(DATA_ACCESS_COOKIE_SESSION_STORE)?.value;
  if (!acccessToken) {
    throw redirect(302, '/');
  }
};
export default component$(() => {
  return (
    <>
      <header>
        <NavBarCenter />
      </header>
      <main>
        <Slot />
      </main>
    </>
  );
});
