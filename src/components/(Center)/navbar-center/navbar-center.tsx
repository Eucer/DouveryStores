import { $, component$, useStore, useStylesScoped$ } from '@builder.io/qwik';

import styles from './navbar-center.css?inline';
import { useGetCurrentStore, useGetCurrentUser } from '~/routes/layout';
import { DouveryArrowDown } from '~/components/icons/arrow-down';
export const NavBarCenter = component$(() => {
  useStylesScoped$(styles);
  const user = useGetCurrentUser().value;
  const store = useGetCurrentStore().value;
  const isSearchOpen = useStore({ setIsSearchOpen: false });
  const handleSearchClick = $(() => {
    isSearchOpen.setIsSearchOpen = !isSearchOpen.setIsSearchOpen;
  });
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

        <ul class={`nav-links `}>
          <li class={`tabs-nav`}>
            <a href="/gestion-productos">
              Gestión de productos <DouveryArrowDown size={20} />
            </a>
          </li>
          <li class={`tabs-nav`}>
            <a href="/administracion-cuenta">
              Administración de cuenta <DouveryArrowDown size={20} />
            </a>
          </li>
          <li class={`tabs-nav`}>
            <a href="/soporte">
              Soporte <DouveryArrowDown size={20} />
            </a>
          </li>
          <li class={`tabs-nav`}>
            <a href="/faq">
              Preguntas frecuentes <DouveryArrowDown size={20} />
            </a>
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

            <svg
              onClick$={handleSearchClick}
              xmlns="http://www.w3.org/2000/svg"
              width="25"
              height="25"
              viewBox="0 0 24 24"
            >
              <path
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1.5"
                d="m21 21l-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
              />
            </svg>

            <div class="order-notification-container">
              <div class="order-notification-badge">0</div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="25"
                height="25"
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

            <div class="notification-container">
              <div class="notification-badge">0</div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="25"
                height="25"
                viewBox="0 0 24 24"
              >
                <path
                  fill="none"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="1.5"
                  d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0M3.124 7.5A8.969 8.969 0 0 1 5.292 3m13.416 0a8.969 8.969 0 0 1 2.168 4.5"
                />
              </svg>
            </div>
          </div>

          <div class="user-info">
            <img
              width={50}
              height={20}
              src={
                user?.avatar ||
                'https://res.cloudinary.com/douvery/image/upload/v1686355888/vnzd3ccdmwigt2z7ihb2.png'
              }
              alt="user avatar in Douvery Stores"
            />
            <div class="info">
              <span class="user-name">{user?.name}</span>
              <span class="user-company">{store?.name} </span>
              <span class="user-company">( Admin )</span>
            </div>
            <DouveryArrowDown size={20} />
          </div>
        </div>
      </nav>
    </>
  );
});
