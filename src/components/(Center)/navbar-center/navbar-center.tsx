import { $, component$, useStore, useStylesScoped$ } from '@builder.io/qwik';

import styles from './navbar-center.css?inline';
import { useGetCurrentStore, useGetCurrentUser } from '~/routes/layout';
import { DouveryArrowDown } from '~/components/icons/arrow-down';
import { DropdownMenuCenter } from './dropdownMenu/dropdown-menu';
export const NavBarCenter = component$(() => {
  useStylesScoped$(styles);
  const user = useGetCurrentUser().value;
  const store = useGetCurrentStore().value;
  const isSearchOpen = useStore({ setIsSearchOpen: false });
  const isOpenDraw = useStore({ isOpenDraw: false });
  const handleMenuToggle = $(() => {
    isOpenDraw.isOpenDraw = !isOpenDraw.isOpenDraw;
  });
  const avatarSrc =
    user?.avatar ||
    'https://res.cloudinary.com/douvery/image/upload/v1686355888/vnzd3ccdmwigt2z7ihb2.png';
  const dropdownMenu = isOpenDraw.isOpenDraw ? <DropdownMenuCenter /> : null;

  const backdrop = isOpenDraw.isOpenDraw ? (
    <div
      class="backdrop"
      onclick$={() => (isOpenDraw.isOpenDraw = false)}
    ></div>
  ) : null;
  return (
    <>
      {backdrop}
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
          <li class="tabs-nav">
            <span>
              Gestión de productos <DouveryArrowDown size={20} />
            </span>
            <div class="tab-content">
              {' '}
              <div class="content">
                <p>Productos </p>
                <a href="#">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    viewBox="0 0 32 32"
                  >
                    <path fill="currentColor" d="M8 18h6v2H8zm0 4h10v2H8z" />
                    <path
                      fill="currentColor"
                      d="M26 4H6a2.002 2.002 0 0 0-2 2v20a2.002 2.002 0 0 0 2 2h20a2.002 2.002 0 0 0 2-2V6a2.002 2.002 0 0 0-2-2Zm-8 2v4h-4V6ZM6 26V6h6v6h8V6h6l.001 20Z"
                    />
                  </svg>{' '}
                  Subir nuevo producto
                </a>
                <a href="/">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="currentColor"
                      d="m15.5 19.925l-4.25-4.25l1.4-1.4l2.85 2.85l5.65-5.65l1.4 1.4l-7.05 7.05ZM21 10h-2V5h-2v3H7V5H5v14h6v2H5q-.825 0-1.413-.588T3 19V5q0-.825.588-1.413T5 3h4.175q.275-.875 1.075-1.438T12 1q1 0 1.788.563T14.85 3H19q.825 0 1.413.588T21 5v5Zm-9-5q.425 0 .713-.288T13 4q0-.425-.288-.713T12 3q-.425 0-.713.288T11 4q0 .425.288.713T12 5Z"
                    />
                  </svg>
                  Productos existentes
                </a>
                <a href="#">
                  {' '}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                  >
                    <g fill="none" stroke="currentColor" stroke-width="1.5">
                      <path d="M4.728 16.137c-1.545-1.546-2.318-2.318-2.605-3.321c-.288-1.003-.042-2.068.45-4.197l.283-1.228c.413-1.792.62-2.688 1.233-3.302c.614-.613 1.51-.82 3.302-1.233l1.228-.284c2.13-.491 3.194-.737 4.197-.45c1.003.288 1.775 1.061 3.32 2.606l1.83 1.83C20.657 9.248 22 10.592 22 12.262c0 1.671-1.345 3.015-4.034 5.704C15.277 20.657 13.933 22 12.262 22c-1.67 0-3.015-1.345-5.704-4.034l-1.83-1.83Z" />
                      <path
                        stroke-linecap="round"
                        d="M15.39 15.39c.585-.587.664-1.457.176-1.946c-.488-.488-1.359-.409-1.945.177c-.585.586-1.456.665-1.944.177c-.488-.488-.409-1.359.177-1.944m3.535 3.535l.354.354m-.354-.354c-.4.401-.935.565-1.389.471m-2.5-4.36l.354.354m0 0c.331-.332.753-.5 1.146-.497"
                      />
                      <circle
                        cx="8.607"
                        cy="8.879"
                        r="2"
                        transform="rotate(-45 8.607 8.879)"
                      />
                    </g>
                  </svg>{' '}
                  Producto en oferta
                </a>{' '}
                <a href="#">
                  {' '}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                  >
                    <g fill="none" stroke="currentColor" stroke-width="1.5">
                      <path d="M4.728 16.137c-1.545-1.546-2.318-2.318-2.605-3.321c-.288-1.003-.042-2.068.45-4.197l.283-1.228c.413-1.792.62-2.688 1.233-3.302c.614-.613 1.51-.82 3.302-1.233l1.228-.284c2.13-.491 3.194-.737 4.197-.45c1.003.288 1.775 1.061 3.32 2.606l1.83 1.83C20.657 9.248 22 10.592 22 12.262c0 1.671-1.345 3.015-4.034 5.704C15.277 20.657 13.933 22 12.262 22c-1.67 0-3.015-1.345-5.704-4.034l-1.83-1.83Z" />
                      <path
                        stroke-linecap="round"
                        d="M15.39 15.39c.585-.587.664-1.457.176-1.946c-.488-.488-1.359-.409-1.945.177c-.585.586-1.456.665-1.944.177c-.488-.488-.409-1.359.177-1.944m3.535 3.535l.354.354m-.354-.354c-.4.401-.935.565-1.389.471m-2.5-4.36l.354.354m0 0c.331-.332.753-.5 1.146-.497"
                      />
                      <circle
                        cx="8.607"
                        cy="8.879"
                        r="2"
                        transform="rotate(-45 8.607 8.879)"
                      />
                    </g>
                  </svg>{' '}
                  Gestión de DUI
                </a>{' '}
                <a href="#">
                  {' '}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                  >
                    <g fill="none" stroke="currentColor" stroke-width="1.5">
                      <path d="M4.728 16.137c-1.545-1.546-2.318-2.318-2.605-3.321c-.288-1.003-.042-2.068.45-4.197l.283-1.228c.413-1.792.62-2.688 1.233-3.302c.614-.613 1.51-.82 3.302-1.233l1.228-.284c2.13-.491 3.194-.737 4.197-.45c1.003.288 1.775 1.061 3.32 2.606l1.83 1.83C20.657 9.248 22 10.592 22 12.262c0 1.671-1.345 3.015-4.034 5.704C15.277 20.657 13.933 22 12.262 22c-1.67 0-3.015-1.345-5.704-4.034l-1.83-1.83Z" />
                      <path
                        stroke-linecap="round"
                        d="M15.39 15.39c.585-.587.664-1.457.176-1.946c-.488-.488-1.359-.409-1.945.177c-.585.586-1.456.665-1.944.177c-.488-.488-.409-1.359.177-1.944m3.535 3.535l.354.354m-.354-.354c-.4.401-.935.565-1.389.471m-2.5-4.36l.354.354m0 0c.331-.332.753-.5 1.146-.497"
                      />
                      <circle
                        cx="8.607"
                        cy="8.879"
                        r="2"
                        transform="rotate(-45 8.607 8.879)"
                      />
                    </g>
                  </svg>{' '}
                  Variantes del Producto
                </a>
                <a href="#">
                  {' '}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                  >
                    <g fill="none" stroke="currentColor" stroke-width="1.5">
                      <path d="M4.728 16.137c-1.545-1.546-2.318-2.318-2.605-3.321c-.288-1.003-.042-2.068.45-4.197l.283-1.228c.413-1.792.62-2.688 1.233-3.302c.614-.613 1.51-.82 3.302-1.233l1.228-.284c2.13-.491 3.194-.737 4.197-.45c1.003.288 1.775 1.061 3.32 2.606l1.83 1.83C20.657 9.248 22 10.592 22 12.262c0 1.671-1.345 3.015-4.034 5.704C15.277 20.657 13.933 22 12.262 22c-1.67 0-3.015-1.345-5.704-4.034l-1.83-1.83Z" />
                      <path
                        stroke-linecap="round"
                        d="M15.39 15.39c.585-.587.664-1.457.176-1.946c-.488-.488-1.359-.409-1.945.177c-.585.586-1.456.665-1.944.177c-.488-.488-.409-1.359.177-1.944m3.535 3.535l.354.354m-.354-.354c-.4.401-.935.565-1.389.471m-2.5-4.36l.354.354m0 0c.331-.332.753-.5 1.146-.497"
                      />
                      <circle
                        cx="8.607"
                        cy="8.879"
                        r="2"
                        transform="rotate(-45 8.607 8.879)"
                      />
                    </g>
                  </svg>{' '}
                  Calidad del Producto
                </a>
              </div>
              <div class="content">
                <p>Inventatio </p>
                <a href="#">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    viewBox="0 0 32 32"
                  >
                    <path fill="currentColor" d="M8 18h6v2H8zm0 4h10v2H8z" />
                    <path
                      fill="currentColor"
                      d="M26 4H6a2.002 2.002 0 0 0-2 2v20a2.002 2.002 0 0 0 2 2h20a2.002 2.002 0 0 0 2-2V6a2.002 2.002 0 0 0-2-2Zm-8 2v4h-4V6ZM6 26V6h6v6h8V6h6l.001 20Z"
                    />
                  </svg>{' '}
                  Listado de productos
                </a>
                <a href="/">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="currentColor"
                      d="m15.5 19.925l-4.25-4.25l1.4-1.4l2.85 2.85l5.65-5.65l1.4 1.4l-7.05 7.05ZM21 10h-2V5h-2v3H7V5H5v14h6v2H5q-.825 0-1.413-.588T3 19V5q0-.825.588-1.413T5 3h4.175q.275-.875 1.075-1.438T12 1q1 0 1.788.563T14.85 3H19q.825 0 1.413.588T21 5v5Zm-9-5q.425 0 .713-.288T13 4q0-.425-.288-.713T12 3q-.425 0-.713.288T11 4q0 .425.288.713T12 5Z"
                    />
                  </svg>
                  Inventario
                </a>
                <a href="#">
                  {' '}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                  >
                    <g fill="none" stroke="currentColor" stroke-width="1.5">
                      <path d="M4.728 16.137c-1.545-1.546-2.318-2.318-2.605-3.321c-.288-1.003-.042-2.068.45-4.197l.283-1.228c.413-1.792.62-2.688 1.233-3.302c.614-.613 1.51-.82 3.302-1.233l1.228-.284c2.13-.491 3.194-.737 4.197-.45c1.003.288 1.775 1.061 3.32 2.606l1.83 1.83C20.657 9.248 22 10.592 22 12.262c0 1.671-1.345 3.015-4.034 5.704C15.277 20.657 13.933 22 12.262 22c-1.67 0-3.015-1.345-5.704-4.034l-1.83-1.83Z" />
                      <path
                        stroke-linecap="round"
                        d="M15.39 15.39c.585-.587.664-1.457.176-1.946c-.488-.488-1.359-.409-1.945.177c-.585.586-1.456.665-1.944.177c-.488-.488-.409-1.359.177-1.944m3.535 3.535l.354.354m-.354-.354c-.4.401-.935.565-1.389.471m-2.5-4.36l.354.354m0 0c.331-.332.753-.5 1.146-.497"
                      />
                      <circle
                        cx="8.607"
                        cy="8.879"
                        r="2"
                        transform="rotate(-45 8.607 8.879)"
                      />
                    </g>
                  </svg>{' '}
                  Precios y promociones
                </a>
              </div>{' '}
              <div class="content">
                <p>Seo de productos </p>
                <a href="#">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    viewBox="0 0 32 32"
                  >
                    <path fill="currentColor" d="M8 18h6v2H8zm0 4h10v2H8z" />
                    <path
                      fill="currentColor"
                      d="M26 4H6a2.002 2.002 0 0 0-2 2v20a2.002 2.002 0 0 0 2 2h20a2.002 2.002 0 0 0 2-2V6a2.002 2.002 0 0 0-2-2Zm-8 2v4h-4V6ZM6 26V6h6v6h8V6h6l.001 20Z"
                    />
                  </svg>{' '}
                  Optimización de descripciones
                </a>
                <a href="/">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="currentColor"
                      d="m15.5 19.925l-4.25-4.25l1.4-1.4l2.85 2.85l5.65-5.65l1.4 1.4l-7.05 7.05ZM21 10h-2V5h-2v3H7V5H5v14h6v2H5q-.825 0-1.413-.588T3 19V5q0-.825.588-1.413T5 3h4.175q.275-.875 1.075-1.438T12 1q1 0 1.788.563T14.85 3H19q.825 0 1.413.588T21 5v5Zm-9-5q.425 0 .713-.288T13 4q0-.425-.288-.713T12 3q-.425 0-.713.288T11 4q0 .425.288.713T12 5Z"
                    />
                  </svg>
                  Optimización de títulos
                </a>
                <a href="#">
                  {' '}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                  >
                    <g fill="none" stroke="currentColor" stroke-width="1.5">
                      <path d="M4.728 16.137c-1.545-1.546-2.318-2.318-2.605-3.321c-.288-1.003-.042-2.068.45-4.197l.283-1.228c.413-1.792.62-2.688 1.233-3.302c.614-.613 1.51-.82 3.302-1.233l1.228-.284c2.13-.491 3.194-.737 4.197-.45c1.003.288 1.775 1.061 3.32 2.606l1.83 1.83C20.657 9.248 22 10.592 22 12.262c0 1.671-1.345 3.015-4.034 5.704C15.277 20.657 13.933 22 12.262 22c-1.67 0-3.015-1.345-5.704-4.034l-1.83-1.83Z" />
                      <path
                        stroke-linecap="round"
                        d="M15.39 15.39c.585-.587.664-1.457.176-1.946c-.488-.488-1.359-.409-1.945.177c-.585.586-1.456.665-1.944.177c-.488-.488-.409-1.359.177-1.944m3.535 3.535l.354.354m-.354-.354c-.4.401-.935.565-1.389.471m-2.5-4.36l.354.354m0 0c.331-.332.753-.5 1.146-.497"
                      />
                      <circle
                        cx="8.607"
                        cy="8.879"
                        r="2"
                        transform="rotate(-45 8.607 8.879)"
                      />
                    </g>
                  </svg>{' '}
                  Descripción y Detalles del Producto
                </a>{' '}
              </div>{' '}
              <div class="content">
                <p>Análisis de Ventas</p>
                <a href="#">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    viewBox="0 0 32 32"
                  >
                    <path fill="currentColor" d="M8 18h6v2H8zm0 4h10v2H8z" />
                    <path
                      fill="currentColor"
                      d="M26 4H6a2.002 2.002 0 0 0-2 2v20a2.002 2.002 0 0 0 2 2h20a2.002 2.002 0 0 0 2-2V6a2.002 2.002 0 0 0-2-2Zm-8 2v4h-4V6ZM6 26V6h6v6h8V6h6l.001 20Z"
                    />
                  </svg>{' '}
                  Análisis de Ventas por Producto
                </a>
                <a href="/">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="currentColor"
                      d="m15.5 19.925l-4.25-4.25l1.4-1.4l2.85 2.85l5.65-5.65l1.4 1.4l-7.05 7.05ZM21 10h-2V5h-2v3H7V5H5v14h6v2H5q-.825 0-1.413-.588T3 19V5q0-.825.588-1.413T5 3h4.175q.275-.875 1.075-1.438T12 1q1 0 1.788.563T14.85 3H19q.825 0 1.413.588T21 5v5Zm-9-5q.425 0 .713-.288T13 4q0-.425-.288-.713T12 3q-.425 0-.713.288T11 4q0 .425.288.713T12 5Z"
                    />
                  </svg>
                  Análisis de Ventas por Categoría
                </a>
                <a href="#">
                  {' '}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                  >
                    <g fill="none" stroke="currentColor" stroke-width="1.5">
                      <path d="M4.728 16.137c-1.545-1.546-2.318-2.318-2.605-3.321c-.288-1.003-.042-2.068.45-4.197l.283-1.228c.413-1.792.62-2.688 1.233-3.302c.614-.613 1.51-.82 3.302-1.233l1.228-.284c2.13-.491 3.194-.737 4.197-.45c1.003.288 1.775 1.061 3.32 2.606l1.83 1.83C20.657 9.248 22 10.592 22 12.262c0 1.671-1.345 3.015-4.034 5.704C15.277 20.657 13.933 22 12.262 22c-1.67 0-3.015-1.345-5.704-4.034l-1.83-1.83Z" />
                      <path
                        stroke-linecap="round"
                        d="M15.39 15.39c.585-.587.664-1.457.176-1.946c-.488-.488-1.359-.409-1.945.177c-.585.586-1.456.665-1.944.177c-.488-.488-.409-1.359.177-1.944m3.535 3.535l.354.354m-.354-.354c-.4.401-.935.565-1.389.471m-2.5-4.36l.354.354m0 0c.331-.332.753-.5 1.146-.497"
                      />
                      <circle
                        cx="8.607"
                        cy="8.879"
                        r="2"
                        transform="rotate(-45 8.607 8.879)"
                      />
                    </g>
                  </svg>{' '}
                  Predicción de Ventas
                </a>
                <a href="#">
                  {' '}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                  >
                    <g fill="none" stroke="currentColor" stroke-width="1.5">
                      <path d="M4.728 16.137c-1.545-1.546-2.318-2.318-2.605-3.321c-.288-1.003-.042-2.068.45-4.197l.283-1.228c.413-1.792.62-2.688 1.233-3.302c.614-.613 1.51-.82 3.302-1.233l1.228-.284c2.13-.491 3.194-.737 4.197-.45c1.003.288 1.775 1.061 3.32 2.606l1.83 1.83C20.657 9.248 22 10.592 22 12.262c0 1.671-1.345 3.015-4.034 5.704C15.277 20.657 13.933 22 12.262 22c-1.67 0-3.015-1.345-5.704-4.034l-1.83-1.83Z" />
                      <path
                        stroke-linecap="round"
                        d="M15.39 15.39c.585-.587.664-1.457.176-1.946c-.488-.488-1.359-.409-1.945.177c-.585.586-1.456.665-1.944.177c-.488-.488-.409-1.359.177-1.944m3.535 3.535l.354.354m-.354-.354c-.4.401-.935.565-1.389.471m-2.5-4.36l.354.354m0 0c.331-.332.753-.5 1.146-.497"
                      />
                      <circle
                        cx="8.607"
                        cy="8.879"
                        r="2"
                        transform="rotate(-45 8.607 8.879)"
                      />
                    </g>
                  </svg>{' '}
                  Rentabilidad por Producto/Categoría
                </a>
              </div>
            </div>
          </li>
          <li class="tabs-nav">
            <span>
              Administración de cuenta <DouveryArrowDown size={20} />
            </span>
            <div class="tab-content">
              Información sobre administración de cuenta
            </div>
          </li>
          <li class="tabs-nav">
            <span>
              Soporte <DouveryArrowDown size={20} />
            </span>
            <div class="tab-content">Información sobre soporte</div>
          </li>
          <li class="tabs-nav">
            <span>
              Preguntas frecuentes <DouveryArrowDown size={20} />
            </span>
            <div class="tab-content">
              Información sobre preguntas frecuentes
            </div>
          </li>
        </ul>

        <div class="nav-search-user-login">
          <div class="inputs">
            {isSearchOpen.setIsSearchOpen && (
              <input
                type="text"
                placeholder="Search..."
                class={`search-input ${
                  isSearchOpen.setIsSearchOpen ? 'open' : ''
                }`}
              />
            )}

            <div class="order-notification-container">
              <div class="order-notification-badge">0</div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
              >
                <path
                  fill="none"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="1.5"
                  d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664c0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75a2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15a2.25 2.25 0 0 1 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z"
                />
              </svg>
            </div>
          </div>

          <div class="user-info">
            <img
              width={50}
              height={20}
              src={avatarSrc}
              alt="user avatar in Douvery Stores"
            />
            <div class="info" onClick$={handleMenuToggle}>
              <span class="user-name">{user?.name}</span>
              <span class="user-company">{store?.name} </span>
              <span class="user-company">( Admin )</span>
            </div>
            <DouveryArrowDown size={20} />
            {dropdownMenu}
          </div>
        </div>
      </nav>
    </>
  );
});
