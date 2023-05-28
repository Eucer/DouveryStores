import { component$, useStylesScoped$ } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';
import styles from './index.css?inline';
export default component$(() => {
  useStylesScoped$(styles);
  return (
    <div class="container-all">
      <div class="ct-title">
        <h1>
          Recursos infinitos para tu tienda. Vende con facilidad en nuestra
          plataforma.
        </h1>
        <button>Comezar</button>
      </div>
    </div>
  );
});

export const head: DocumentHead = {
  title: 'Inicio - Douvery Stores',
  meta: [
    {
      name: 'description',
      content: 'Qwik site description',
    },
  ],
};
