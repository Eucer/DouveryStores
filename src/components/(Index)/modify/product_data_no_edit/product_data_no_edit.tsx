import { component$, useStylesScoped$ } from '@builder.io/qwik';
import style from './product_data_no_edit.css?inline';
export const Product_data_no_edit = component$(({ productStore }: any) => {
  useStylesScoped$(style);
  return (
    <div class="crtr-charac-bs">
      <div class="crrts-title">
        <div class="ofrs">
          <hs-sr3>Información del Producto</hs-sr3>
        </div>

        <p class="ps-sr1 ">
          Datos no editables.{' '}
          <a href="/" class="text_consult">
            Consultar aqui.
          </a>
        </p>
      </div>
      <div>
        <ul>
          <li>
            <strong>Dui:</strong> {productStore.productDui}
          </li>
          <li>
            <strong>Categoria:</strong> {productStore.productCategory}
          </li>
          <li>
            <strong>Sub Categoria:</strong> {productStore.productSubCategory}
          </li>
          <li>
            <strong>Crado por:</strong> {productStore.productUploaded_by}
          </li>
          <li>
            <strong>Dia creado:</strong> {productStore.productCreatedAt}
          </li>{' '}
          <li>
            <strong>Ultima actualizacion:</strong>{' '}
            {productStore.productUpdatedAt}
          </li>
        </ul>
      </div>
    </div>
  );
});
