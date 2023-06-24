import {
  $,
  component$,
  useSignal,
  useStore,
  useStylesScoped$,
} from '@builder.io/qwik';
import { BreadcrumbsSTL1 } from '~/components/breadcrumb/style1_breadcrumb/BreadcrumbsSTL1';
import style from './index.css?inline';
import { ProgressBarSteps } from '~/components/(Center)/products/generate-product/progress-bar-steps/progress-bar-steps';
import {
  zod$,
  type DocumentHead,
  z,
  globalAction$,
} from '@builder.io/qwik-city';
import { urlServerNode } from '~/services/util/server/server';

export const useAction = globalAction$(
  async (
    {
      adminName,
      adminEmail,
      adminPhone,
      password,
      storeName,
      storeDescription,
      storeEmail,
      storePhone,
      storeType,
      storeCountry,
      storeLocation,
    },
    { fail, headers }
  ) => {
    const res = await fetch(`${urlServerNode}/api/store-request`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },

      body: JSON.stringify({
        adminName,
        adminEmail,
        adminPhone,
        password,
        storeName,
        storeDescription,
        storeEmail,
        storePhone,
        storeType,
        storeCountry,
        storeLocation,
      }),
    });

    const response = await res.json();
    console.log(response);

    if (res.status !== 200) {
      // Utilizar el mensaje de error proporcionado por la API si está disponible
      const errorMessage =
        response.error || response.msg || 'Hubo un error, intente de nuevo';
      return fail(res.status, {
        message: errorMessage,
      });
    }

    headers.set('location', '/success/request-store');
  },
  zod$({
    adminName: z
      .string({
        required_error: 'Required',
      })
      .min(1, {
        message: 'Upps! Your adminName is too short',
      })
      .max(20, {
        message: 'upps! Your adminName is too long',
      }),
    adminEmail: z.string().email({ message: 'Invalid email address' }),
    adminPhone: z.string().min(1, { message: 'Phone number is required' }),
    password: z
      .string()
      .min(8, { message: 'Password must be at least 8 characters long' }),

    storeName: z.string().min(1, { message: 'Store name is required' }),
    storeDescription: z.string().min(1, {
      message: 'Store description is required',
    }),
    storeEmail: z.string().email({ message: 'Invalid store email address' }),
    storePhone: z
      .string()
      .min(1, { message: 'Store phone number is required' }),
    storeType: z.string().min(1, { message: 'Store type is required' }),
    storeCountry: z.string().min(1, { message: 'Country is required' }),
    storeLocation: z.string().min(1, { message: 'Store location is required' }),
  })
);
const categories = [
  {
    id: 1,
    name: 'Electrónica',
    subcategories: ['Teléfonos', 'Televisores', 'Laptops'],
  },
  {
    id: 2,
    name: 'Ropa',
    subcategories: ['Hombres', 'Mujeres', 'Niños'],
  },
];

