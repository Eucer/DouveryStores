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
import { urlServerLocalPostgres } from '~/services/util/server/server';
import { Vertical_img } from '~/components/(Center)/products/generate-product/upload_img/vertical_img/vertical_img';
import { Horizontal_img } from '~/components/(Center)/products/generate-product/upload_img/horizontal_img/horizontal_img';
import { Grid4_img } from '~/components/(Center)/products/generate-product/upload_img/grid4_img/grid4_img';
import { BulletProduct } from '~/components/(Center)/products/bullet-product/bullet-product';

import { DouveryRight3 } from '~/components/icons/arrow-right-3';
import { useGetCurrentTokenUser, useGetCurrentUser } from '~/routes/layout';
import { categorySelect, maxQuantitySelect } from '~/utils/constants/productNewConstants';



export const useAction = globalAction$(
  async (
    {
      tquser,
      name,
      brand,
      price,
      quantity,
      category,
      subCategory,
      images
    },
    { fail, headers }
  ) => {

    const mutation = `
  mutation CreateProduct($name: String! , $brand: String!,$price: Float!, $quantity: Int!, $category: String!, $subCategory: String!, $images: [String!]!) {
    createProduct(name: $name, brand: $brand , price: $price, quantity: $quantity, category: $category, subCategory: $subCategory, images: $images ) {
      status
      message
      code
      
    }
  }
`;
    const variables = {
      name: name,
      brand: brand,
      price: price,
      quantity: quantity,
      category: category,
      subCategory: subCategory,
      images: images
    };


    const res = await fetch(`${urlServerLocalPostgres}/graphql`, {
      method: 'POST',
      headers: {
        'Authorization': 'x-user-auth ' + tquser,
        'Content-Type': 'application/json',
      },

      body: JSON.stringify({
        query: mutation,
        variables: variables,
      }),
    });
    const response = await res.json();
    console.log(response);
    if (!response.data.createProduct.status) {
      return fail(400, {
        message: 'Invalid credentials or user not found' + response.data.createProduct.message,
      });
    }

    headers.set('location', '/center/success/request-product');
  }
  ,
  zod$({
    tquser: z.string({
      required_error: 'Required',
    }),
    gtin: z.string({
      required_error: 'Required',
    }),
    name: z.string({
      description: 'Product name',
      required_error: 'Required',
      invalid_type_error: 'Invalid type',
    }),
    brand: z.string({
      required_error: 'Required',
    }),
    description: z.string({
      required_error: 'Required',
    }),
    images: z.array(
      z.string({
        required_error: 'Required',
      })
    ),
    quantity: z.number({
      required_error: 'Required',
    }),
    maxQuantitySale: z.string({
      required_error: 'Required',
    }),
    price: z.number({
      required_error: 'Required',
    }),
    discount: z.number({
      required_error: 'Required',
    }),
    category: z.string({
      required_error: 'Required',
    }),
    subCategory: z.string({
      required_error: 'Required',
    }),
    productDetails: z.object({
      pd_detailImgBox: z.string({
        required_error: 'Required',
      }),
    }),
    item_condition: z.string({
      required_error: 'Required',
    }),
    bullets: z.array(
      z.string({
        required_error: 'Required',
      })
    ),
    basicFeatures: z.object({
      width: z.string({
        required_error: 'Required',
      }),
      height: z.string({
        required_error: 'Required',
      }),
      depth: z.string({
        required_error: 'Required',
      }),
      weigth: z.string({
        required_error: 'Required',
      }),
    }),
  })
);

