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
      <div class="iframe-container">
        <img
          width={1500}
          height={250}
          src="https://res.cloudinary.com/douvery/image/upload/v1687337664/xzvzgnsxtk1thursbhmi.webp"
          class="blurred-frame"
        ></img>
        <div class="data_content">
          <div class="overlay">
            <h1 class="title">Recursos infinitos para tu tienda</h1>
          </div>
          <div class="overlay__promo">
            <img
              width={200}
              height={200}
              src="https://res.cloudinary.com/douvery/image/upload/v1687106559/mcm5tbzxazxzqi2xk5yi.webp"
              alt=""
            />
            <h4 class="subtitle">Vende con facilidad en Douvery...</h4>
          </div>
        </div>
      </div>

      <a href="/auth/register" class="carousel__button carousel__button--link">
        Crear mi Store
      </a>
    </div>
  );
});
