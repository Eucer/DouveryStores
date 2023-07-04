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
import { routeLoader$ } from '@builder.io/qwik-city';
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
    productDiscount: productData.value.discount,
    productMaxQty: 'Unlimited',
    productQty: 0,
    dimensionUnit: 'cm',
    productHeight: 0,
    productWidth: 0,
    productDepth: 0,
    weightUnit: 'lb',
    productWeight: 0,
    pd_deatilImgBox: '',
    productShortDescription: productData.value.description,
    productDescriptionFull: '',
    productKeywords: [],
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

  return (
    <div class="container__all">
      <Header_info
        title={'Modificar producto' + ' - ' + productStore.productDui}
      />

      <div class="container_view_product">
        <div class="left">
          <Product_images
            action="edit"
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
            action="edit"
            productStore={productStore}
            productDataHandlers={productDataHandlers}
          />
          <Product_description_short
            action="edit"
            productStore={productStore}
            productProductDetailsHandlers={productProductDetailsHandlers}
          />
        </div>
        <div class="right">
          <br />
          <Product_button_edit />
          <div class="separator_edit"></div>
          <br />
          <Product_data_no_edit productStore={productStore} />
        </div>
      </div>
      <Product_physical_details_of_the_product
        action="edit"
        productStore={productStore}
        productDataHandlers={productDataHandlers}
      />
    </div>
  );
});
