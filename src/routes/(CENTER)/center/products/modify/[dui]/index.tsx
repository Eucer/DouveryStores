import {
  $,
  component$,
  useSignal,
  useStore,
  useStylesScoped$,
} from '@builder.io/qwik';
import style from './index.css?inline';
import { Header_info } from '~/components/(Center)/header_info/header_info';

import { Product_images } from '~/components/(Index)/modify/product_images/product_images';
import {
  type DocumentHead,
  globalAction$,
  routeLoader$,
  z,
  zod$,
} from '@builder.io/qwik-city';
import { DATA_ACCESS_COOKIE_SESSION_USER } from '~/services/session/dataRequests';

import { Product_data } from '~/components/(Index)/modify/product_data/product_data';
import { Product_data_no_edit } from '~/components/(Index)/modify/product_data_no_edit/product_data_no_edit';
import { Product_button_edit } from '~/components/(Index)/modify/product_button_edit/product_button_edit';
import { Product_physical_details_of_the_product } from '~/components/(Index)/modify/product_physical_details_of_the_product/product_physical_details_of_the_product';
import { Product_description_short } from '~/components/(Index)/modify/product_description_short/product_description_short';
import { Product_keywords } from '~/components/(Index)/modify/product_keywords/product_keywords';
import { TitleSubtitleComponent } from '~/components/use/title component/TitleSubtitleComponent/title-subtitle-component';
import { urlServerNode } from '~/services/util/server/server';
import { useGetCurrentUser } from '~/routes/layout';
import { ModifyProduct__ProgressBarSteps } from '~/components/(Center)/products/modify-product/progress-bar-steps/progress-bar-steps';
import { fetchStoreProductsByDui } from '~/services/fetch/products/view-product/view-product';

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
    { fail, params }
  ) => {
    const res = await fetch(`${urlServerNode}/api-store/edit/product`, {
      method: 'PUT',
      headers: {
        'x-auth-token': tquser,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        dui: params.dui,
        gtin: gtin,
        name: name,
        brand: brand,
        description: description,
        images: images,
        quantity: quantity,
        maxQuantitySale: maxQuantitySale,
        price: price,
        discount: discount,
        category: category,
        subCategory: subCategory,
        productDetails: productDetails,
        item_condition: item_condition,
        bullets: bullets,
        basicFeatures: basicFeatures,
      }),
    });

    const response = await res.json();

    if (!response) {
      return fail(400, {
        message: 'Invalid credentials or user not found',
      });
    }

    if (res.status === 200) {
      return {
        message: 'Product edited successfully',
      };
    } else {
      throw new Error('Error');
    }
  },
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
    images: z.array(z.string({})),
    quantity: z.number({}),
    maxQuantitySale: z
      .string({
        required_error: 'Required',
      })
      .optional(),
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
      width: z.number({
        required_error: 'Required',
      }),
      height: z.number({
        required_error: 'Required',
      }),
      depth: z.number({
        required_error: 'Required',
      }),
      weigth: z.number({
        required_error: 'Required',
      }),
      dimensionUnit: z.string({
        required_error: 'Required',
      }),
      weigthUnit: z.string({
        required_error: 'Required',
      }),
    }),
  })
);

export const useProductInfo = routeLoader$(async ({ params, cookie }) => {
  const dui = params.dui;
  const accessCookie = cookie.get(DATA_ACCESS_COOKIE_SESSION_USER)?.value;

  const product = await fetchStoreProductsByDui(dui as any, accessCookie ? accessCookie : "");

  return product;
});

