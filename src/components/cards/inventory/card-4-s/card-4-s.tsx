import { component$, useStore, useStylesScoped$ } from '@builder.io/qwik';
import styles from './card-4-s.css?inline';
import { UsePrice } from '~/components/use/price/price';
import { UseStarRating } from '~/components/use/ratings/useRatingHover/useRatingHover';
import { LabelSaveRed } from '~/components/use/label/labelSaveRed';
import { TextCL } from '~/components/use/textCL/textCL';
import { ContainerExpectedShippingTime } from '~/components/(Product-details)/components/container-expected-shipping-time';
import { UseNumberOneCategory } from '~/components/use/numberOne/numberOneCategory';
import { DouveryCheckMark } from '~/components/icons/checkMark';
import { ButtonCardHover } from '~/components/use/bropdown-button-cart-fast-pay/button-card/button-card-hover';
import { UseProductDetailsLink } from '~/services/fuction';
export const Card4S = component$(({ product, ref }: any) => {
  useStylesScoped$(styles);
  const discoun = product.price - product.price * (product.discount / 100);
  const is = useStore({
    is: false,
  });
  return (
    <div class="container-all">
      <div class="card">
        <img
          width={200}
          height={200}
          src={product.images[0]}
          alt="Product Image"
          class="product-image"
        />
        <div class="product-info">
          <a href={UseProductDetailsLink(product, ref)}>
            {' '}
            <h2 class="product-title">
              <TextCL text={product.name} />{' '}
            </h2>
          </a>
          <p class="product-description">{product.marca}</p>
          <UseNumberOneCategory product={product} />
          <UseStarRating product={product} />
          {product.discount < 20 ? '' : <LabelSaveRed product={product} />}
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
          <div class="container-expert">
            {' '}
            {product.price > 150 ? <ContainerExpectedShippingTime /> : ''}
          </div>
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
          {product.price > 150 ? (
            <button
              class={'button--show-shopping-cell'}
              onClick$={() => (is.is = !is.is)}
            >
              <span class="button-text">Ver envio</span>
            </button>
          ) : (
            ''
          )}
        </div>
        <div class="container-hover-button">
          {' '}
          <ButtonCardHover product={product} />
        </div>
      </div>

      {is.is && (
        <>
          {' '}
          {product.price > 150 ? (
            <div class="container-expert-cell">
              {' '}
              <ContainerExpectedShippingTime />
            </div>
          ) : (
            ''
          )}{' '}
        </>
      )}
    </div>
  );
});
