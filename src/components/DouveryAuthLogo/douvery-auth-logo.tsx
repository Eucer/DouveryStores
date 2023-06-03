import { component$, useStylesScoped$ } from '@builder.io/qwik';
import { DouveryLogo40x40 } from '~/components/icons/logo40x40';
import styles from './douvery-auth-logo.css?inline';
export const DouveryAuthLogo = component$(() => {
  useStylesScoped$(styles);
  return (
    <div class=" ctr-douvery">

      <a
        href="/"
        aria-label="Go home"
        title="Douvery"
        class="inline-flex items-center iteam-douvery"
      >
        <DouveryLogo40x40 size={40} color="var(--color-primary)" />
        <span class="ml-2 text-xl font-bold tracking-wide text-gray-800 ">
          Douvery Stores
        </span>
      </a>

    </div>
  );
});
