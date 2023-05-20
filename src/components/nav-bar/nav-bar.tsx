import { component$, useStylesScoped$ } from '@builder.io/qwik';

import styles from './nav-bar.css?inline';
export const NavBar = component$(() => {
  useStylesScoped$(styles);
  return (
    <>
      <nav class="navbar">
        <div class="logo">
          <img
            width={200}
            height={100}
            src="https://res.cloudinary.com/douvery/image/upload/v1682700013/users/PEPITO-635c0ac87482cdf128be119a/moupkmy3bqsmwczvjggs.svg"
            alt="Logo Douvery Stores"
          />
          <a href="">Douvery Stores</a>
        </div>
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
          <li class={`tabs-nav`}>
            <a href="/login">Inicio de sesión</a>
          </li>
          <li class={`tabs-nav`}>
            <a href="/registro">Crear una cuenta</a>
          </li>
        </ul>

        <div class="nav-search-cart-login">
          <div class="account">
            <div class="login">
              <a href="/a/login"> Iniciar sesión</a>
            </div>
            Or
            <div class="register">
              <a href="/a/register">Registrarme</a>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
});
