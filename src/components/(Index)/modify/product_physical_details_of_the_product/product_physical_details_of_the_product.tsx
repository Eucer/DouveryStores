import { component$, useStylesScoped$ } from '@builder.io/qwik';
import style from './product_physical_details_of_the_product.css?inline';
import { TitleSubtitleComponent } from '~/components/use/title component/TitleSubtitleComponent/title-subtitle-component';
export const Product_physical_details_of_the_product = component$(
  ({ productStore, productDataHandlers }: any) => {
    useStylesScoped$(style);
    const {
      onProductWeightChange,
      onProductHeightChange,
      onProductWidthChange,
      onProductDepthChange,
      onWeightUnitChange,
      onDimensionUnitChange,
    } = productDataHandlers;

    return (
      <div class="container_all">
        {' '}
        <TitleSubtitleComponent
          title="Detalles basicos
"
        />
        <span class="input__hint">
          *Proporcione datos precisos para su producto. Estos detalles son
          importantes para sus clientes y para la logística de envío.
        </span>
        <br />
        <select
          class="select__weight"
          id="dimension"
          value={productStore.dimensionUnit}
          onChange$={onDimensionUnitChange}
        >
          {productStore.dimensionUnit === 'cm' ? (
            <>
              <option value="cm">Centímetros (cm)</option>
              <option value="in">Pulgadas (in)</option>
            </>
          ) : (
            <>
              <option value="in">Pulgadas (in)</option>
              <option value="cm">Centímetros (cm)</option>
            </>
          )}
        </select>
        <div class="inputs_dimension">
          <div>
            <label for="height">Altura ({productStore.dimensionUnit}):</label>
            <input
              id="height"
              type="number"
              value={productStore.productHeight}
              onChange$={onProductHeightChange}
              min={0}
              max={100}
            />
          </div>
          <br />
          <div>
            <label for="width">Anchura ({productStore.dimensionUnit}):</label>
            <input
              id="width"
              type="number"
              value={productStore.productWidth}
              onChange$={onProductWidthChange}
              min={0}
              max={100}
            />
          </div>
          <br />
          <div>
            <label for="depth">
              Profundidad ({productStore.dimensionUnit}):
            </label>
            <input
              id="depth"
              type="number"
              value={productStore.productDepth}
              onChange$={onProductDepthChange}
              min={0}
              max={100}
            />
          </div>
        </div>
        <br />
        <br />
        <div class="inputs_widths">
          <label>Peso del producto: ({productStore.weightUnit})</label>
          <div class="input_wei">
            <input
              type="number"
              value={productStore.productWeight}
              onChange$={onProductWeightChange}
              min={0}
            />{' '}
            <select
              class="select__weight"
              id="weight"
              value={productStore.weightUnit}
              onChange$={onWeightUnitChange}
            >
              {productStore.weightUnit === 'lb' ? (
                <>
                  <option value="lb">Lb</option>
                  <option value="kg">Kg</option>
                </>
              ) : (
                <>
                  <option value="kg">Kg</option>
                  <option value="lb">Lb</option>
                </>
              )}
            </select>
          </div>
        </div>
      </div>
    );
  }
);
