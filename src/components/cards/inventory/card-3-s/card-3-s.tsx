import { component$, useStore, useStylesScoped$ } from '@builder.io/qwik';
import styles from './card-3-s.css?inline';
import { UsePrice } from '~/components/use/price/price';
import { UseStarRating } from '~/components/use/ratings/useRatingHover/useRatingHover';
import { LabelSaveRed } from '~/components/use/label/labelSaveRed';
import { TextCL } from '~/components/use/textCL/textCL';
import { ContainerExpectedShippingTime } from '~/components/(Product-details)/components/container-expected-shipping-time';
import { UseNumberOneCategory } from '~/components/use/numberOne/numberOneCategory';
import { DouveryCheckMark } from '~/components/icons/checkMark';
import { useGetCurrentZipCode } from '~/routes/layout';
import { ModalButtonCou } from '~/components/modal/modal';
import { UseProductDetailsLink } from '~/services/fuction';
export const Card3S = component$(({ product, ref }: any) => {
  useStylesScoped$(styles);
  const discoun = product.price - product.price * (product.discount / 100);
  const is = useStore({
    is: false,
  });
  const hoy = new Date();
  const mañana = new Date(hoy);
  mañana.setDate(hoy.getDate() + 1);
  const getZipCode = useGetCurrentZipCode().value;
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

          <div class="container-number-one-category">
            <UseNumberOneCategory product={product} />
          </div>
          <div class="ctr-free-shipping">
            <p>
              <DouveryCheckMark size="15px" /> Disponible
            </p>
            {product.price > 998 ? (
              <>
                <div class="ctr-opa">|</div>
                <p>
                  {' '}
                  <DouveryCheckMark size="15px" />
                  Free shipping
                </p>
              </>
            ) : (
              ''
            )}
          </div>
          <div class="container-ratings">
            <UseStarRating product={product} />
          </div>

          {product.discount < 20 ? (
            ''
          ) : (
            <div class="container-label-save">
              <LabelSaveRed product={product} />
            </div>
          )}

          <div class="container-expert">
            {' '}
            {product.price > 150 ? (
              <div class="container-expert-cell">
                {' '}
                <div class="crt-expectend-ship">
                  {getZipCode ? (
                    <>
                      <div class="shrp-prsx">
                        <p class="ps-sr1">Compra antes de 8 hrs 10 mins:</p>
                        <p class="tm-srh-exp">
                          Recibelo el {''}
                          {mañana.toLocaleDateString('es-ES', {
                            weekday: 'long',

                            month: 'long',
                            day: 'numeric',
                          })}
                          {''} en {''} <TextCL text={getZipCode} />
                        </p>{' '}
                      </div>
                    </>
                  ) : (
                    <div class="ctr-button-ele">
                      <p class="text-live">
                        Para obtener una estimación de tiempo, es necesario
                        seleccionar una ubicación de envío
                      </p>
                      <div class="ctr-buttom">
                        <ModalButtonCou />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              ''
            )}
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
