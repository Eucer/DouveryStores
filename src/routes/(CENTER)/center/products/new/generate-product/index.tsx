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
    productName: '',
    productPrice: 0,
    productDescription: '',
    productKeywords: [],
    productBullets: [],
    productHighlights: [],
    productSEO: '',
  });
  const productCategoryHandlers = {
    onProductCategoryChange: $((e: any) => {
      productStore.productCategory = e.target.value;
    }),
    onProductSubCategoryChange: $((e: any) => {
      productStore.productSubCategory = e.target.value;
    }),
  };
  const productDataHandlers = {
    onProductNameChange: $((e: any) => {
      productStore.productName = e.target.value;
    }),
    onProductPriceChange: $((e: any) => {
      productStore.productPrice = e.target.value;
    }),
  };
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
  const productSEOHandlers = {
    onProductSEOChange: $((e: any) => {
      productStore.productSEO = e.target.value;
    }),
  };
  const action = useAction();
  return (
    <>
      <div class="container__all">
        <div class="title_and_infos">
          <div class="title">
            <BreadcrumbsSTL1 />
            <div class="product_new__title">Generate product</div>
          </div>

          <div class="progress__bar">
            <ProgressBarSteps />
          </div>
        </div>
        <div class="container__form">
          {step.value === 1 && (
            <>
              {' '}
              <h1>Selección de categoría y subcategoría</h1>
              <ProductCategory
                action={action}
                productStore={productStore}
                productCategoryHandlers={productCategoryHandlers}
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
  action,
  nextStep,
  productStore,
  productCategoryHandlers,
}: any) => {
  const { productCategory } = productCategoryHandlers;

  return (
    <div class="form-container">
      <div class="info-section">
        <br />
        <div class="form-group">
          <label for="adminName">Nombre de Administrador</label>
          <input
            type="text"
            value={productStore.productName}
            id="adminName"
            name="adminName"
            required
            onInput$={productCategory}
          />
          {action.value?.fieldErrors?.adminName && (
            <span class="error">{action.value?.fieldErrors?.adminName}</span>
          )}
        </div>
      </div>

      <br />
      <div class="buttons-container">
        <button type="button" class="next-button" onClick$={nextStep}>
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
