import { $, component$, useSignal, useStylesScoped$ } from '@builder.io/qwik';
import { type DocumentHead } from '@builder.io/qwik-city';
import style from './index.css?inline';
import { DouveryAuthLogo } from '~/components/DouveryAuthLogo/douvery-auth-logo';
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
                    ¿No tiene una cuenta?
                    <a href="/a/register" class="forgot-new-account-link">
                        Crear una
                    </a>
                </div>
            </div>

        </div>
    </>
});

const PersonalInfo = ({ nextStep }: any) => (
    <form class="form-container">
        {/* Sección 1: Información Personal */}
        <div class="info-section">
            <div class="section-title">Información Personal</div>

            <br />

            <div class="form-group">
                <label for="name">Nombre:</label>
                <input type="text" id="name" name="name" required autoComplete="on" />
            </div>
            <div class="form-group">
                <label for="lastName">Apellido:</label>
                <input type="text" id="lastName" name="lastName" required autoComplete="on" />
            </div>
            <div class="form-group">
                <label for="email">Email de preferencia</label>
                <input type="email" id="email" name="email" required />
            </div>
            <div class="form-group">
                <label for="password">Contraseña:</label>
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
            <div class="section-title">Información de la Tienda</div>
            <br />
            <div class="form-group">
                <label for="storeName">Nombre de la Tienda</label>
                <input type="text" id="storeName" name="storeName" required />
            </div>
            <div class="form-group">
                <label for="storeCategory">Categoría de la Tienda</label>
                <input type="text" id="storeCategory" name="storeCategory" required />
            </div>
            <div class="form-group">
                <label for="storeDescription">Descripción de la Tienda</label>
                <textarea id="storeDescription" name="storeDescription" required></textarea>
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
            <div class="section-title">Información de Envío</div>
            <br />
            <div class="form-group">
                <label for="shippingLocation">Ubicación del Envío</label>
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
