import { component$, useStylesScoped$ } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';
import styles from './index.css?inline';
import { Banner } from '~/components/(Index)/banner/banner';
import { BenefitsINDEX } from '~/components/(Index)/benefits/benefits';
import { HowItWorksIndex } from '~/components/(Index)/how-it-works/how-it-works';

export default component$(() => {
  useStylesScoped$(styles);

  return (
    <div class="container-all">
      <Banner />
      <BenefitsINDEX />
      <div class="hr-div" />
      <HowItWorksIndex />

    </div>
  );
});

export const head: DocumentHead = {
  title: 'Inicio - Douvery Stores',
  meta: [
    {
      name: 'description',
      content:
        'Recursos infinitos para tu tienda, vende con facilidad en Douvery.',
    },
  ],
};
