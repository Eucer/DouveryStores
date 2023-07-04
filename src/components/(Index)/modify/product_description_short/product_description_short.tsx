import { component$, useStylesScoped$ } from '@builder.io/qwik';
import { BulletProduct } from '~/components/(Center)/products/bullet-product/bullet-product';
import style from './product_description_short.css?inline';
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
        <div class="detailDescriptionshort">
          <div class="content_descriptionShort">
            <label for="description_short">
              Descripción corta: (Máximo 400 caracteres)
            </label>
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
            <label for="vinetas_product">Viñetas sobre el producto:</label>
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
