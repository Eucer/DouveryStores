import { component$, useStylesScoped$ } from '@builder.io/qwik';
import { DouveryIconVerifyBrand } from '~/components/icons/verify';
import style from './about-store.css?inline';
export const CardAboutStore = component$(() => {
  useStylesScoped$(style);
  return (
    <div class="container-all">
      <div class="information">
        <div class="container-info-title">
          <div class="logo">
            <img
              width={60}
              height={60}
              src="https://res.cloudinary.com/douvery/image/upload/v1682700013/users/PEPITO-635c0ac87482cdf128be119a/moupkmy3bqsmwczvjggs.svg"
              alt={'Douvery logo'}
            />
            <a href="#">Douvery</a>
            <DouveryIconVerifyBrand size="20" />
          </div>
          <p>
            Welcome to the Official Douvery Store! We take pride in being the
            only officially registered store under this name at douvery.com. At
            Douvery, you'll find a wide range of high-quality products and
            services offered by our company. We are committed to customer
            satisfaction and work tirelessly to ensure your shopping experience
            is exceptional.
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
        <div class="information">
          <p>
            <strong>Registrada en douvery.com:</strong> Apr 29, 2023
          </p>
        </div>
      </div>{' '}
    </div>
  );
});