const ProductMaxQty = [
  {
    id: 0,
    name: 'Unlimited',
  },
  {
    id: 1,
    name: '1',
  },
  {
    id: 2,
    name: '2',
  },
  {
    id: 3,
    name: '3',
  },
  {
    id: 4,
    name: '4',
  },
  {
    id: 5,
    name: '5',
  },
];
export default component$(() => {
  useStylesScoped$(style);

  const step = useSignal(2);
  const nextStep = $(() => {
    step.value++;
  });

  const prevStep = $(() => {
    step.value--;
  });
  const productStore = useStore({
    productCategory: '',
    productSubCategory: '',
    selectedCategoryIndex: -1, // Índice de la categoría seleccionada (-1 significa no seleccionada)
    selectedSubCategoryIndex: -1, // Índice de la subcategoría seleccionada (-1 significa no seleccionada)
    productName: '',
    productPrice: 0,
    productBrand: '',
    productGTIN: '',
    productDiscount: 0,
    productMaxQty: '',
    productQty: 0,
    dimensionUnit: '',
    productHeight: 0,
    productWidth: 0,
    productDepth: 0,
    weightUnit: '',
    productWeight: 0,
    productDescription: '',
    productKeywords: [],
    productBullets: [],
    productHighlights: [],
    productSEO: '',
  });

  /// 1. Product Category Handlers
  const productCategoryHandlers = {
    onProductCategoryChange: $((e: any) => {
      const selectedCatIndex = Number(e.target.value);
      productStore.selectedCategoryIndex = selectedCatIndex;
      if (selectedCatIndex === -1) {
        productStore.selectedSubCategoryIndex = -1;
      }
    }),
    onProductSubCategoryChange: $((e: any) => {
      const selectedSubCatIndex = Number(e.target.value);
      productStore.selectedSubCategoryIndex = selectedSubCatIndex;
    }),
  };

  const productDataHandlers = {
    onProductNameChange: $((e: any) => {
      productStore.productName = e.target.value;
    }),
    onProductPriceChange: $((e: any) => {
      productStore.productPrice = e.target.value;
    }),
    onProductBrandChange: $((e: any) => {
      productStore.productBrand = e.target.value;
    }),
    onProductGTINChange: $((e: any) => {
      productStore.productGTIN = e.target.value;
    }),
    onProductDiscountChange: $((e: any) => {
      productStore.productDiscount = e.target.value;
    }),
    onProductMaxQtyChange: $((e: any) => {
      productStore.productMaxQty = e.target.value;
    }),
    onProductInventoryChange: $((e: any) => {
      productStore.productQty = e.target.value;
    }),
    onDimensionUnitChange: $((e: any) => {
      productStore.dimensionUnit = e.target.value;
    }),

    onProductWeightChange: $((e: any) => {
      productStore.productWeight = e.target.value;
    }),
    onProductHeightChange: $((e: any) => {
      productStore.productHeight = e.target.value;
    }),
    onProductWidthChange: $((e: any) => {
      productStore.productWidth = e.target.value;
    }),
    onProductDepthChange: $((e: any) => {
      productStore.productDepth = e.target.value;
    }),
    onWeightUnitChange: $((e: any) => {
      productStore.weightUnit = e.target.value;
    }),
  };
  productDataHandlers;
  const productProductDetailsHandlers = {
    onProductDescriptionChange: $((e: any) => {
      productStore.productDescription = e.target.value;
    }),
    onProductKeywordsChange: $((e: any) => {
      productStore.productKeywords = e.target.value.split(',');
    }),
    onProductBulletsChange: $((e: any) => {
      productStore.productBullets = e.target.value.split(',');
    }),
    onProductHighlightsChange: $((e: any) => {
      productStore.productHighlights = e.target.value.split(',');
    }),
  };
  productProductDetailsHandlers;
  const productSEOHandlers = {
    onProductSEOChange: $((e: any) => {
      productStore.productSEO = e.target.value;
    }),
  };
  productSEOHandlers;
  const action = useAction();
  action;
  return (
    <>
      <div class="container__all">
        <div class="title_and_infos">
          <div class="title">
            <BreadcrumbsSTL1 />
            <div class="product_new__title">Generate product</div>
          </div>

          <div class="progress__bar">
            <ProgressBarSteps step={step.value} setStep={step} />
          </div>
        </div>
        <div class="container__form">
          {step.value === 1 && (
            <>
              {' '}
              <h1>Selección de categoría y subcategoría</h1>
              <ProductCategory
                productStore={productStore}
                productCategoryHandlers={productCategoryHandlers}
                nextStep={nextStep}
              />
            </>
          )}
          {step.value === 2 && (
            <>
              <h1>Datos del producto</h1>
              <ProductData
                productStore={productStore}
                productDataHandlers={productDataHandlers}
                prevStep={prevStep}
                nextStep={nextStep}
              />
            </>
          )}
        </div>
      </div>
    </>
  );
});

const ProductCategory = ({
  nextStep,
  productStore,
  productCategoryHandlers,
}: any) => {
  const { onProductCategoryChange, onProductSubCategoryChange } =
    productCategoryHandlers;

  return (
    <div class="SELECT-container">
      <label class="label__select">Selecciona una categoría:</label>
      <select
        value={productStore.selectedCategoryIndex}
        onChange$={onProductCategoryChange}
      >
        <option value="-1">Seleccione una categoría</option>
        {categories.map((category, index) => (
          <option key={index} value={index}>
            {category.name}
          </option>
        ))}
      </select>

      {productStore.selectedCategoryIndex !== -1 && (
        <div class="sub__subcategory">
          <label>Selecciona una subcategoría:</label>
          <select
            value={productStore.selectedSubCategoryIndex}
            onChange$={onProductSubCategoryChange}
          >
            <option value="-1">Seleccione una subcategoría</option>
            {categories[productStore.selectedCategoryIndex].subcategories.map(
              (subCat, index) => (
                <option key={index} value={index}>
                  {subCat}
                </option>
              )
            )}
          </select>
        </div>
      )}

      <br />
      <div class="button__selects">
        <button
          type="button"
          class="next-button"
          onClick$={nextStep}
          disabled={
            productStore.selectedCategoryIndex === -1 ||
            productStore.selectedSubCategoryIndex === -1
          }
        >
          Siguiente
        </button>
      </div>
    </div>
  );
};

