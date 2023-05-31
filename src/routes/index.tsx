import { component$, useStylesScoped$ } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';
import styles from './index.css?inline';

export default component$(() => {
  useStylesScoped$(styles);
  return (
    <div class="container-all">
      <div class="carousel__image-container">
        <video
          width={1800}
          height={350}
          class="carousel__image"
          src="https://res.cloudinary.com/douvery/video/upload/v1685535268/buekoycwawhflxvbk3rz.mp4"
          autoPlay
        />

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
      content: 'Inicio - Douvery Stores',
    },
  ],
};
