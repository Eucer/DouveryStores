import {
  $,
  component$,
  useOnWindow,
  useSignal,
  useStylesScoped$,
} from '@builder.io/qwik';
import styles from './banner.css?inline';
export const Banner = component$(() => {
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
        windowWidth.value < 1550
          ? 'https://res.cloudinary.com/douvery/video/upload/v1685621641/ifr5yndpanqlrptc1gwr.mp4'
          : 'https://res.cloudinary.com/douvery/video/upload/v1685637514/xlxzh6aln0o8jaylrolh.mp4';
    })
  );

  return (
    <div class="carousel__image-container">
      <video
        width={1800}
        height={350}
        class="carousel__image"
        src={
          windowWidth.value > 1550
            ? 'https://res.cloudinary.com/douvery/video/upload/v1685621641/ifr5yndpanqlrptc1gwr.mp4'
            : 'https://res.cloudinary.com/douvery/video/upload/v1685637514/xlxzh6aln0o8jaylrolh.mp4'
        }
        autoPlay
        muted
      />

      <a href="/auth/register" class="carousel__button carousel__button--link">
        Crear mi Store
      </a>
    </div>
  );
});
