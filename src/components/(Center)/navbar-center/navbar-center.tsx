import { $, component$, useStore, useStylesScoped$ } from '@builder.io/qwik';

import styles from './navbar-center.css?inline';
import { useGetCurrentUser } from '~/routes/layout';
import { DouveryArrowDown } from '~/components/icons/arrow-down';
import { DropdownMenuCenter } from './dropdownMenu/dropdown-menu';
export const NavBarCenter = component$(() => {
  useStylesScoped$(styles);
  const user = useGetCurrentUser().value;

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
            <svg
              width="30"
              height="30"
              viewBox="0 0 201 213"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clip-path="url(#clip0_16_2)">
                <mask
                  id="mask0_16_2"
                  style="mask-type:luminance"
                  maskUnits="userSpaceOnUse"
                  x="0"
                  y="0"
                  width="201"
                  height="213"
                >
                  <path
                    d="M154.615 0H46.3846C20.7671 0 0 22.4384 0 50.1176V162.882C0 190.562 20.7671 213 46.3846 213H154.615C180.233 213 201 190.562 201 162.882V50.1176C201 22.4384 180.233 0 154.615 0Z"
                    fill="white"
                  />
                </mask>
                <g mask="url(#mask0_16_2)">
                  <path
                    d="M-34.7885 -4.47482V217.475C-34.7885 243.837 -17.8456 265.206 3.05448 265.206H197.946C218.846 265.206 235.788 243.837 235.788 217.475V-4.47482C235.788 -30.8359 218.846 -52.2059 197.946 -52.2059H3.05448C-17.8456 -52.2059 -34.7885 -30.8359 -34.7885 -4.47482Z"
                    fill="#212A3E"
                  />
                  <path
                    d="M44.4519 110.988L44.4519 56.3823"
                    stroke="#0567FF"
                    stroke-width="13"
                    stroke-miterlimit="10"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M44.4519 152.505V108.588"
                    stroke="#00C9C9"
                    stroke-width="13"
                    stroke-miterlimit="10"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <mask
                    id="mask1_16_2"
                    style="mask-type:luminance"
                    maskUnits="userSpaceOnUse"
                    x="62"
                    y="45"
                    width="109"
                    height="121"
                  >
                    <path
                      d="M170.731 45.8326H62.9974V165.564H170.731V45.8326Z"
                      fill="white"
                    />
                  </mask>
                  <g mask="url(#mask1_16_2)">
                    <path
                      d="M61.8461 165.673V45.9412H108.404C118.42 45.9412 127.244 47.5195 134.824 50.6491C142.457 53.8057 148.845 58.0855 153.988 63.489C159.104 68.9191 162.975 75.2587 165.574 82.5348C168.227 89.7571 169.58 97.4611 169.58 105.647C169.58 114.795 168.091 123.034 165.141 130.363C162.244 137.719 158.13 144.032 152.797 149.302C147.438 154.518 141.022 158.557 133.524 161.393C125.999 164.255 117.635 165.673 108.404 165.673H61.8461ZM135.798 105.647C135.798 101.019 135.149 96.8191 133.849 93.0206C132.604 89.1687 130.817 85.9319 128.435 83.2838C126.107 80.5821 123.265 78.4688 119.882 76.9709C116.471 75.4193 112.654 74.6168 108.404 74.6168H95.0867V136.997H108.404C112.735 136.997 116.579 136.221 119.99 134.643C123.455 133.092 126.324 130.898 128.652 128.116C130.953 125.281 132.712 121.964 133.957 118.165C135.176 114.313 135.798 110.14 135.798 105.647Z"
                      fill="white"
                    />
                  </g>
                </g>
              </g>
              <defs>
                <clipPath id="clip0_16_2">
                  <rect width="201" height="213" fill="white" />
                </clipPath>
              </defs>
            </svg>

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
                <p>Creación y Configuración de Productos </p>
                <a href="/center/products/new/generate-product">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="currentColor"
                      d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm4 18H6V4h7v5h5v11zM8 15.01l1.41 1.41L11 14.84V19h2v-4.16l1.59 1.59L16 15.01L12.01 11L8 15.01z"
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
                  Variantes del Producto
                </a>{' '}
                <a href="#">
                  {' '}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 48 48"
                  >
                    <mask id="ipSFileQualityOne0">
                      <g
                        fill="none"
                        stroke="#fff"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="4"
                      >
                        <path d="M40 23v-9L31 4H10a2 2 0 0 0-2 2v36a2 2 0 0 0 2 2h12" />
                        <path
                          fill="#fff"
                          d="M28.2 30h9.6l3.2 4.118L33 44l-8-9.882L28.2 30Z"
                        />
                        <path d="M30 4v10h10" />
                      </g>
                    </mask>
                    <path
                      fill="currentColor"
                      d="M0 0h48v48H0z"
                      mask="url(#ipSFileQualityOne0)"
                    />
                  </svg>{' '}
                  Calidad del Producto
                </a>{' '}
                <a href="#">
                  {' '}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="currentColor"
                      d="M8 18h8v-2H8v2Zm0-4h8v-2H8v2Zm-2 8q-.825 0-1.413-.588T4 20V4q0-.825.588-1.413T6 2h8l6 6v12q0 .825-.588 1.413T18 22H6Zm7-13V4H6v16h12V9h-5ZM6 4v5v-5v16V4Z"
                    />
                  </svg>{' '}
                  Descripción y Detalles del Producto
                </a>
              </div>
              <div class="content">
                <p>Análisis y Mejora de Productos</p>
                <a href="#">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 14 14"
                  >
                    <g
                      fill="none"
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <rect
                        width="13"
                        height="13"
                        x=".5"
                        y=".5"
                        rx="1"
                        transform="rotate(180 7 7)"
                      />
                      <path d="M3 3h2M3 5.5h4.5m4 0l-3 5l-3.5-2l-2 3" />
                    </g>
                  </svg>{' '}
                  Análisis de Ventas
                </a>
                <a href="/">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 48 48"
                  >
                    <mask id="ipTAnalysis0">
                      <g fill="none" stroke="#fff" stroke-width="4">
                        <path
                          fill="#555"
                          stroke-linejoin="round"
                          d="M44 5H4v12h40V5Z"
                        />
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="m4 41.03l12.176-12.3l6.579 6.3L30.798 27l4.48 4.368"
                        />
                        <path
                          stroke-linecap="round"
                          d="M44 16.172v26m-40-26v14M13.015 43H44M17 11h21m-28-.003h1"
                        />
                      </g>
                    </mask>
                    <path
                      fill="currentColor"
                      d="M0 0h48v48H0z"
                      mask="url(#ipTAnalysis0)"
                    />
                  </svg>
                  Análisis de Ventas por Producto
                </a>
                <a href="#">
                  {' '}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 14 14"
                  >
                    <path
                      fill="none"
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M.5 13.5h13m-9 0V.5h-4v13m8 0v-7h-4v7m8 0v-10h-4v10"
                    />
                  </svg>{' '}
                  Análisis de Ventas por Categoría
                </a>
                <a href="#">
                  {' '}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 1024 1024"
                  >
                    <path
                      fill="currentColor"
                      d="m665.216 768l110.848 192h-73.856L591.36 768H433.024L322.176 960H248.32l110.848-192H160a32 32 0 0 1-32-32V192H64a32 32 0 0 1 0-64h896a32 32 0 1 1 0 64h-64v544a32 32 0 0 1-32 32H665.216zM832 192H192v512h640V192zM352 448a32 32 0 0 1 32 32v64a32 32 0 0 1-64 0v-64a32 32 0 0 1 32-32zm160-64a32 32 0 0 1 32 32v128a32 32 0 0 1-64 0V416a32 32 0 0 1 32-32zm160-64a32 32 0 0 1 32 32v192a32 32 0 1 1-64 0V352a32 32 0 0 1 32-32z"
                    />
                  </svg>{' '}
                  Predicción de Ventas
                </a>
                <a href="#">
                  {' '}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 14 14"
                  >
                    <g
                      fill="none"
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <circle cx="7" cy="7" r="6.5" />
                      <path d="M7 .5V7l4.6 4.6" />
                    </g>
                  </svg>{' '}
                  Rentabilidad por Producto/Categoría
                </a>
              </div>
              <div class="content">
                <p>Gestión de Inventario </p>
                <a href="/center/inventory/">
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
                  Inventario
                </a>
                {/* <a href="/">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                  >
                    <g fill="none" stroke="currentColor" stroke-width="1.5">
                      <path d="M16 4.002c2.175.012 3.353.109 4.121.877C21 5.758 21 7.172 21 10v6c0 2.829 0 4.243-.879 5.122C19.243 22 17.828 22 15 22H9c-2.828 0-4.243 0-5.121-.878C3 20.242 3 18.829 3 16v-6c0-2.828 0-4.242.879-5.121c.768-.768 1.946-.865 4.121-.877" />
                      <path
                        stroke-linecap="round"
                        d="M10.5 14H17M7 14h.5M7 10.5h.5m-.5 7h.5m3-7H17m-6.5 7H17"
                      />
                      <path d="M8 3.5A1.5 1.5 0 0 1 9.5 2h5A1.5 1.5 0 0 1 16 3.5v1A1.5 1.5 0 0 1 14.5 6h-5A1.5 1.5 0 0 1 8 4.5v-1Z" />
                    </g>
                  </svg>
                  Listado de productos
                </a> */}
                <a href="#">
                  {' '}
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 19 11"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M3.85227 10H0.758523V1.27273H3.87784C4.75568 1.27273 5.51136 1.44744 6.14489 1.79688C6.77841 2.14347 7.26563 2.64205 7.60653 3.29261C7.95028 3.94318 8.12216 4.72159 8.12216 5.62784C8.12216 6.53693 7.95028 7.31818 7.60653 7.97159C7.26563 8.625 6.77557 9.12642 6.13636 9.47585C5.5 9.82528 4.73864 10 3.85227 10ZM2.60369 8.41903H3.77557C4.32102 8.41903 4.77983 8.32244 5.15199 8.12926C5.52699 7.93324 5.80824 7.63068 5.99574 7.22159C6.18608 6.80966 6.28125 6.27841 6.28125 5.62784C6.28125 4.98295 6.18608 4.45597 5.99574 4.04688C5.80824 3.63778 5.52841 3.33665 5.15625 3.14347C4.78409 2.95028 4.32528 2.85369 3.77983 2.85369H2.60369V8.41903ZM13.6523 7.21307V3.45455H15.4677V10H13.7248V8.81108H13.6566C13.5089 9.1946 13.2631 9.50284 12.9194 9.7358C12.5785 9.96875 12.1623 10.0852 11.6708 10.0852C11.2333 10.0852 10.8484 9.9858 10.516 9.78693C10.1836 9.58807 9.92365 9.3054 9.73615 8.93892C9.55149 8.57244 9.45774 8.13352 9.4549 7.62216V3.45455H11.2702V7.2983C11.2731 7.68466 11.3768 7.99006 11.5813 8.21449C11.7859 8.43892 12.06 8.55114 12.4038 8.55114C12.6225 8.55114 12.8271 8.50142 13.0174 8.40199C13.2077 8.29972 13.3612 8.14915 13.4776 7.95028C13.5969 7.75142 13.6552 7.50568 13.6523 7.21307ZM16.9197 10V3.45455H18.7351V10H16.9197ZM17.8317 2.6108C17.5618 2.6108 17.3303 2.52131 17.1371 2.34233C16.9467 2.16051 16.8516 1.94318 16.8516 1.69034C16.8516 1.44034 16.9467 1.22585 17.1371 1.04688C17.3303 0.865057 17.5618 0.774147 17.8317 0.774147C18.1016 0.774147 18.3317 0.865057 18.522 1.04688C18.7152 1.22585 18.8118 1.44034 18.8118 1.69034C18.8118 1.94318 18.7152 2.16051 18.522 2.34233C18.3317 2.52131 18.1016 2.6108 17.8317 2.6108Z"
                      fill="currentColor"
                    />
                  </svg>{' '}
                  Gestión de DUI
                </a>
              </div>{' '}
              <div class="content">
                <p>Marketing y Promoción</p>
                <a href="#">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="currentColor"
                      d="m21.41 11.58l-9-9C12.05 2.22 11.55 2 11 2H4c-1.1 0-2 .9-2 2v7c0 .55.22 1.05.59 1.42l9 9c.36.36.86.58 1.41.58s1.05-.22 1.41-.59l7-7c.37-.36.59-.86.59-1.41s-.23-1.06-.59-1.42zM13 20.01L4 11V4h7v-.01l9 9l-7 7.02z"
                    />
                    <circle cx="6.5" cy="6.5" r="1.5" fill="currentColor" />
                  </svg>{' '}
                  Producto en oferta
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
                      d="M8 17h2v-1h1q.425 0 .713-.288T12 15v-3q0-.425-.288-.713T11 11H8v-1h4V8h-2V7H8v1H7q-.425 0-.713.288T6 9v3q0 .425.288.713T7 13h3v1H6v2h2v1Zm8-.75l2-2h-4l2 2ZM14 10h4l-2-2l-2 2ZM4 20q-.825 0-1.413-.588T2 18V6q0-.825.588-1.413T4 4h16q.825 0 1.413.588T22 6v12q0 .825-.588 1.413T20 20H4Zm0-2h16V6H4v12Zm0 0V6v12Z"
                    />
                  </svg>
                  Precios y promociones
                </a>
                <a href="#">
                  {' '}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 48 48"
                  >
                    <g fill="none" stroke="currentColor" stroke-width="4">
                      <rect width="40" height="32" x="4" y="8" rx="1.633" />
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M16 18.948c-2-2.948-5.502-1.01-5.251 2.02C11 24 15 24 15.249 27.032C15.5 30.062 12 32 10 29.051M26 18h-4v13h4m-4-6h4"
                      />
                      <rect
                        width="6"
                        height="13"
                        x="32"
                        y="18"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        rx="3"
                      />
                    </g>
                  </svg>{' '}
                  SEO de producto
                </a>{' '}
              </div>{' '}
            </div>{' '}
          </li>
          <li class="tabs-nav">
            <span>
              Administración de {user?.name} <DouveryArrowDown size={20} />
            </span>
            <div class="tab-content">
              <div class="content">
                <p>Creación y Configuración de Productos </p>
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
                  Variantes del Producto
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
                  Calidad del Producto
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
                  Descripción y Detalles del Producto
                </a>
              </div>
              <div class="content">
                <p>Análisis y Mejora de Productos</p>
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
                  Análisis de Ventas
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
                  Análisis de Ventas por Producto
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
              Soporte <DouveryArrowDown size={20} />
            </span>
            <div class="tab-content">
              {' '}
              <div class="content">
                <p>Creación y Configuración de Productos </p>
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
                  Variantes del Producto
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
                  Calidad del Producto
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
                  Descripción y Detalles del Producto
                </a>
              </div>
              <div class="content">
                <p>Análisis y Mejora de Productos</p>
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
                  Análisis de Ventas
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
                  Análisis de Ventas por Producto
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
                class={`search-input ${isSearchOpen.setIsSearchOpen ? 'open' : ''
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
              <span class="user-company">{user?.name} </span>
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
