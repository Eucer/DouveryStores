import {
  $,
  component$,
  useOnWindow,
  useSignal,
  useStylesScoped$,
} from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';
import styles from './index.css?inline';

export default component$(() => {
  useStylesScoped$(styles);

  const windowWidth = useSignal(1800);
  const videoSrc = useSignal(
    'https://res.cloudinary.com/douvery/video/upload/v1685621641/ifr5yndpanqlrptc1gwr.mp4'
  );

  useOnWindow(
    'load',
    $(() => {
      windowWidth.value = window.innerWidth;
    })
  );

  useOnWindow(
    'resize',
    $(() => {
      videoSrc.value =
        windowWidth.value > 1400
          ? 'https://res.cloudinary.com/douvery/video/upload/v1685621641/ifr5yndpanqlrptc1gwr.mp4'
          : 'https://res.cloudinary.com/douvery/video/upload/v1685637514/xlxzh6aln0o8jaylrolh.mp4';
    })
  );

  return (
    <div class="container-all">
      <div class="carousel__image-container">
        <video
          width={1800}
          height={350}
          class="carousel__image"
          src={videoSrc.value}
          autoPlay
          muted
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
