import { component$, useStylesScoped$ } from '@builder.io/qwik';
import { BulletProduct } from '~/components/(Center)/products/bullet-product/bullet-product';
import style from './product_description_short.css?inline';
import { TitleSubtitleComponent } from '~/components/use/title component/TitleSubtitleComponent/title-subtitle-component';
export const Product_description_short = component$(
  ({
    action,

    productStore,
    productProductDetailsHandlers,
  }: any) => {
    useStylesScoped$(style);
    const { onProductShortDescriptionChange } = productProductDetailsHandlers;

    return (
      <div class="Form__DETAILSPRODUCTS">
        <div class="title">
          <TitleSubtitleComponent
            title="Descripción, detalles y especificaciones
"
          />
          <span class="input__hint">
            Aporte una descripción precisa y detallada de su producto, esencial
            para la comprensión del cliente. En cumplimiento de nuestros
            <a href="/" class="show-more">
              {' '}
              Términos y Condiciones
            </a>
            , la exactitud de esta información es obligatoria.
          </span>
        </div>
        <br />
        <div class="detailDescriptionshort">
          <div class="content_descriptionShort">
            <TitleSubtitleComponent
              title="Descripción corta
"
            />
            <textarea
              id="description_short"
              value={productStore.productShortDescription}
              onChange$={onProductShortDescriptionChange}
              placeholder='The Televisor TCL 32" is the perfect choice for your entertainment needs. Featuring a 32" LED display ...'
              minLength={100}
              maxLength={400}
            ></textarea>
            {action.value?.fieldErrors?.description && (
              <span class="error">
                {action.value?.fieldErrors?.description}
              </span>
            )}
          </div>

          <div class="contet_bullets">
            <BulletProduct productStore={productStore} />
            {action.value?.fieldErrors?.bullets && (
              <span class="error">{action.value?.fieldErrors?.bullets}</span>
            )}
          </div>
        </div>
      </div>
    );
  }
);
