import { $, component$, useSignal, useStylesScoped$ } from '@builder.io/qwik';
import { type DocumentHead } from '@builder.io/qwik-city';
import style from './index.css?inline';
import { DouveryAuthLogo } from '~/components/DouveryAuthLogo/douvery-auth-logo';
import { TermsConditions } from '~/components/Terms&Conditions/terms-Conditions';
export default component$(() => {
    useStylesScoped$(style);
    const step = useSignal(1);
    const nextStep = $(() => {
        step.value++;
    });

    const prevStep = $(() => {
        step.value--;
    });
    return <>
        <div class="all-container">
            <DouveryAuthLogo />
            <div class="login-container">

                <div class="header-login">
                    <div class="title-login">Solicitud para tienda</div>
                    <div class="sub-title-login">De forma segura</div>
                </div>
                <div class="hr1" />
                <div class="progress-bar">
                    <div class="progress" style={{ width: `${(step.value / 3) * 100}%` }}></div>
                </div>

                {step.value === 1 && <PersonalInfo nextStep={nextStep} />}
                {step.value === 2 && <StoreInfo nextStep={nextStep} prevStep={prevStep} />}

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
});

const PersonalInfo = ({ nextStep }: any) => (
    <form class="form-container">
        {/* Sección 1: Información Personal */}
        <div class="info-section">
            <br />
            <div class="form-group">
                <label for="name">Nombre de Administrador</label>
                <input type="text" id="name" name="name" required autoComplete="on" />
            </div>
            <div class="form-group">
                <label for="email">Email de Administrador</label>
                <input type="email" id="email" name="email" required />
            </div>
            <div class="form-group">
                <label for="email">Phone de Administrador</label>
                <input type="tel" id="phone" name="phone" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" required />
                <small>Formato: 123-456-7890</small>

            </div>
            <div class="form-group">
                <label for="password">Contraseña</label>
                <input type="password" id="password" name="password" required autoComplete="on" />
            </div>
            <div class="form-group">
                <label for="password">Confirmar Contraseña</label>
                <input type="password" id="password" name="password" required autoComplete="on" />
            </div>
        </div> <br />
        <div class="buttons-container">

            <button type="button" class="next-button" onClick$={nextStep}>
                Siguiente
            </button>
        </div>
    </form>
);

const StoreInfo = ({ nextStep, prevStep }: any) => (
    <form class="form-container">
        {/* Sección 2: Información de la Tienda */}
        <div class="info-section">

            <br />
            <div class="form-group">
                <label for="storeName">Nombre de la Tienda</label>
                <input type="text" id="storeName" name="storeName" required />
            </div>

            <div class="form-group">
                <label for="storeDescription">Descripción de la Tienda</label>
                <textarea id="storeDescription" name="storeDescription" required></textarea>
            </div>
            <div class="form-group">
                <label for="email">Email contacto</label>
                <input type="email" id="email" name="email" required />
            </div>
            <div class="form-group">
                <label for="email">Tipo de tienda</label>
                <select id="elegant-select">
                    <option  >Tienda multiproducto</option>

                </select>

            </div>



        </div> <br />
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

const ShippingInfo = ({ prevStep }: any) => (
    <form class="form-container">
        {/* Sección 3: Información de Envío */}
        <div class="info-section">

            <br />
            <div class="form-group">
                <label for="email">Pais origen</label>
                <select id="elegant-select">
                    <option   >Dominican Republic</option>
                    <option   >United States</option>

                </select>

            </div>
            <div class="form-group">
                <label for="shippingLocation">Ubicación de establecimiento</label>
                <input type="text" id="shippingLocation" name="shippingLocation" required />
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
            content:
                'Registra tu tienda en Douvery.',
        },
    ],
};
