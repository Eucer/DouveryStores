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
import { globalAction$, routeLoader$, z, zod$ } from '@builder.io/qwik-city';
import { DATA_ACCESS_COOKIE_SESSION_USER } from '~/services/session/dataRequests';
import {
  decodeToken,
  passwordKEY,
  serverKey,
} from '~/services/util/fuction/token';
import { fetchViewProductDui } from '~/services/fetch/products/view-product/view-product';
import { Product_data } from '~/components/(Index)/modify/product_data/product_data';
import { Product_data_no_edit } from '~/components/(Index)/modify/product_data_no_edit/product_data_no_edit';
import { Product_button_edit } from '~/components/(Index)/modify/product_button_edit/product_button_edit';
import { Product_physical_details_of_the_product } from '~/components/(Index)/modify/product_physical_details_of_the_product/product_physical_details_of_the_product';
import { Product_description_short } from '~/components/(Index)/modify/product_description_short/product_description_short';
import { Product_keywords } from '~/components/(Index)/modify/product_keywords/product_keywords';
import { TitleSubtitleComponent } from '~/components/use/title component/TitleSubtitleComponent/title-subtitle-component';
import { urlServerLocal } from '~/services/util/server/server';
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
    { fail, params }
  ) => {
    const res = await fetch(`${urlServerLocal}/api-store/edit/product`, {
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
    console.log(response);
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
  const user = decodeToken(accessCookie, passwordKEY, serverKey);
  const product = await fetchViewProductDui(dui as any, user);

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

  const productStore = useStore({
    productDui: productData.value.dui,
    productCreatedAt: productData.value.createdAt,
    productUpdatedAt: productData.value.updatedAt,
    productUploaded_by: productData.value.uploaded_by,
    productCategory: productData.value.category,
    productSubCategory: productData.value.subCategory,
    selectedCategoryIndex: -1,
    selectedSubCategoryIndex: -1,
    productName: productData.value.name,
    productPrice: productData.value.price,
    productBrand: productData.value.marca || productData.value.brand,
    productGTIN: productData.value.gtin,
    productDiscount: productData.value.discount || 0,
    productMaxQty: productData.value.maxQuantitySale,
    productQty: productData.value.quantity,
    dimensionUnit: productData.value.basicFeatures?.util?.dimensionUnit || '',
    productHeight: productData.value.basicFeatures?.util?.height || 0,
    productWidth: productData.value.basicFeatures?.util?.width || 0,
    productDepth: productData.value.basicFeatures?.util?.depth || 0,
    weightUnit: productData.value.basicFeatures?.util?.weigthUnit || '',
    productWeight: productData.value.basicFeatures?.util?.weigth || 0,
    pd_deatilImgBox: '',
    productShortDescription: productData.value.description,
    productDescriptionFull: '',
    productKeywords: productData.value.keywords.split(' '),

    productBullets: productData.value.vinetas,
    productHighlights: [],
    productCondition: 'new',
  });
  const previewIMG = useStore({
    previewIMGPrimary: productData.value.images[0],
  });

  const previewIMGs = useStore({
    previewIMGs: Array(7)
      .fill(null)
      .map((_, index) => productData.value.images[index + 1] || []),
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
        width: productStore.productWidth,
        height: productStore.productHeight,
        depth: productStore.productDepth,
        weigth: productStore.productWeight,
        dimensionUnit: productStore.dimensionUnit,
        weigthUnit: productStore.weightUnit as any,
      },
    });
  });
  console.log({
    dimensionUnit: productStore.dimensionUnit as any,
    weigthUnit: productStore.weightUnit as any,
    maxQuantitySale: productData.value.maxQuantitySale as any,
  });
  return (
    <div class="container__all">
      <Header_info
        title={'Modificar producto' + ' - ' + productStore.productDui}
      />
      <button onClick$={handleSend}></button>

      <div class="container_view_product">
        <div class="left">
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
        </div>
        <div class="center">
          <Product_data
            action={action}
            productStore={productStore}
            productDataHandlers={productDataHandlers}
          />
          <br />
          <Product_physical_details_of_the_product
            action={action}
            productStore={productStore}
            productDataHandlers={productDataHandlers}
          />
        </div>
        <div class="right">
          <Product_button_edit action={action} handleSend={handleSend} />

          <br />
          <Product_data_no_edit productStore={productStore} />
        </div>
      </div>

      <div class="session_02">
        <br />
        <Product_description_short
          action={action}
          productStore={productStore}
          productProductDetailsHandlers={productProductDetailsHandlers}
        />
        <br />
        <TitleSubtitleComponent
          title="Keywords for this product
        
"
          subtitle="Add keywords to help customers find your product."
        />
        <br />
        <Product_keywords productStore={productStore} />
      </div>
    </div>
  );
});