export default component$(() => {
  useStylesScoped$(style);

  const step = useSignal(4);
  const nextStep = $(() => {
    step.value++;
  });

  const prevStep = $(() => {
    step.value--;
  });
  const productStore = useStore({
    productCategory: 'Electrónica de Product',
    productSubCategory: 'Electrónica',
    selectedCategoryIndex: 1,
    selectedSubCategoryIndex: 1,
    productName: 'Product Name Frontend',
    productPrice: 1,
    productBrand: 'asdada',
    productGTIN: 'wasdsads',
    productDiscount: 1,
    productMaxQty: "1",
    productQty: 1,
    dimensionUnit: 'cm',
    productHeight: 1,
    productWidth: "1",
    productDepth: 1,
    weightUnit: 'lb',
    productWeight: 1,
    pd_deatilImgBox: 'vertical_view',
    productShortDescription: 'lorem ipsum',
    productDescriptionFull: 'lorem ipsum',
    productKeywords: [
      'lorem ipsum',
    ],
    productBullets: [
      'lorem ipsum',
    ],
    productHighlights: [
      'lorem ipsum',
    ],
    productCondition: 'new',
  });
  const previewIMG = useStore({
    previewIMGPrimary: [
      'https://res.cloudinary.com/douvery/image/upload/v1676107572/Optimum%20Nutrition%20Gold%20Standard%20100%20prote%C3%ADna%20de%20suero%20en%20polvo%2C%20chocolate%20avellana%2C%202%20libras%20%28el%20embalaje%20puede%20variar%29/kfsgeo9zwdb7zrebl5d5.webp',
    ],
  });

  const previewIMGs = useStore({
    previewIMGs: Array(7).fill([]),
  });

  const productCategoryHandlers = {
    onProductCategoryChange: $((e: any) => {
      const selectedCatIndex = Number(e.target.value);
      productStore.selectedCategoryIndex = selectedCatIndex;
      if (selectedCatIndex >= 0) {
        productStore.productCategory = categorySelect[selectedCatIndex].name;
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
          categorySelect[productStore.selectedCategoryIndex].subcategories[
          selectedSubCatIndex
          ];
      } else {
        productStore.productSubCategory = '';
      }
    }),
  };

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
  user
  const userToken = useGetCurrentTokenUser().value
  const images = previewIMGs.previewIMGs.flat().map((item) => item);

  const handleSend = $(async () => {
    await action.submit({
      tquser: userToken as string,
      gtin: productStore.productGTIN
        ? productStore.productGTIN
        : (undefined as any),
      name: productStore.productName
        ? productStore.productName
        : (undefined as any),
      brand: productStore.productBrand
        ? productStore.productBrand
        : (undefined as any),
      description: productStore.productShortDescription
        ? productStore.productShortDescription
        : (undefined as any),
      images:
        previewIMG.previewIMGPrimary.length > 0
          ? [...previewIMG.previewIMGPrimary, ...images]
          : (undefined as any),
      quantity: productStore.productQty
        ? productStore.productQty
        : (undefined as any),
      maxQuantitySale: productStore.productMaxQty ? productStore.productMaxQty : (undefined as any),
      price: productStore.productPrice
        ? productStore.productPrice
        : (undefined as any),
      discount: productStore.productDiscount
        ? productStore.productDiscount
        : (undefined as any),
      category: productStore.productCategory
        ? productStore.productCategory
        : (undefined as any),
      subCategory: productStore.productSubCategory
        ? productStore.productSubCategory
        : (undefined as any),
      productDetails: {
        pd_detailImgBox: productStore.pd_deatilImgBox as any,
      },
      item_condition: productStore.productCondition
        ? productStore.productCondition
        : (undefined as any),
      bullets: productStore.productBullets,
      basicFeatures: {
        width: (productStore.productWidth
          ? productStore.productWidth
          : undefined + '' + productStore.dimensionUnit) as any,
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
    });
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
            <ProgressBarSteps
              action={action}
              productStore={productStore}
              step={step.value}
              setStep={step}
            />
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
              <div class="alt_messaje">
                {action.value?.message && (
                  <span class="error">{action.value?.message}</span>
                )}
                <ul>
                  {action.value?.fieldErrors && (
                    <>
                      <li>
                        {' '}
                        <span class="error">
                          Porfavor completa el formulario completamente.
                        </span>
                      </li>
                      {!productStore.productName ||
                        !productStore.productPrice ||
                        !productStore.productQty ||
                        !productStore.productMaxQty ||
                        !productStore.productGTIN ||
                        !productStore.productHeight ||
                        !productStore.productWidth ||
                        !productStore.productDepth ? (
                        <li>
                          <span class="error">
                            Asegúrate de comprobar la sección de "Product Data"
                          </span>
                        </li>
                      ) : (
                        ''
                      )}{' '}
                      {!productStore.productCategory ||
                        !productStore.productSubCategory ? (
                        <li>
                          <span class="error">
                            Asegúrate de comprobar la sección de "Product
                            Category"
                          </span>
                        </li>
                      ) : (
                        ''
                      )}{' '}
                      {previewIMG.previewIMGPrimary.length > 0 ? (
                        ''
                      ) : (
                        <li>
                          <span class="error">
                            Asegúrate de comprobar la sección de "Product
                            Images".
                          </span>
                        </li>
                      )}{' '}
                    </>
                  )}
                </ul>
              </div>
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
        {categorySelect.map((category, index) => (
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
            {categorySelect[productStore.selectedCategoryIndex].subcategories.map(
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

export const ProductData = ({
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
              <span class="input__hint">
                Iniciar con un descuento puede aumentar la posibilidad de venta.
              </span>
            </div>
          </div>
          {action.value?.fieldErrors?.discount && (
            <span class="error">{action.value?.fieldErrors?.discount}</span>
          )}
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
              {maxQuantitySelect.map((data, index) => (
                <option key={index} value={index}>
                  {data.name}
                </option>
              ))}
            </select>
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
          <label>Peso del producto:</label>
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
          {action.isRunning ? (
            <>
              {' '}
              <div class="loader"></div>
              Un momento...
            </>
          ) : action.value?.message ? (
            'Error'
          ) : (
            <>
              {' '}
              Enviar
              <DouveryRight3 size="14" />
            </>
          )}{' '}
        </button>
      </div>
    </div>
  );
};

export const ProductImages = ({
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
