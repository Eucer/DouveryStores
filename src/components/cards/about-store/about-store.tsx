import { component$, useStylesScoped$ } from '@builder.io/qwik';
import { DouveryIconVerifyBrand } from '~/components/icons/verify';
import style from './about-store.css?inline';
import { AssetsDouveryLgoSmall } from '~/components/douvery-assets/lgos/douvery-lgo-small';
export const CardAboutStore = component$(() => {
  useStylesScoped$(style);
  return (
    <div class="container-all">
      <div class="information">
        <div class="container-info-title">
          <div class="logo">
            <AssetsDouveryLgoSmall size="30" />
            <a href="#">Douvery</a>
            <DouveryIconVerifyBrand size="20" />
          </div>
          <p>
            ¡Bienvenido a la tienda oficial de Douvery! Estamos orgullosos de
            ser la única tienda registrada oficialmente con este nombre en
            douvery.com. En Douvery encontrará una amplia gama de productos y
            servicios de alta calidad que ofrece nuestra empresa. Estamos
            comprometidos con la satisfacción del cliente y trabajamos
            incansablemente para garantizar que su experiencia de compra sea
            excepcional.
          </p>
        </div>

        <div class="container_infostore">
          <br />

          <p>
            <strong>Email:</strong> douvery@douvery.com
          </p>
          <p>
            <strong>Phone:</strong> +1 809 670 4346
          </p>
          <br />
        </div>
        <div class="register">
          <p>
            <strong>Registrada en Douvery:</strong> Apr 29, 2023
          </p>
        </div>
      </div>{' '}
    </div>
  );
});
