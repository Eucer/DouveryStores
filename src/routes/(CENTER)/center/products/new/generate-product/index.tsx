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
import { urlServerLocal } from '~/services/util/server/server';
import { Vertical_img } from '~/components/(Center)/products/generate-product/upload_img/vertical_img/vertical_img';
import { Horizontal_img } from '~/components/(Center)/products/generate-product/upload_img/horizontal_img/horizontal_img';
import { Grid4_img } from '~/components/(Center)/products/generate-product/upload_img/grid4_img/grid4_img';
import { BulletProduct } from '~/components/(Center)/products/bullet-product/bullet-product';

import { DouveryRight3 } from '~/components/icons/arrow-right-3';
import { useGetCurrentUser } from '~/routes/layout';

export const useAction = globalAction$(
  async (
    {
      tquser,
      gtin,
      name,
      brand,
      description,
      images,
      quantity,
      maxQuantitySale,
      price,
      discount,
      category,
      subCategory,
      productDetails,
      item_condition,
      bullets,
      basicFeatures,
    },
    { fail, headers }
  ) => {
    const formData = new FormData();
    formData.append('gtin', gtin);
    formData.append('name', name);
    formData.append('brand', brand);
    formData.append('description', description);
    formData.append('images', images);
    formData.append('quantity', quantity.toString());
    formData.append('maxQuantitySale', maxQuantitySale);
    formData.append('price', price.toString());
    formData.append('discount', discount.toString());
    formData.append('category', category);
    formData.append('subCategory', subCategory);
    formData.append('productDetails', JSON.stringify(productDetails));
    formData.append('item_condition', item_condition);
    formData.append('bullets', JSON.stringify(bullets));
    formData.append('basicFeatures', JSON.stringify(basicFeatures));

    const res = await fetch(`${urlServerLocal}/api-store/product-request`, {
      method: 'POST',
      headers: {
        'x-auth-token': tquser,
      },
      body: formData,
    });

    const response = await res.json();
    console.log(response);

    if (res.status !== 200) {
      const errorMessage =
        response.error || response.msg || 'Hubo un error, intente de nuevo';
      return fail(res.status, {
        message: errorMessage,
      });
    }

    headers.set('location', '/success/request-store');
  },
  zod$({
    tquser: z.string(),
    gtin: z.string(),
    name: z.string(),
    brand: z.string(),
    description: z.string(),
    images: z.instanceof(Blob),
    quantity: z.string(),
    maxQuantitySale: z.string(),
    price: z.string(),
    discount: z.string(),
    category: z.string(),
    subCategory: z.string(),
    productDetails: z.string(),
    item_condition: z.string(),
    bullets: z.string(),
    basicFeatures: z.string(),
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

  const step = useSignal(1);
  const nextStep = $(() => {
    step.value++;
  });

  const prevStep = $(() => {
    step.value--;
  });
  const productStore = useStore({
    productCategory: '',
    productSubCategory: '',
    selectedCategoryIndex: -1,
    selectedSubCategoryIndex: -1,
    productName: '',
    productPrice: 0,
    productBrand: '',
    productGTIN: '',
    productDiscount: 0,
    productMaxQty: 'Unlimited',
    productQty: 0,
    dimensionUnit: 'cm',
    productHeight: 0,
    productWidth: 0,
    productDepth: 0,
    weightUnit: 'lb',
    productWeight: 0,
    pd_deatilImgBox: '',
    productShortDescription: '',
    productDescriptionFull: '',
    productKeywords: [],
    productBullets: [],
    productHighlights: [],
    productCondition: 'new',
  });
  const previewIMG = useStore({
    previewIMGPrimary: [],
  });

  const previewIMGs = useStore({
    previewIMGs: Array(7).fill([]), // Suponiendo que tienes hasta 7 imágenes
  });
  /// 1. Product Category Handlers
  const productCategoryHandlers = {
    onProductCategoryChange: $((e: any) => {
      const selectedCatIndex = Number(e.target.value);
      productStore.selectedCategoryIndex = selectedCatIndex;
      if (selectedCatIndex >= 0) {
        productStore.productCategory = categories[selectedCatIndex].name;
      } else {
        productStore.productCategory = '';
        productStore.selectedSubCategoryIndex = -1;
      }
    }),
    onProductSubCategoryChange: $((e: any) => {
      const selectedSubCatIndex = Number(e.target.value);
      productStore.selectedSubCategoryIndex = selectedSubCatIndex;
      if (selectedSubCatIndex >= 0) {
        productStore.productSubCategory =
          categories[productStore.selectedCategoryIndex].subcategories[
            selectedSubCatIndex
          ];
      } else {
        productStore.productSubCategory = '';
      }
    }),
  };
  console.log(productStore.productCategory);
  const productDataHandlers = {
    onProductNameChange: $((e: any) => {
      productStore.productName = e.target.value;
    }),
    onProductPriceChange: $((e: any) => {
      productStore.productPrice = Number(e.target.value);
    }),
    onProductBrandChange: $((e: any) => {
      productStore.productBrand = e.target.value;
    }),
    onProductGTINChange: $((e: any) => {
      productStore.productGTIN = e.target.value;
    }),
    onProductDiscountChange: $((e: any) => {
      productStore.productDiscount = Number(e.target.value);
    }),
    onProductMaxQtyChange: $((e: any) => {
      productStore.productMaxQty = e.target.value;
    }),
    onProductInventoryChange: $((e: any) => {
      productStore.productQty = Number(e.target.value);
    }),
    onDimensionUnitChange: $((e: any) => {
      productStore.dimensionUnit = e.target.value;
    }),
    onProductConditionChange: $((e: any) => {
      productStore.productCondition = e.target.value;
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

  const action = useAction();
  const user = useGetCurrentUser().value;

  //! AQUIIIII
  const handleSend = $(async () => {
    function base64ToBlob(base64: any) {
      // Convertir base64 a cadena binaria
      const binary = atob(base64.split(',')[1]);

      // Crear un array para el blob
      const array = [];
      for (let i = 0; i < binary.length; i++) {
        array.push(binary.charCodeAt(i));
      }

      // Crear y retornar el blob
      return new Blob([new Uint8Array(array)], { type: 'image/png' });
    }

    const base64 = previewIMG.previewIMGPrimary[0];
    const blob = base64ToBlob(base64);

    const formData = new FormData();
    formData.append('tquser', user?.token as any);
    formData.append('gtin', productStore.productGTIN);
    formData.append('name', productStore.productName);
    formData.append('brand', productStore.productBrand);
    formData.append('description', productStore.productDescriptionFull);
    formData.append('images', blob);
    formData.append('quantity', JSON.stringify(productStore.productQty));
    formData.append('maxQuantitySale', productStore.productMaxQty);
    formData.append('price', JSON.stringify(productStore.productPrice));
    formData.append('discount', JSON.stringify(productStore.productDiscount));
    formData.append('category', productStore.productCategory);
    formData.append('subCategory', productStore.productSubCategory);
    formData.append(
      'productDetails',
      JSON.stringify([
        {
          pd_detailImgBox: productStore.pd_deatilImgBox as any,
        },
      ])
    );
    formData.append('item_condition', productStore.productCondition);
    formData.append('bullets', JSON.stringify(productStore.productBullets));
    formData.append(
      'basicFeatures',
      JSON.stringify([
        {
          width: (productStore.productWidth +
            '' +
            productStore.dimensionUnit) as any,
          height: (productStore.productHeight +
            '' +
            productStore.dimensionUnit) as any,
          depth: (productStore.productDepth +
            '' +
            productStore.dimensionUnit) as any,
          weigth: (productStore.productWeight +
            '' +
            productStore.weightUnit) as any,
        },
      ])
    );

    await action.submit(formData);
  });

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
                action={action}
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
                action={action}
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
                <h1> Product Images</h1>
              </span>
              <div class="separator_w100_m10_bgr24 "></div>
              <ProductImages
                action={action}
                previewIMG={previewIMG}
                previewIMGs={previewIMGs}
                storeImagePrimary={previewIMG}
                storeImagesSecondary={previewIMGs}
                productStore={productStore}
                productProductDetailsHandlers={productProductDetailsHandlers}
                prevStep={prevStep}
                nextStep={nextStep}
              />
            </>
          )}
          {step.value === 4 && (
            <>
              <span class="title_subtitle">
                <h1> Product Details</h1>
              </span>
              <div class="separator_w100_m10_bgr24 "></div>
              <ProductDetails
                action={action}
                productStore={productStore}
                productProductDetailsHandlers={productProductDetailsHandlers}
                prevStep={prevStep}
                nextStep={handleSend}
              />
              {action.value?.fieldErrors && (
                <span class="error">
                  Porfavor completa el formulario completamente.
                </span>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
});

const ProductCategory = ({
  action,
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
      {action.value?.fieldErrors?.category && (
        <span class="error">{action.value?.fieldErrors?.category}</span>
      )}

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
          {action.value?.fieldErrors?.subCategory && (
            <span class="error">{action.value?.fieldErrors?.subCategory}</span>
          )}
        </div>
      )}

      <br />
      <div class="button__selects btn_Data  ">
        <button
          type="button"
          class="next-button "
          onClick$={nextStep}
          disabled={
            productStore.selectedCategoryIndex === -1 ||
            productStore.selectedSubCategoryIndex === -1
          }
        >
          Siguiente
          <DouveryRight3 size="14" />
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
  action,
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
    onProductConditionChange,
  } = productDataHandlers;

  return (
    <div class="Form__DATAPRODUCTS">
      <div class="content_form">
        {' '}
        <div>
          <label>Nombre del producto:</label>
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
              <span class="input__hint">
                Puedes cambiar el precio en cualquier momento.
              </span>
            </div>
            {action.value?.fieldErrors?.price && (
              <span class="error">{action.value?.fieldErrors?.price}</span>
            )}
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
                max={99}
              />
              <span class="input__hint">
                Iniciar con un descuento puede aumentar la posibilidad de venta.
              </span>
            </div>
            {action.value?.fieldErrors?.discount && (
              <span class="error">{action.value?.fieldErrors?.discount}</span>
            )}
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
          {action.value?.fieldErrors?.brand && (
            <span class="error">{action.value?.fieldErrors?.brand}</span>
          )}
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
            {action.value?.fieldErrors?.maxQuantitySale && (
              <span class="error">
                {action.value?.fieldErrors?.maxQuantitySale}
              </span>
            )}
          </div>
        </div>
        <div>
          <label>Condicion del producto</label>

          <select
            class="select__weight"
            id="dimension"
            value={productStore.productCondition}
            onChange$={onProductConditionChange}
          >
            <option value="new">Nuevo</option>
          </select>
          {action.value?.fieldErrors?.item_condition && (
            <span class="error">
              {action.value?.fieldErrors?.item_condition}
            </span>
          )}
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
              max={100}
            />
            {action.value?.fieldErrors?.basicFeatures.height && (
              <span class="error">
                {action.value?.fieldErrors?.basicFeatures.height}
              </span>
            )}
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
            {action.value?.fieldErrors?.basicFeatures.width && (
              <span class="error">
                {action.value?.fieldErrors?.basicFeatures.width}
              </span>
            )}
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

            {action.value?.fieldErrors?.basicFeatures.depth && (
              <span class="error">
                {action.value?.fieldErrors?.basicFeatures.depth}
              </span>
            )}
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
            />{' '}
            {action.value?.fieldErrors?.basicFeatures.weigth && (
              <span class="error">
                {action.value?.fieldErrors?.basicFeatures.weigth}
              </span>
            )}
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
      </div>
      <br />
      <br />
      <br />
      <div class="container_Button_Info">
        <div class="content">
          <div class="buttons__container btn_Data">
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
                !productStore.productQty ||
                !productStore.productMaxQty ||
                !productStore.productGTIN ||
                !productStore.productHeight ||
                !productStore.productWidth ||
                !productStore.productDepth ||
                !productStore.productWeight
              }
            >
              Siguiente
              <DouveryRight3 size="14" />
            </button>
          </div>
          <div class="information_BOX">
            <div class="information_BOX__title">
              <strong>Información</strong>
            </div>
            <div class="information_BOX__content">
              Complete los datos con la mayor precisión posible. Estos datos son
              de suma importancia para nuestros clientes y para la logística de
              envío. <a href="/">Consulta aquí</a>
            </div>
            <br />
          </div>
        </div>
      </div>
    </div>
  );
};

const ProductDetails = ({
  action,
  prevStep,
  nextStep,
  productStore,
  productProductDetailsHandlers,
}: any) => {
  const { onProductShortDescriptionChange } = productProductDetailsHandlers;

  return (
    <div class="Form__DETAILSPRODUCTS">
      <div class="detailDescriptionshort">
        <div class="content_descriptionShort">
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
          {action.value?.fieldErrors?.description && (
            <span class="error">{action.value?.fieldErrors?.description}</span>
          )}
        </div>

        <div class="contet_bullets">
          <label for="vinetas_product">Viñetas sobre el producto:</label>
          <BulletProduct productStore={productStore} />
          {action.value?.fieldErrors?.bullets && (
            <span class="error">{action.value?.fieldErrors?.bullets}</span>
          )}
        </div>
      </div>

      <br />

      <div class="buttons__container btn_Data">
        <button type="button" class="prev-button" onClick$={prevStep}>
          Anterior
        </button>
        <button
          type="button"
          class="next-button"
          onClick$={nextStep}
          disabled={!productStore.productShortDescription}
        >
          Enviar
          <DouveryRight3 size="14" />
        </button>
      </div>
    </div>
  );
};

const ProductImages = ({
  action,
  prevStep,
  nextStep,
  productStore,
  productProductDetailsHandlers,
  previewIMG,
  storeImagePrimary,
  storeImagesSecondary,
  previewIMGs,
}: any) => {
  const {
    onProductOrientationChange,
    onHandleFileChange,
    onHandlePreviewImg1Change,
    onHandlePreviewImgChange,
  } = productProductDetailsHandlers;

  function selectComponent() {
    switch (productStore.pd_deatilImgBox) {
      case 'horizontal_view':
        return (
          <>
            <Horizontal_img
              preview={previewIMG}
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
    <div class="Form__IMAGESPRODUCTS">
      <div class="conten_form_IMAGES">
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
          {action.value?.fieldErrors?.images && (
            <span class="error">{action.value?.fieldErrors?.images}</span>
          )}
        </div>
      </div>
      <br />
      <br />

      <br />
      <div class="container_Button_Info">
        <div class="content">
          <div class="buttons__container btn_images ">
            <button type="button" class="prev-button" onClick$={prevStep}>
              Anterior
            </button>
            <button
              type="button"
              class="next-button"
              onClick$={nextStep}
              disabled={
                !(
                  storeImagePrimary.previewIMGPrimary[0] ||
                  (storeImagesSecondary.previewIMGs[0] &&
                    storeImagesSecondary.previewIMGs[0].length > 0)
                )
              }
            >
              Siguiente
              <DouveryRight3 size="14" />
            </button>
          </div>
          <div class="information_BOX">
            <div class="information_BOX__title">
              <strong>Información</strong>
            </div>
            <div class="information_BOX__content">
              <p>
                Asegúrese de que las imágenes que subas tengan un fondo blanco o
                transparente. <a href="/">Consulta aquí</a> por qué es
                necesario.
              </p>

              <br />
              <ul>
                <li>
                  Imagen Principal: Debe tener un tamaño de 550x550 píxeles.
                </li>
                <li>
                  Imagen Secundaria: No debe exceder un tamaño de 300x300
                  píxeles.
                </li>
                <li>
                  Las imágenes pueden incluir texto, siempre y cuando sea solo
                  de carácter informativo.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
// const ProductDetailsDescriptionFull = ({
//   prevStep,
//   nextStep,
//   productStore,
//   productDetailsDescriptionFullHandlers,
// }: any) => {
//   const { onProductDescriptionFullChange } =
//     productDetailsDescriptionFullHandlers;

//   return (
//     <div class="Form__DETAILSPRODUCTS">
//       <br />

//       <div class="detailDescription">
//         <label for="description">Descripción del producto:</label>
//         <Description_full
//           productStore={productStore}
//           onChange$={onProductDescriptionFullChange}
//           nextStep={nextStep}
//         />
//       </div>
//       <br />
//       <div class="buttons__container">
//         <button type="button" class="prev-button" onClick$={prevStep}>
//           Anterior
//         </button>
//         <button
//           type="button"
//           class="next-button"
//           onClick$={nextStep}
//           disabled={
//             !productStore.productName ||
//             !productStore.productPrice ||
//             !productStore.productGTIN ||
//             productStore.productDiscount < 0 || // Permitimos descuento de 0, pero no negativo
//             !productStore.productQty
//           }
//         >
//           Siguiente
//         </button>
//       </div>
//     </div>
//   );
// };
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
