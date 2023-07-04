import { $, component$, useStylesScoped$ } from '@builder.io/qwik';
import { BreadcrumbsSTL1 } from '~/components/breadcrumb/style1_breadcrumb/BreadcrumbsSTL1';
import style from './header_info.css?inline';
import { DouveryArrowLeft1 } from '~/components/icons/arrow-left-1';
export const Header_info = component$(({ title }: any) => {
  useStylesScoped$(style);
  const goBack = $(() => {
    window.history.back();
  });

  return (
    <div class="title_and_infos">
      <div class="title">
        <BreadcrumbsSTL1 />
        <div class="content">
          <button
            onClick$={goBack}
            class="button_goback"
            aria-label="Volver"
            name="Volver"
            title="Volver a la página anterior"
          >
            <DouveryArrowLeft1 />
            Volver
          </button>
          -<div class="product_new__title"> {title}</div>{' '}
        </div>
        {/* Añade el botón aquí */}
      </div>
    </div>
  );
});
