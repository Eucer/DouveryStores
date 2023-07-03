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
    previewIMGs: Array(7).fill([]),
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
      <Header_info title="Modificar producto" />
      <div class="container">
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
        <div class="center"></div>
        <div class="rigth"></div>
      </div>
    </div>
  );
});
