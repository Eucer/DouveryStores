import { component$, useStylesScoped$ } from '@builder.io/qwik';

import styles from './nav-bar.css?inline';
import { useGetCurrentUser } from '~/routes/layout';

import { LogoNavbar } from './logo-navbar/logo-navbar';
//import { ProfileDropdownNavBar } from '../dropdowns/dropdown-navbar/dropdown-navbar';
export const NavBar = component$(() => {
  useStylesScoped$(styles);
  const user = useGetCurrentUser().value;

  return (
    <>
      <nav class="navbar">
        <LogoNavbar />
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
            <></>
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
