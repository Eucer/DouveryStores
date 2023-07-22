import { component$, useStylesScoped$ } from '@builder.io/qwik';

import style from './product_button_edit.css?inline';
export const Product_button_edit = component$(({ handleSend, action }: any) => {
  useStylesScoped$(style);
  return (
    <div class="container_Button_Info">
      <div class="content">
        <div class="information_BOX">
          <div class="information_BOX__title">
            <strong>Información</strong>
          </div>
          <div class="information_BOX__content">
            <p>
              Al modificar este producto, aceptas nuestros{' '}
              <a href="/">Términos y Condiciones</a>. Asegúrate de que toda la
              información proporcionada sea precisa y auténtica.
            </p>
          </div>
        </div>
        <div class="buttons__container btn_images ">
          <button type="button" class="next-button" onClick$={handleSend}>
            {action.isRunning ? (
              <>
                <div class="loader"></div>
                <span>Modificando...</span>
              </>
            ) : (
              <>
                {' '}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                >
                  <g
                    fill="none"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path d="m7.5 9l-3 .54L5 6.5L10.73.79a1 1 0 0 1 1.42 0l1.06 1.06a1 1 0 0 1 0 1.42Z" />
                    <path d="M12 9.5v3a1 1 0 0 1-1 1H1.5a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1h3" />
                  </g>
                </svg>
                Modificar cambios
              </>
            )}
          </button>
        </div>
      </div>
      {action.value?.message == 'Product edited successfully' ? (
        <span class="success">{action.value?.message}</span>
      ) : (
        <span class="error">{action.value?.message}</span>
      )}
    </div>
  );
});