const ProductData = ({
  prevStep,
  nextStep,
  productStore,
  productDataHandlers,
}: any) => {
  const {
    onProductNameChange,
    onProductPriceChange,
    onProductGTINChange,
    onProductDiscountChange,
    onProductInventoryChange,
    onProductMaxQtyChange,
    onProductWeightChange,
    onProductHeightChange,
    onProductWidthChange,
    onProductDepthChange,
    onWeightUnitChange,
    onDimensionUnitChange,
  } = productDataHandlers;

  return (
    <div class="Form__DATAPRODUCTS">
      <div>
        <label>Nombre del producto:</label>
        <textarea
          value={productStore.productName}
          onChange$={onProductNameChange}
        />
      </div>
      <br />
      <div class="content__imputs">
        <div>
          <label>Precio</label>
          <div class="input__price">
            $
            <input
              type="number"
              value={productStore.productPrice}
              onChange$={onProductPriceChange}
            />
            <span class="input__hint">
              Puedes cambiar el precio en cualquier momento.
            </span>
          </div>
        </div>
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
            />
            <span class="input__hint">
              Iniciar con un descuento puede aumentar la posibilidad de venta.
            </span>
          </div>
        </div>
      </div>
      <br />
      <div>
        <label>Marca registrada en el producto</label>
        <input
          type="text"
          value={productStore.productBrand}
          onChange$={onProductPriceChange}
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
          />
        </div>
        <div>
          <label>Cantidad máxima por compra</label>
          <select
            class="select__max_qty"
            value={productStore.selectedCategoryIndex}
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
        />
      </div>
      <br />
      <br />
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
        <option value="cm">Centímetros (cm)</option>
        <option value="in">Pulgadas (in)</option>
      </select>
      <div class="inputs_dimension">
        <div>
          <label for="height">Altura ({productStore.dimensionUnit}):</label>
          <input
            id="height"
            type="number"
            value={productStore.productHeight}
            onChange$={onProductHeightChange}
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
          />
        </div>
        <br />
        <div>
          <label for="depth">Profundidad ({productStore.dimensionUnit}):</label>
          <input
            id="depth"
            type="number"
            value={productStore.productDepth}
            onChange$={onProductDepthChange}
          />
        </div>
      </div>
      <br />
      <br />
      <div class="inputs_widths">
        <label>Peso del producto:</label>
        <div class="input_wei">
          <input
            type="number"
            value={productStore.productWeight}
            onChange$={onProductWeightChange}
          />

          <select
            class="select__weight"
            id="weight"
            value={productStore.weightUnit}
            onChange$={onWeightUnitChange}
          >
            <option value="kg">Kg</option>
            <option value="lb">Lb</option>
          </select>
        </div>
      </div>
      <br />
      <br />
      <br />
      <div class="buttons__container">
        <button type="button" class="prev-button" onClick$={prevStep}>
          Anterior
        </button>
        <button
          type="button"
          class="next-button"
          onClick$={nextStep}
          disabled={
            !productStore.productName ||
            !productStore.productPrice ||
            !productStore.productGTIN ||
            !productStore.productDiscount ||
            !productStore.productQty ||
            !productStore.productBrand ||
            !productStore.selectedCategoryIndex ||
            !productStore.productWeight ||
            !productStore.productHeight ||
            !productStore.productWidth ||
            !productStore.productDepth ||
            !productStore.dimensionUnit ||
            !productStore.weightUnit
          }
        >
          Siguiente
        </button>
      </div>
    </div>
  );
};
export const head: DocumentHead = {
  title: 'Douvery Stores: Generate Product',
  meta: [
    {
      name: 'description',
      content:
        'Genera un producto para tu tienda, vende con facilidad en Douvery.',
    },
  ],
};
