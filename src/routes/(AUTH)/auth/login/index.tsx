import {
  $,
  component$,
  useStore,
  useStylesScoped$,
  useTask$,
} from '@builder.io/qwik';
import { Form, globalAction$, z, zod$ } from '@builder.io/qwik-city';
import type { DocumentHead } from '@builder.io/qwik-city';
import type { RequestHandler } from '@builder.io/qwik-city';
import styles from './index.css?inline';

import { DouveryAuthLogo } from '~/components/DouveryAuthLogo/douvery-auth-logo';
import { TermsConditions } from '~/components/Terms&Conditions/terms-Conditions';
import {
  DATA_ACCESS_COOKIE_SESSION_USER,

  setCookiesDataUser,
} from '~/services/session/dataRequests';

import { fetchSuggestionsName } from '~/services/fetch/suggestions/store/fech-suggestions-store';
import { IconsSearch } from '~/components/icons/search';
import { loginUser } from '~/services/session/login';

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
  async ({ email, password }, { fail, cookie, headers, url }) => {
    try {
      const dataAccess = await loginUser(email, password);

      setCookiesDataUser(dataAccess.accessToken, cookie);


      const query = url.searchParams.get('rr') || '/';
      headers.set('location', query);
    } catch (error) {
      return fail(401, {
        message: 'Email or password not valid',
      });
    }
  },
  zod$({
    email: z
      .string({
        required_error: 'Email required',
      })
      .email({
        message: 'Please enter a valid email',
      }),
    password: z.string({
      required_error: 'Password is required',
    }),
  })
);

interface IState {
  searchInput: string;
  searchResults: string[];
  selectedValue: string;
  showSuggestions: boolean;
}
export default component$(() => {
  useStylesScoped$(styles);

  const action = useLogin();

  const state = useStore<IState>({
    searchInput: '',
    searchResults: [],
    selectedValue: '',
    showSuggestions: true,
  });

  useTask$(async ({ track }) => {
    const searchInput = track(() => state.searchInput);

    if (!searchInput) {
      state.searchResults = [];
      return;
    }

    const controller = new AbortController();
    state.searchResults = await fetchSuggestionsName(
      state.searchInput,
      controller
    );

    return () => {
      controller.abort();
    };
  });



  const handleSuggestionClick = $((suggestion: any) => {
    state.searchInput = suggestion;
    state.showSuggestions = false;
  });

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


            {state.showSuggestions && state.searchResults?.length > 0 && (
              <div class="suggestions">
                <ul>
                  {state.searchResults.map((suggestion) => (
                    <li class="crrtrSrers" key={suggestion}>
                      <div
                        class="suggestion"
                        onClick$={() => {
                          handleSuggestionClick(suggestion);
                        }}
                      >
                        <IconsSearch />
                        <span class="lis-sgrs">{suggestion}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
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
