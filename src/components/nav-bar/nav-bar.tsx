import { component$, useStylesScoped$ } from '@builder.io/qwik';

import styles from './nav-bar.css?inline';
import { useGetCurrentStore, useGetCurrentUser } from '~/routes/layout';
import { ProfileDropdownNavBar } from '../dropdowns/dropdown-navbar/dropdown-navbar';
export const NavBar = component$(() => {
  useStylesScoped$(styles);
  const user = useGetCurrentUser().value;
  const store = useGetCurrentStore().value;
  return (
    <>
      <nav class="navbar">
        <a href="/">
          <div class="logo">
            <img
              width={200}
              height={100}
              src="https://res.cloudinary.com/douvery/image/upload/v1682700013/users/PEPITO-635c0ac87482cdf128be119a/moupkmy3bqsmwczvjggs.svg"
              alt="Logo Douvery Stores"
            />
            <p>Douvery Stores</p>
          </div>
        </a>

        <ul class="nav-links">
          <li class={`tabs-nav`}>
            <a href="/gestion-productos">Gestión de productos</a>
          </li>
          <li class={`tabs-nav`}>
            <a href="/administracion-cuenta">Administración de cuenta</a>
          </li>
          <li class={`tabs-nav`}>
            <a href="/soporte">Soporte</a>
          </li>
          <li class={`tabs-nav`}>
            <a href="/faq">Preguntas frecuentes</a>
          </li>
        </ul>

        <div class="nav-search-cart-login">
          {user ? (
            <>
              <ProfileDropdownNavBar user={user} store={store} />
            </>
          ) : (
            <>
              {' '}
              <div class="account">
                <div class="login">
                  <a href="/auth/login"> Iniciar sesión</a>
                </div>
                Or
                <div class="register">
                  <a href="/auth/register">Registrarme</a>
                </div>
              </div>
            </>
          )}
        </div>
      </nav>
    </>
  );
});
