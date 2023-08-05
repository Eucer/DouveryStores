import {
  $,
  component$,
  useSignal,
  useStore,
  useStylesScoped$,
} from '@builder.io/qwik';
import {
  globalAction$,
  type DocumentHead,
  zod$,
  z,
} from '@builder.io/qwik-city';
import style from './index.css?inline';
import { DouveryAuthLogo } from '~/components/DouveryAuthLogo/douvery-auth-logo';
import { TermsConditions } from '~/components/Terms&Conditions/terms-Conditions';
import { urlServerNode } from '~/services/util/server/server';
import {
  setCookiesDataStore,
  setCookiesDataUser,
} from '~/services/session/dataRequests';

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
    { fail, headers, cookie }
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

    setCookiesDataUser(response.userInfo, cookie);
    setCookiesDataStore(response.storeInfo, cookie);
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
  const store = useStore({
    adminName: '',
    adminEmail: '',
    adminPhone: '',
    password: '',
    storeName: '',
    storeDescription: '',
    storeEmail: '',
    storePhone: '',
    storeType: '',
    storeCountry: '',
    storeLocation: '',
  });
  const nextStep = $(() => {
    step.value++;
  });

  const prevStep = $(() => {
    step.value--;
  });
  const handlers = {
    onAdminNameChange: $((e: any) => {
      store.adminName = e.target.value;
    }),

    onAdminEmailChange: $((e: any) => {
      store.adminEmail = e.target.value;
    }),
    onAdminPhoneChange: $((e: any) => {
      store.adminPhone = e.target.value;
    }),

    onAdminPasswordChange: $((e: any) => {
      store.password = e.target.value;
    }),
  };

  const handlersStore = {
    onStoreNameChange: $((e: any) => {
      store.storeName = e.target.value;
    }),

    onStoreDescriptionChange: $((e: any) => {
      store.storeDescription = e.target.value;
    }),

    onStoreEmailChange: $((e: any) => {
      store.storeEmail = e.target.value;
    }),

    onStorePhoneChange: $((e: any) => {
      store.storePhone = e.target.value;
    }),

    onStoreTypeChange: $((e: any) => {
      store.storeType = e.target.value;
    }),

    onStoreCountryChange: $((e: any) => {
      store.storeCountry = e.target.value;
    }),

    onStoreLocationChange: $((e: any) => {
      store.storeLocation = e.target.value;
    }),
  };
  const action = useAction();
  const handleSubmit = $(async () => {
    const { value } = await action.submit({
      adminName: store.adminName,
      adminEmail: store.adminEmail,
      adminPhone: store.adminPhone,
      password: store.password,
      storeName: store.storeName,
      storeDescription: store.storeDescription,
      storeEmail: store.storeEmail,
      storePhone: store.storePhone,
      storeType: store.storeType,
      storeCountry: store.storeCountry,
      storeLocation: store.storeLocation,
    });
    console.log(value);
  });
  return (
    <>
      <div class="all-container">
        <DouveryAuthLogo />
        <div class="login-container">
          <div class="header-login">
            <div class="title-login">Solicitud para tienda</div>
            <div class="sub-title-login">De forma segura</div>
          </div>
          <div class="hr1" />
          <div class="progress-bar">
            <div
              class="progress"
              style={{ width: `${(step.value / 3) * 100}%` }}
            ></div>
          </div>

          {step.value === 1 && (
            <PersonalInfo
              action={action}
              store={store}
              handlers={handlers}
              nextStep={nextStep}
            />
          )}
          {step.value === 2 && (
            <StoreInfo
              action={action}
              store={store}
              handlersStore={handlersStore}
              nextStep={nextStep}
              prevStep={prevStep}
            />
          )}

          {step.value === 3 && (
            <>
              <ShippingInfo
                action={action}
                handlersStore={handlersStore}
                store={store}
                prevStep={prevStep}
              />
              <div class="buttons-container">
                <button type="button" class="prev-button" onClick$={prevStep}>
                  Anterior
                </button>
                <button
                  onClick$={handleSubmit}
                  type="submit"
                  class="next-button"
                >
                  {action.isRunning
                    ? 'Loading...'
                    : action.value?.message
                      ? 'Error, intente de nuevo'
                      : 'Enviar'}{' '}
                </button>
              </div>
            </>
          )}
          <br />
          <div class="hr1" />
          <br />

          <div class="form-group need-account">
            ¿Ya tiene una cuenta?
            <a href="/auth/login" class="forgot-new-account-link">
              Iniciar sesión
            </a>
          </div>
          <TermsConditions />
        </div>
      </div>
    </>
  );
});