export default component$(() => {
  useStylesScoped$(style);

  const step = useSignal(1);
  const nextStep = $(() => {
    step.value++;
  });

  const prevStep = $(() => {
    step.value--;
  });

  const productData = useProductInfo();
  function extractDimensionUnit(dimension: string) {
    return dimension.split(/[0-9]+/).pop() || '';
  }

  function extractWeightUnit(weight: string) {
    return weight.split(/[0-9]+/).pop() || '';
  }


  const productStore = useStore({
    productDui: productData.value.dui,
    productCreatedAt: productData.value.dates.createdAt,
    productUpdatedAt: productData.value.dates.updatedAt,
    productUploaded_by: productData.value.dates.uploadedBy.profile.name,
    productCategory: productData.value?.category.categoryName,
    productSubCategory: productData.value?.subCategory.subCategoryName,
    selectedCategoryIndex: -1,
    selectedSubCategoryIndex: -1,
    productName: productData.value.name,
    productPrice: productData.value.price,
    productBrand: productData.value.marca || productData.value.brand,
    productGTIN: productData.value.gtin,
    productDiscount: productData.value.discount || 0,
    productMaxQty: productData.value.maxQuantitySale,
    productQty: productData.value.quantity,
    dimensionUnit: extractDimensionUnit(productData.value.basicFeatures?.height || ''),
    productHeight: parseFloat(productData.value.basicFeatures?.height || 0),
    productWidth: parseFloat(productData.value.basicFeatures?.width || 0),
    productDepth: parseFloat(productData.value.basicFeatures?.depth || 0),
    weightUnit: extractWeightUnit(productData.value.basicFeatures?.weight || ''),
    productWeight: parseFloat(productData.value.basicFeatures?.weight || 0),
    pd_deatilImgBox: '',
    productShortDescription: productData.value?.description,
    productDescriptionFull: '',
    productKeywords: productData.value?.meta?.seoKeywords || [],

    productBullets: productData.value.bullets,
    productHighlights: [],
    productCondition: productData.value.basicFeatures?.condition || '',
  });

  const previewIMG = useStore({
    previewIMGPrimary: productData.value.images[0].url,
  });

  const previewIMGs = useStore({
    previewIMGs: Array(7)
      .fill(null)
      .map((_, index) => {
        // Verificar si el índice es válido y si existe la URL
        return (productData.value?.images && productData.value.images[index + 1]?.url) || "";
      })
  });

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
      productStore.productWeight = Number(e.target.value);
    }),
    onProductHeightChange: $((e: any) => {
      productStore.productHeight = Number(e.target.value);
    }),
    onProductWidthChange: $((e: any) => {
      productStore.productWidth = Number(e.target.value);
    }),
    onProductDepthChange: $((e: any) => {
      productStore.productDepth = Number(e.target.value);
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
  const images = previewIMGs.previewIMGs.flat().map((item) => item);

  const handleSend = $(async () => {
    await action.submit({
      tquser: user?.token as any,
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
      maxQuantitySale: productStore.productMaxQty,
      price: productStore.productPrice
        ? productStore.productPrice
        : (undefined as any),
      discount: productStore.productDiscount ? productStore.productDiscount : 0,
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
        width: productStore.productWidth,
        height: productStore.productHeight,
        depth: productStore.productDepth,
        weigth: productStore.productWeight,
        dimensionUnit: productStore.dimensionUnit,
        weigthUnit: productStore.weightUnit as any,
      },
    });
  });

  return (
    <div class="container__all">
      <div class="title_and_infos">
        <div class="title">
          <Header_info title="Editar" />
        </div>

        <div class="progress__bar"></div>
      </div>
      <button onClick$={handleSend}></button>
      {productData.value.status?.active ? (
        <>
          <div class="container_view_product">
            <div class="left">
              <ModifyProduct__ProgressBarSteps step={step.value} setStep={step} />
            </div>
            <div class="content__center">
              {step.value == 1 && (
                <>
                  {' '}
                  <TitleSubtitleComponent
                    title="Update or add new images for this product"
                    subtitle="Make your product unique through images."
                  />
                  <br />
                  <Product_images
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
              {step.value == 2 && (
                <>
                  {' '}
                  <Product_data
                    action={action}
                    productStore={productStore}
                    productDataHandlers={productDataHandlers}
                  />
                </>
              )}

              {step.value == 3 && (
                <Product_physical_details_of_the_product
                  action={action}
                  productStore={productStore}
                  productDataHandlers={productDataHandlers}
                />
              )}

              {step.value == 4 && (
                <>
                  <Product_description_short
                    action={action}
                    productStore={productStore}
                    productProductDetailsHandlers={productProductDetailsHandlers}
                  />
                </>
              )}
              {step.value == 5 && (
                <>
                  <TitleSubtitleComponent
                    title="Keywords for this product"
                    subtitle="Add keywords to help customers find your product."
                  />
                  <br />
                  <Product_keywords productStore={productStore} />
                </>
              )}
            </div>

            <div class="right">
              <Product_button_edit action={action} handleSend={handleSend} />

              <br />
              <Product_data_no_edit productStore={productStore} />
            </div>
          </div>
        </>
      ) : (
        <div>El producto no está activo</div>
      )}

    </div>
  );
});

export const head: DocumentHead = {
  title: 'Modificar producto - Douvery Stores',
  meta: [
    {
      name: 'description',
      content:
        'Recursos infinitos para tu tienda, vende con facilidad en Douvery.',
    },
  ],
};
