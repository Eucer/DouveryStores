import { component$, useStylesScoped$ } from '@builder.io/qwik';
import type { DocumentHead, RequestHandler } from '@builder.io/qwik-city';
import styles from './index.css?inline';
import { Banner } from '~/components/(Index)/banner/banner';
import { BenefitsINDEX } from '~/components/(Index)/benefits/benefits';
import { HowItWorksIndex } from '~/components/(Index)/how-it-works/how-it-works';
import { DATA_ACCESS_COOKIE_SESSION_USER } from '~/services/session/dataRequests';
import { NavBar } from '~/components/nav-bar/nav-bar';
import { BeautifulShops } from '~/components/(Index)/beautiful-shops/beautiful-shops';

export const onGet: RequestHandler = async ({ cookie, redirect }) => {
  const acccessToken = cookie.get(DATA_ACCESS_COOKIE_SESSION_USER)?.value;
  if (acccessToken) {
    throw redirect(302, '/center');
  }
};

export default component$(() => {
  useStylesScoped$(styles);

  return (
    <>
      <header>
        <NavBar />
      </header>
      <div class="container-all">
        <Banner />
        <br />
        <BeautifulShops />
        <div class="hr-div" />
        <BenefitsINDEX />

        <div class="hr-div" />
        <HowItWorksIndex />
        <div class="hr-div" />
      </div>
    </>
  );
});

export const head: DocumentHead = {
  title: 'Inicio - Douvery Shops',
  meta: [
    {
      name: 'description',
      content:
        'Recursos infinitos para tu tienda, vende con facilidad en Douvery.',
    },
  ],
};
