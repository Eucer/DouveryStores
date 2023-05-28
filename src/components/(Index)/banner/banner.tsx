import { $, component$, useSignal, useStylesScoped$ } from '@builder.io/qwik';
import styles from './banner.css?inline';
export const Banner = component$(() => {
  useStylesScoped$(styles);
  const currentIndex = useSignal(0);
  const images = [
    {
      imageUrl:
        'https://res.cloudinary.com/douvery/image/upload/v1685301800/gezwqtdxkeodd0wdgu9d.png',
      linkUrl: 'url-a-la-que-redirigir-1',
    },
    { imageUrl: 'url-de-tu-imagen-2', linkUrl: '/sdf' },
    { imageUrl: 'url-de-tu-imagen-3', linkUrl: 'url-a-la-que-redirigir-3' },
    // agrega todos los objetos de imagen y URL que necesites
  ];
  const nextImage = $(() => {
    currentIndex.value = (currentIndex.value + 1) % images.length;
  });
  const previousImage = $(() => {
    currentIndex.value = (currentIndex.value - 1) % images.length;
  });

  return (
    <div class="carousel">
      <button
        class="carousel__button carousel__button--previous"
        onClick$={previousImage}
      >
        Para atras
      </button>
      <div class="carousel__image-container">
        <img
          class="carousel__image"
          src={images[currentIndex.value].imageUrl}
          alt="Imagen del carrusel"
        />
        <button class="carousel__button carousel__button--link">
          Ir a link
        </button>
      </div>
      <button
        class="carousel__button carousel__button--next"
        onClick$={nextImage}
      >
        Para alante
      </button>
    </div>
  );
});
