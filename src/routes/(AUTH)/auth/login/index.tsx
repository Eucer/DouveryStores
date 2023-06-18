import { component$, useStylesScoped$ } from '@builder.io/qwik';
import { Form, globalAction$, z, zod$ } from '@builder.io/qwik-city';
import type { DocumentHead } from '@builder.io/qwik-city';
import type { RequestHandler } from '@builder.io/qwik-city';
import styles from './index.css?inline';

import { DouveryAuthLogo } from '~/components/DouveryAuthLogo/douvery-auth-logo';
import { TermsConditions } from '~/components/Terms&Conditions/terms-Conditions';
import {
  DATA_ACCESS_COOKIE_SESSION_USER,
  setCookiesDataStore,
  setCookiesDataUser,
} from '~/services/session/dataRequests';
import { urlServerLocal } from '~/services/util/server/server';

export interface Store {
  email: string;
  password: string;
}
export const onGet: RequestHandler = async ({ cookie, redirect }) => {
  const acccessToken = cookie.get(DATA_ACCESS_COOKIE_SESSION_USER)?.value;
  if (acccessToken) {
    throw redirect(302, '/');
  }
};

export const useLogin = globalAction$(
  async ({ nameStore, email, password }, { fail, cookie, headers, url }) => {
    const response = await fetch(`${urlServerLocal}/douvery/api-store/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        nameStore: nameStore,
        email: email,
        password: password,
      }),
    });

    const dataAccess = await response.json();

    if (!response.ok) {
      return fail(401, {
        message: 'Email o password no válidos',
      });
    }

    setCookiesDataUser(dataAccess.userInfo, cookie);
    setCookiesDataStore(dataAccess.storeInfo, cookie);

    const query = url.searchParams.get('rr') || '/';
    headers.set('location', query);
  },
  zod$({
    nameStore: z.string({
      required_error: 'Name store requerido',
    }),
    email: z
      .string({
        required_error: 'Email requerido',
      })
      .email({
        message: 'Please enter a valid email',
      }),
    password: z.string({
      required_error: 'Password is required',
    }),
  })
);

export default component$(() => {
  useStylesScoped$(styles);

  const action = useLogin();

  return (
    <div class="ctr-login">
      {' '}
      <DouveryAuthLogo />
      <div class="login-container">
        <div class="header-login">
          <div class="title-login">Accede a tu cuenta</div>{' '}
          <div class="sub-title-login">Inicia session de forma segura</div>{' '}
        </div>

        <Form action={action}>
          <div class="form-group">
            <label for="email">Name Store</label>
            <input type="text" id="nameStore" name="nameStore" />
            {action.value?.fieldErrors?.nameStore && (
              <span class="error">{action.value?.fieldErrors?.nameStore}</span>
            )}
          </div>
          <div class="form-group">
            <label for="email">Email</label>
            <input type="email" id="email" name="email" />
            {action.value?.fieldErrors?.email && (
              <span class="error">{action.value?.fieldErrors?.email}</span>
            )}
          </div>
          <div class="form-group">
            <label for="password">Password</label>
            <input type="password" id="password" name="password" />
            {action.value?.fieldErrors?.password && (
              <span class="error">{action.value?.fieldErrors?.password}</span>
            )}
          </div>

          {action.value?.message && (
            <div>
              {' '}
              <br />
              {action.isRunning ? (
                <span class="loa-s">Verifying...</span>
              ) : (
                <span class="error ">{action.value?.message}</span>
              )}
              <div class="form-group need-account">
                ¿Olvidaste la constraseña?
                <a href="/a/recover-account" class="forgot-new-account-link">
                  Recuperar
                </a>
              </div>{' '}
              <br />
            </div>
          )}

          <div class="form-group">
            <button class={'login-button'}>
              <span class="button-text">
                {action.isRunning
                  ? 'Loading...'
                  : action.value?.message
                  ? 'Error'
                  : 'Log in'}
              </span>
            </button>
          </div>
          <div class="form-group need-account">
            ¿No tiene una cuenta?
            <a href="/auth/register" class="forgot-new-account-link">
              Crear una
            </a>
          </div>
        </Form>
        <TermsConditions />
      </div>
    </div>
  );
});
export const head: DocumentHead = {
  title: 'Inicar Session - Douvery Store',
  meta: [
    {
      name: 'description',
      content: 'Inicar Session - Douvery Store',
    },
  ],
};
