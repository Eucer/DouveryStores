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
import { Vertical_img } from '~/components/(Center)/products/generate-product/upload_img/vertical_img/vertical_img';
import { Horizontal_img } from '~/components/(Center)/products/generate-product/upload_img/horizontal_img/horizontal_img';
import { Grid4_img } from '~/components/(Center)/products/generate-product/upload_img/grid4_img/grid4_img';
import { Description_full } from '~/components/(Center)/products/generate-product/description_full/description_full';
import { BulletProduct } from '~/components/(Center)/products/bullet-product/bullet-product';

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

  const step = useSignal(3);
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
    pd_deatilImgBox: '',
    productShortDescription: '',
    productDescriptionFull: '',
    productKeywords: [],
    productBullets: [],
    productHighlights: [],
    productSEO: '',
  });
  const previewIMG = useStore({
    previewIMGPrimary: [],
  });
  const previewIMG1 = useStore({
    previewIMG1: [],
  });
  const previewIMGs = useStore({
    previewIMGs: Array(7).fill([]), // Suponiendo que tienes hasta 7 imágenes
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
    onProductShortDescriptionChange: $((e: any) => {
      productStore.productShortDescription = e.target.value;
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
    onProductOrientationChange: $((e: any) => {
      productStore.pd_deatilImgBox = e.target.value;
    }),
    onHandleFileChange: $((e: any) => {
      const files = e.target.files;
      if (files) {
        // Start with a new array
        const newPreview = [] as never[];
        for (let i = 0; i < files.length; i++) {
          const file = files[i];
          const reader = new FileReader();
          reader.onloadend = () => {
            newPreview.push(reader.result as never);
            // Only update the state after all files are read
            if (newPreview.length === files.length) {
              previewIMG.previewIMGPrimary = newPreview as any;
            }
          };
          reader.readAsDataURL(file);
        }
      } else {
        previewIMG.previewIMGPrimary = ['Error fatal' as never];
      }
    }),
    onHandlePreviewImg1Change: $((e: any) => {
      const files = e.target.files;
      if (files) {
        // Start with a new array
        const newPreview = [] as never[];
        for (let i = 0; i < files.length; i++) {
          const file = files[i];
          const reader = new FileReader();
          reader.onloadend = () => {
            newPreview.push(reader.result as never);
            // Only update the state after all files are read
            if (newPreview.length === files.length) {
              previewIMG1.previewIMG1 = newPreview as any;
            }
          };
          reader.readAsDataURL(file);
        }
      } else {
        previewIMG1.previewIMG1 = ['Error fatal' as never];
      }
    }),

    onHandlePreviewImgChange: $((e: any, index: number) => {
      const files = e.target.files;
      if (files) {
        const newPreview = [] as never[];
        for (let i = 0; i < files.length; i++) {
          const file = files[i];
          const reader = new FileReader();
          reader.onloadend = () => {
            newPreview.push(reader.result as never);
            if (newPreview.length === files.length) {
              previewIMGs.previewIMGs[index] = newPreview as any;
            }
          };
          reader.readAsDataURL(file);
        }
      } else {
        previewIMGs.previewIMGs[index] = ['Error fatal' as never];
      }
    }),
  };

  const productDetailsDescriptionFullHandlers = {
    onProductDescriptionFullChange: $((e: any) => {
      productStore.productDescriptionFull = e.target.value;
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

  // const editorRef = useSignal<Element>();
  // const handleBoldClick = $(() => {
  //   document.execCommand('bold') as any;
  //   const editorContent = editorRef.value && editorRef.value.innerHTML;
  //   console.log(editorContent);
  // });

  // console.log(editorRef.value);

  return (
    <>
      <div class="container__all">
        <div class="title_and_infos">
          <div class="title">
            <BreadcrumbsSTL1 />
            <div class="product_new__title">Generate product</div>
          </div>

          {/* <button onClick$={handleBoldClick}>Bold</button>
          <div
            ref={editorRef.value as any}
            contentEditable={true as any}
            style={{
              border: '1px solid #000',
              minHeight: '10px',
            }}
          /> */}
          <div class="progress__bar">
            <ProgressBarSteps step={step.value} setStep={step} />
          </div>
        </div>
        <div class="container__form">
          {step.value === 1 && (
            <>
              {' '}
              <h1>Selección de categoría y subcategoría</h1>
              <div class="separator_w100_m10_bgr24 "></div>
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
              <div class="separator_w100_m10_bgr24 "></div>
              <ProductData
                productStore={productStore}
                productDataHandlers={productDataHandlers}
                prevStep={prevStep}
                nextStep={nextStep}
              />
            </>
          )}
          {step.value === 3 && (
            <>
              <span class="title_subtitle">
                <h1> Product Details:</h1>
                <p> Insertar imágenes, descripción y viñetas.</p>
              </span>
              <div class="separator_w100_m10_bgr24 "></div>
              <ProductDetails
                previewIMG={previewIMG}
                previewIMG1={previewIMG1}
                previewIMGs={previewIMGs}
                productStore={productStore}
                productProductDetailsHandlers={productProductDetailsHandlers}
                prevStep={prevStep}
                nextStep={nextStep}
              />
            </>
          )}
          {step.value === 4 && (
            <>
              <ProductDetailsDescriptionFull
                productStore={productStore}
                productDetailsDescriptionFullHandlers={
                  productDetailsDescriptionFullHandlers
                }
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
    onProductBrandChange,
  } = productDataHandlers;

  return (
    <div class="Form__DATAPRODUCTS">
      <div>
        <label>Nombre del producto:</label>
        <textarea
          id="textarea__name"
          placeholder='TCL 32" HD Smart TV 32S6500'
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
              min={0}
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
              min={0}
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
          placeholder="9780201379624"
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
            min={0}
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
            min={0}
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
            min={0}
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
            productStore.productDiscount < 0 || // Permitimos descuento de 0, pero no negativo
            !productStore.productQty ||
            !productStore.productBrand ||
            !productStore.selectedCategoryIndex ||
            !productStore.productWeight ||
            !productStore.productHeight ||
            !productStore.productWidth ||
            !productStore.productDepth ||
            !productStore.dimensionUnit ||
            !productStore.weightUnit ||
            productStore.productPrice <= 0 || // Comprobamos si el precio es mayor que 0
            productStore.productQty <= 0 || // Comprobamos si la cantidad es mayor que 0
            productStore.productWeight <= 0 || // Comprobamos si el peso es mayor que 0
            productStore.productHeight <= 0 || // Comprobamos si la altura es mayor que 0
            productStore.productWidth <= 0 || // Comprobamos si la anchura es mayor que 0
            productStore.productDepth <= 0 // Comprobamos si la profundidad es mayor que 0
          }
        >
          Siguiente
        </button>
      </div>
    </div>
  );
};

const ProductDetails = ({
  prevStep,
  nextStep,
  productStore,
  productProductDetailsHandlers,
  previewIMG,
  previewIMG1,
  previewIMGs,
}: any) => {
  const {
    onProductOrientationChange,
    onHandleFileChange,
    onHandlePreviewImg1Change,
    onHandlePreviewImgChange,
    onProductShortDescriptionChange,
  } = productProductDetailsHandlers;

  function selectComponent() {
    switch (productStore.pd_deatilImgBox) {
      case 'horizontal_view':
        return (
          <>
            <Horizontal_img
              preview={previewIMG}
              previewIMG1={previewIMG1}
              onChange={onHandleFileChange}
              onHandlePreviewImg1Change={onHandlePreviewImg1Change}
              previewIMGs={previewIMGs}
              onHandlePreviewImgChange={onHandlePreviewImgChange}
            />
          </>
        );

      case 'vertical_view':
        return (
          <>
            <Vertical_img
              preview={previewIMG}
              previewIMG1={previewIMG1}
              onChange={onHandleFileChange}
              onHandlePreviewImg1Change={onHandlePreviewImg1Change}
              previewIMGs={previewIMGs}
              onHandlePreviewImgChange={onHandlePreviewImgChange}
            />
          </>
        );

      case 'grid4_view':
        return (
          <>
            <Grid4_img
              preview={previewIMG}
              previewIMG1={previewIMG1}
              onChange={onHandleFileChange}
              onHandlePreviewImg1Change={onHandlePreviewImg1Change}
              previewIMGs={previewIMGs}
              onHandlePreviewImgChange={onHandlePreviewImgChange}
            />
          </>
        );
      default:
        return (
          <>
            <Vertical_img
              preview={previewIMG}
              previewIMG1={previewIMG1}
              onChange={onHandleFileChange}
              onHandlePreviewImg1Change={onHandlePreviewImg1Change}
              previewIMGs={previewIMGs}
              onHandlePreviewImgChange={onHandlePreviewImgChange}
            />
          </>
        );
    }
  }

  return (
    <div class="Form__DETAILSPRODUCTS">
      <div class="conten_form">
        <div class="detailImages">
          <div class="content_select_orientation">
            <label for="orientation">Orientación del producto:</label>
            <select
              id="orientation"
              value={productStore.pd_deatilImgBox}
              onChange$={onProductOrientationChange}
            >
              <option value="vertical_view">Vertical</option>
              <option value="horizontal_view">Horizontal</option>
              <option value="grid4_view">Grid 4 Images</option>
            </select>
          </div>
          <div class="content_img">{selectComponent()}</div>
        </div>
        <div class="detailDescriptionshort">
          <br />
          <br />
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
          <br />

          <div class="separator_w100_m10_bgr24 "></div>
          <br />

          <label for="vinetas_product">Viñetas sobre el producto:</label>
          <BulletProduct productStore={productStore} />
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
            productStore.productDiscount < 0 || // Permitimos descuento de 0, pero no negativo
            !productStore.productQty ||
            !productStore.productBrand ||
            !productStore.selectedCategoryIndex ||
            !productStore.productWeight ||
            !productStore.productHeight ||
            !productStore.productWidth ||
            !productStore.productDepth ||
            !productStore.dimensionUnit ||
            !productStore.weightUnit ||
            productStore.productPrice <= 0 || // Comprobamos si el precio es mayor que 0
            productStore.productQty <= 0 || // Comprobamos si la cantidad es mayor que 0
            productStore.productWeight <= 0 || // Comprobamos si el peso es mayor que 0
            productStore.productHeight <= 0 || // Comprobamos si la altura es mayor que 0
            productStore.productWidth <= 0 || // Comprobamos si la anchura es mayor que 0
            productStore.productDepth <= 0 // Comprobamos si la profundidad es mayor que 0
          }
        >
          Siguiente
        </button>
      </div>
    </div>
  );
};
const ProductDetailsDescriptionFull = ({
  prevStep,
  nextStep,
  productStore,
  productDetailsDescriptionFullHandlers,
}: any) => {
  const { onProductDescriptionFullChange } =
    productDetailsDescriptionFullHandlers;

  return (
    <div class="Form__DETAILSPRODUCTS">
      <br />

      <div class="detailDescription">
        <label for="description">Descripción del producto:</label>
        <Description_full
          productStore={productStore}
          onChange$={onProductDescriptionFullChange}
          nextStep={nextStep}
        />
      </div>
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
            productStore.productDiscount < 0 || // Permitimos descuento de 0, pero no negativo
            !productStore.productQty
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
        'Genera un producto para tu tienda, vende con facilidad en Douvery. ',
    },
  ],
};
