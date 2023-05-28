import { component$, useStylesScoped$ } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';
import styles from './index.css?inline';

export default component$(() => {
  useStylesScoped$(styles);
  return (
    <div class="container-all">
      <div class="carousel__image-container">
        <img
          width={1800}
          height={350}
          class="carousel__image"
          src="https://res.cloudinary.com/douvery/image/upload/v1685302262/tbynxiwauwhpdcdyovk9.png"
          alt="Imagen del carrusel"
        />
        <div class="container__title">
          <h1> Recursos infinitos para tu tienda.</h1>
          <h1> Vende con facilidad en nuestra plataforma.</h1>
        </div>

        <button class="carousel__button carousel__button--link">
          Crear mi Store
        </button>
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
