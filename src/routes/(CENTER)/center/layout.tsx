import { component$, Slot, useStylesScoped$ } from '@builder.io/qwik';
import type { RequestHandler } from '@builder.io/qwik-city';
import { NavBarCenter } from '~/components/(Center)/navbar-center/navbar-center';

import { DATA_ACCESS_COOKIE_SESSION_USER } from '~/services/session/dataRequests';
export const onGet: RequestHandler = async ({ cookie, redirect }) => {
  const acccessToken = cookie.get(DATA_ACCESS_COOKIE_SESSION_USER)?.value;
  if (!acccessToken) {
    throw redirect(302, '/');
  }
};
export default component$(() => {
  useStylesScoped$(
    `
    .container_super_all {
    width: 100%;
    height: 100%;
   
    }
   main{
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
   }
  `
  );



  return (
    <div class="container_super_all">

      <header>
        <NavBarCenter />
      </header>
      <main>
        <Slot />
      </main>
    </div>
  );
});
