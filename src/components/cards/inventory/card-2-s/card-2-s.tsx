import { component$, useStylesScoped$ } from '@builder.io/qwik';
import styles from './card-2-s.css?inline';
import { UsePrice } from '~/components/use/price/price';
import { TextCL } from '~/components/textCL/textCL';
import { DouveryCheckMark } from '~/components/icons/checkMark';

export const Card2S = component$(({ product }: any) => {
  useStylesScoped$(styles);
  const discoun = product.price - product.price * (product.discount / 100);

  return (
    <div class="container-all">
      <div class="card">
        <div class="product_image">
          <img
            width={200}
            height={200}
            src={product.images[0]}
            alt="Product Image"
            class="product-image"
          />
          <div class="product_dui">
            <p class="product_dui_text">
              {' '}
              <svg
                width="15"
                height="15"
                viewBox="0 0 19 11"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3.85227 10H0.758523V1.27273H3.87784C4.75568 1.27273 5.51136 1.44744 6.14489 1.79688C6.77841 2.14347 7.26563 2.64205 7.60653 3.29261C7.95028 3.94318 8.12216 4.72159 8.12216 5.62784C8.12216 6.53693 7.95028 7.31818 7.60653 7.97159C7.26563 8.625 6.77557 9.12642 6.13636 9.47585C5.5 9.82528 4.73864 10 3.85227 10ZM2.60369 8.41903H3.77557C4.32102 8.41903 4.77983 8.32244 5.15199 8.12926C5.52699 7.93324 5.80824 7.63068 5.99574 7.22159C6.18608 6.80966 6.28125 6.27841 6.28125 5.62784C6.28125 4.98295 6.18608 4.45597 5.99574 4.04688C5.80824 3.63778 5.52841 3.33665 5.15625 3.14347C4.78409 2.95028 4.32528 2.85369 3.77983 2.85369H2.60369V8.41903ZM13.6523 7.21307V3.45455H15.4677V10H13.7248V8.81108H13.6566C13.5089 9.1946 13.2631 9.50284 12.9194 9.7358C12.5785 9.96875 12.1623 10.0852 11.6708 10.0852C11.2333 10.0852 10.8484 9.9858 10.516 9.78693C10.1836 9.58807 9.92365 9.3054 9.73615 8.93892C9.55149 8.57244 9.45774 8.13352 9.4549 7.62216V3.45455H11.2702V7.2983C11.2731 7.68466 11.3768 7.99006 11.5813 8.21449C11.7859 8.43892 12.06 8.55114 12.4038 8.55114C12.6225 8.55114 12.8271 8.50142 13.0174 8.40199C13.2077 8.29972 13.3612 8.14915 13.4776 7.95028C13.5969 7.75142 13.6552 7.50568 13.6523 7.21307ZM16.9197 10V3.45455H18.7351V10H16.9197ZM17.8317 2.6108C17.5618 2.6108 17.3303 2.52131 17.1371 2.34233C16.9467 2.16051 16.8516 1.94318 16.8516 1.69034C16.8516 1.44034 16.9467 1.22585 17.1371 1.04688C17.3303 0.865057 17.5618 0.774147 17.8317 0.774147C18.1016 0.774147 18.3317 0.865057 18.522 1.04688C18.7152 1.22585 18.8118 1.44034 18.8118 1.69034C18.8118 1.94318 18.7152 2.16051 18.522 2.34233C18.3317 2.52131 18.1016 2.6108 17.8317 2.6108Z"
                  fill="currentColor"
                />
              </svg>
              {product.dui}
            </p>
          </div>
        </div>
        <div class="product-info">
          <a href={''}>
            {' '}
            <h2 class="product-title">
              <TextCL text={product.name} />{' '}
            </h2>
          </a>
          <p class="product_brand">
            {product.brand ? product.brand : product.marca}
          </p>
          {product.price > 998 ? (
            <div class="ctr-free-shipping">
              <p>
                <DouveryCheckMark size="15px" /> Disponible
              </p>
              <div class="ctr-opa">|</div>
              <p>
                {' '}
                <DouveryCheckMark size="15px" />
                Free shipping
              </p>
            </div>
          ) : (
            ''
          )}
          <div class="product-price">
            {product.discount > 0 ? (
              <>
                {' '}
                <UsePrice price={discoun} />
                <div class="ctr-opa">|</div>
                <div class="price-t  tach">
                  {' '}
                  <UsePrice price={product.price} />
                </div>
              </>
            ) : (
              <>
                <UsePrice price={product.price} />
              </>
            )}{' '}
          </div>

          <div class="in_product">
            {' '}
            <div class={'status-card'}>
              <h3 class="status-title">Estado:</h3>
              <p class={'status-text' + ' ' + product.status}>
                <TextCL text={product.status} />
              </p>
            </div>
            <div class="ctr-opa">|</div>
            <div class="product_quantity">
              <p class="product_quantity_number">{product.quantity}</p>{' '}
              <p class="product_quantity_text">In stock</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});
