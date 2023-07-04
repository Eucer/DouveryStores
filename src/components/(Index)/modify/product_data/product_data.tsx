import { component$, useStylesScoped$ } from '@builder.io/qwik';
import style from './product_data.css?inline';
import { ProductMaxQty } from '~/routes/(CENTER)/center/products/new/generate-product';
export const Product_data = component$(
  ({ productStore, productDataHandlers, action }: any) => {
    useStylesScoped$(style);
    const {
      onProductNameChange,
      onProductPriceChange,
      onProductGTINChange,
      onProductDiscountChange,
      onProductInventoryChange,
      onProductMaxQtyChange,

      onProductBrandChange,
    } = productDataHandlers;

    return (
      <div class="Form__DATAPRODUCTS">
        <div class="content_form">
          {' '}
          <div>
            <label>Nombre del producto: (Máximo 400 caracteres)</label>
            <textarea
              id="textarea__name"
              placeholder='TCL 32" HD Smart TV 32S6500'
              value={productStore.productName}
              onChange$={onProductNameChange}
            />
            {action.value?.fieldErrors?.name && (
              <span class="error">{action.value?.fieldErrors?.name}</span>
            )}
          </div>
          <br />
          <div class="price_discount__container">
            <div class="content__imputs">
              <div>
                <label>Precio</label>
                <div class="input__price">
                  $
                  <input
                    type="number"
                    value={productStore.productPrice}
                    onChange$={onProductPriceChange}
                    min={0}
                    max={999999999}
                  />
                </div>
              </div>
              {action.value?.fieldErrors?.price && (
                <span class="error">{action.value?.fieldErrors?.price}</span>
              )}
            </div>
            <br />
            <div class="content__inputs_discount">
              <div>
                <label>Descuento </label>
                <div class="input_discount">
                  %
                  <input
                    type="number"
                    value={productStore.productDiscount}
                    onChange$={onProductDiscountChange}
                    min={0}
                    max={99}
                  />
                </div>
              </div>
            </div>
          </div>
          <br />
          <div>
            <label>Marca registrada en el producto</label>
            <input
              type="text"
              value={productStore.productBrand}
              onChange$={onProductBrandChange}
              placeholder="TCL"
            />
          </div>
          <br />
          <div class="content__inputs_gtin_qty">
            <div>
              <label>Cantidad disponible</label>
              <input
                type="number"
                value={productStore.productQty}
                onChange$={onProductInventoryChange}
                min={0}
                max={2500}
              />
              {action.value?.fieldErrors?.quantity && (
                <span class="error">{action.value?.fieldErrors?.quantity}</span>
              )}
            </div>
            <div>
              <label>Cantidad máxima por compra</label>
              <select
                class="select__max_qty"
                value={productStore.productMaxQty}
                onChange$={onProductMaxQtyChange}
              >
                {ProductMaxQty.map((data, index) => (
                  <option key={index} value={index}>
                    {data.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div>
            <label>GTIN del producto:</label>
            <input
              type="text"
              value={productStore.productGTIN}
              onChange$={onProductGTINChange}
              placeholder="9780201379624"
            />
            {action.value?.fieldErrors?.gtin && (
              <span class="error">{action.value?.fieldErrors?.gtin}</span>
            )}
          </div>
          <br />
        </div>
      </div>
    );
  }
);