const PersonalInfo = ({ action, nextStep, store, handlers }: any) => {
  const {
    onAdminNameChange,
    onAdminEmailChange,
    onAdminPhoneChange,
    onAdminPasswordChange,
  } = handlers;

  return (
    <div class="form-container">
      {/* Sección 1: Información Personal */}
      <div class="info-section">
        <br />
        <div class="form-group">
          <label for="adminName">Nombre de Administrador</label>
          <input
            type="text"
            value={store.adminName}
            id="adminName"
            name="adminName"
            required
            onInput$={onAdminNameChange}
          />
          {action.value?.fieldErrors?.adminName && (
            <span class="error">{action.value?.fieldErrors?.adminName}</span>
          )}
        </div>
        <div class="form-group">
          <label for="adminEmail">Email de Administrador</label>
          <input
            type="email"
            value={store.adminEmail}
            id="adminEmail"
            name="adminEmail"
            required
            onInput$={onAdminEmailChange}
          />
          {action.value?.fieldErrors?.adminEmail && (
            <span class="error">{action.value?.fieldErrors?.adminEmail}</span>
          )}
        </div>
        <div class="form-group">
          <label for="adminPhone">Phone de Administrador</label>
          <input
            type="tel"
            id="adminPhone"
            name="adminPhone"
            pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
            required
            value={store.adminPhone}
            onInput$={onAdminPhoneChange}
          />
          <small>Formato: 123-456-7890</small>
          {action.value?.fieldErrors?.adminPhone && (
            <span class="error">{action.value?.fieldErrors?.adminPhone}</span>
          )}
        </div>
        <div class="form-group">
          <label for="adminPassword">Contraseña</label>
          <input
            value={store.password}
            type="password"
            id="password"
            name="password"
            required
            autoComplete="on"
            onInput$={onAdminPasswordChange}
          />
          {action.value?.fieldErrors?.password && (
            <span class="error">{action.value?.fieldErrors?.password}</span>
          )}
        </div>
      </div>{' '}
      <br />
      <div class="buttons-container">
        <button type="button" class="next-button" onClick$={nextStep}>
          Siguiente
        </button>
      </div>
    </div>
  );
};

const StoreInfo = ({
  action,
  nextStep,
  prevStep,
  store,
  handlersStore,
}: any) => {
  const {
    onStoreNameChange,
    onStoreDescriptionChange,
    onStoreEmailChange,
    onStorePhoneChange,
    onStoreTypeChange,
  } = handlersStore;
  return (
    <div class="form-container">
      {/* Sección 2: Información de la Tienda */}
      <div class="info-section">
        <br />
        <div class="form-group">
          <label for="storeName">Nombre de la Tienda</label>
          <input
            value={store.storeName}
            onInput$={onStoreNameChange}
            type="text"
            id="storeName"
            name="storeName"
            required
          />
          {action.value?.fieldErrors?.storeName && (
            <span class="error">{action.value?.fieldErrors?.storeName}</span>
          )}
        </div>

        <div class="form-group">
          <label for="storeDescription">Descripción de la Tienda</label>
          <textarea
            value={store.storeDescription}
            onInput$={onStoreDescriptionChange}
            id="storeDescription"
            name="storeDescription"
            required
          ></textarea>
          {action.value?.fieldErrors?.storeDescription && (
            <span class="error">
              {action.value?.fieldErrors?.storeDescription}
            </span>
          )}
        </div>
        <div class="form-group">
          <label for="storeEmail">Email contacto</label>
          <input
            value={store.storeEmail}
            onInput$={onStoreEmailChange}
            type="email"
            id="storeEmail"
            name="storeEmail"
            required
          />
          {action.value?.fieldErrors?.storeEmail && (
            <span class="error">{action.value?.fieldErrors?.storeEmail}</span>
          )}
        </div>
        <div class="form-group">
          <label for="storePhone">Phone contacto</label>
          <input
            value={store.storePhone}
            onInput$={onStorePhoneChange}
            type="tel"
            id="storePhone"
            name="storePhone"
            required
          />
          {action.value?.fieldErrors?.storePhone && (
            <span class="error">{action.value?.fieldErrors?.storePhone}</span>
          )}
        </div>
        <div class="form-group">
          <label for="storeType">Tipo de tienda</label>
          <select
            onChange$={onStoreTypeChange}
            id="storeType"
            name="storeType"
            value={store.storeType}
          >
            <option value=""></option>

            <option value="storeMulti">Multiproduct store</option>
            <option value="storeElectronic">Electronic Store</option>
          </select>
          {action.value?.fieldErrors?.storeType && (
            <span class="error">{action.value?.fieldErrors?.storeType}</span>
          )}
        </div>
      </div>{' '}
      <br />
      <div class="buttons-container">
        <button type="button" class="prev-button" onClick$={prevStep}>
          Anterior
        </button>
        <button type="button" class="next-button" onClick$={nextStep}>
          Siguiente
        </button>
      </div>
    </div>
  );
};

const ShippingInfo = ({ action, handlersStore, store }: any) => {
  const { onStoreCountryChange, onStoreLocationChange } = handlersStore;
  return (
    <div class="form-container">
      <div class="info-section">
        <br />
        <div class="form-group">
          <label for="email">Pais origen</label>
          <select
            onChange$={onStoreCountryChange}
            id="storeCountry"
            name="storeCountry"
            value={store.storeCountry}
          >
            {' '}
            <option value=""></option>
            <option value="RD">Dominican Republic</option>
            <option value="USA">United States</option>
          </select>
          {action.value?.fieldErrors?.storeCountry && (
            <span class="error">{action.value?.fieldErrors?.storeCountry}</span>
          )}
        </div>
        <div class="form-group">
          <label for="storeLocation">Ubicación de establecimiento</label>

          <input
            type="text"
            id="storeLocation"
            value={store.storeLocation}
            onInput$={onStoreLocationChange}
            name="storeLocation"
            required
          />
          {action.value?.fieldErrors?.storeLocation && (
            <span class="error">
              {action.value?.fieldErrors?.storeLocation}
            </span>
          )}
        </div>
      </div>
      {action.value?.fieldErrors && (
        <span class="error">
          Porfavor completa el formulario completamente.
        </span>
      )}

      {action.value?.message && (
        <div>
          {' '}
          <br />
          {action.isRunning ? (
            <span class="loa-s">Verifying...</span>
          ) : (
            <span class="error ">{action.value?.message}</span>
          )}
        </div>
      )}
      <br />
    </div>
  );
};

export const head: DocumentHead = {
  title: 'Register Store - Douvery Stores',
  meta: [
    {
      name: 'description',
      content: 'Registra tu tienda en Douvery.',
    },
  ],
};
