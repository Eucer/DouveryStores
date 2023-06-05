import {
  $,
  component$,
  useSignal,
  useStore,
  useStylesScoped$,
} from '@builder.io/qwik';
import { type DocumentHead } from '@builder.io/qwik-city';
import style from './index.css?inline';
import { DouveryAuthLogo } from '~/components/DouveryAuthLogo/douvery-auth-logo';
import { TermsConditions } from '~/components/Terms&Conditions/terms-Conditions';
export default component$(() => {
  useStylesScoped$(style);
  const step = useSignal(1);
  const store = useStore({
    adminName: '',
    adminEmail: '',
    adminPhone: '',
    password: '',
    passwordconfirm: '',
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

    onPasswordChange: $((e: any) => {
      store.password = e.target.value;
    }),
    onPasswordConfirmChange: $((e: any) => {
      store.passwordconfirm = e.target.value;
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
              store={store}
              handlers={handlers}
              nextStep={nextStep}
            />
          )}
          {step.value === 2 && (
            <StoreInfo
              store={store}
              handlersStore={handlersStore}
              nextStep={nextStep}
              prevStep={prevStep}
            />
          )}

          {step.value === 3 && <ShippingInfo prevStep={prevStep} />}
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

const PersonalInfo = ({ nextStep, store, handlers }: any) => {
  const {
    onAdminNameChange,
    onAdminEmailChange,
    onAdminPhoneChange,
    onPasswordChange,
    onPasswordConfirmChange,
  } = handlers;

  return (
    <form class="form-container">
      {/* Sección 1: Información Personal */}
      <div class="info-section">
        <br />
        <div class="form-group">
          <label for="name">Nombre de Administrador</label>
          <input
            type="text"
            value={store.adminName}
            id="name"
            name="name"
            required
            autoComplete="on"
            onInput$={onAdminNameChange}
          />
        </div>
        <div class="form-group">
          <label for="email">Email de Administrador</label>
          <input
            type="email"
            value={store.adminEmail}
            id="email"
            name="email"
            required
            onInput$={onAdminEmailChange}
          />
        </div>
        <div class="form-group">
          <label for="email">Phone de Administrador</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
            required
            value={store.adminPhone}
            onInput$={onAdminPhoneChange}
          />
          <small>Formato: 123-456-7890</small>
        </div>
        <div class="form-group">
          <label for="password">Contraseña</label>
          <input
            value={store.password}
            type="password"
            id="password"
            name="password"
            required
            autoComplete="on"
            onInput$={onPasswordChange}
          />
        </div>
        <div class="form-group">
          <label for="password">Confirmar Contraseña</label>
          <input
            value={store.passwordconfirm}
            type="password"
            id="password"
            name="password"
            required
            autoComplete="on"
            onInput$={onPasswordConfirmChange}
          />
        </div>
      </div>{' '}
      <br />
      <div class="buttons-container">
        <button type="button" class="next-button" onClick$={nextStep}>
          Siguiente
        </button>
      </div>
    </form>
  );
};

const StoreInfo = ({ nextStep, prevStep, store, handlersStore }: any) => {
  const {
    onStoreNameChange,
    onStoreDescriptionChange,
    onStoreEmailChange,
    onStorePhoneChange,
    onStoreTypeChange,
  } = handlersStore;
  return (
    <form class="form-container">
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
        </div>
        <div class="form-group">
          <label for="email">Email contacto</label>
          <input
            value={store.storeEmail}
            onInput$={onStoreEmailChange}
            type="email"
            id="email"
            name="email"
            required
          />
        </div>
        <div class="form-group">
          <label for="email">Phone contacto</label>
          <input
            value={store.storePhone}
            onInput$={onStorePhoneChange}
            type="phone"
            id="phone"
            name="phone"
            required
          />
        </div>
        <div class="form-group">
          <label for="email">Tipo de tienda</label>
          <select
            value={store.storeType}
            onInput$={onStoreTypeChange}
            id="elegant-select"
          >
            <option>Tienda multiproducto</option>
          </select>
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
    </form>
  );
};

const ShippingInfo = ({ prevStep }: any) => (
  <form class="form-container">
    {/* Sección 3: Información de Envío */}
    <div class="info-section">
      <br />
      <div class="form-group">
        <label for="email">Pais origen</label>
        <select id="elegant-select">
          <option>Dominican Republic</option>
          <option>United States</option>
        </select>
      </div>
      <div class="form-group">
        <label for="shippingLocation">Ubicación de establecimiento</label>
        <input
          type="text"
          id="shippingLocation"
          name="shippingLocation"
          required
        />
      </div>
    </div>
    <br />
    <div class="buttons-container">
      <button type="button" class="prev-button" onClick$={prevStep}>
        Anterior
      </button>
      <button type="button" class="next-button">
        Enviar
      </button>
    </div>
  </form>
);

export const head: DocumentHead = {
  title: 'Register Store - Douvery Stores',
  meta: [
    {
      name: 'description',
      content: 'Registra tu tienda en Douvery.',
    },
  ],
};
