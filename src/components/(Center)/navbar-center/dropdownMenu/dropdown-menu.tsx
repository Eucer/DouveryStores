import { component$, useStylesScoped$ } from '@builder.io/qwik';
import { useGetCurrentStore, useGetCurrentUser } from '~/routes/layout';
import styles from './dropdown-menu.css?inline';
export const DropdownMenuCenter = component$(() => {
  useStylesScoped$(styles);
  const user = useGetCurrentUser().value;
  const store = useGetCurrentStore().value;
  const avatarSrc =
    user?.avatar ||
    'https://res.cloudinary.com/douvery/image/upload/v1686355888/vnzd3ccdmwigt2z7ihb2.png';

  return (
    <div class="dropdown-menu">
      <div class="dropdown-arrow"></div>
      <img
        width={60}
        height={40}
        src={avatarSrc}
        alt="user avatar in Douvery Stores"
      />

      <div class="dropdown-menu-info">
        <span class="user-name">{user?.name}</span>{' '}
        <span class="user-company">Administrator in </span>
        <span class="user-company">{store?.name} </span>
      </div>
      <div class="separator" />
      <p> {store?.name} </p>
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
        Products
      </a>
      <a href="#">
        {' '}
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
        </svg>{' '}
        Orders
      </a>
      <a href="#">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 32 32"
        >
          <path
            fill="currentColor"
            d="m29.482 8.624l-10-5.5a1 1 0 0 0-.964 0l-10 5.5a1 1 0 0 0 0 1.752L18 15.591V26.31l-3.036-1.67L14 26.391l4.518 2.485a.998.998 0 0 0 .964 0l10-5.5A1 1 0 0 0 30 22.5v-13a1 1 0 0 0-.518-.876ZM19 5.142L26.925 9.5L19 13.858L11.075 9.5Zm9 16.767l-8 4.4V15.59l8-4.4Z"
          />
          <path
            fill="currentColor"
            d="M10 16H2v-2h8zm2 8H4v-2h8zm2-4H6v-2h8z"
          />
        </svg>{' '}
        Shipping
      </a>
      <a href="#">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 32 32"
        >
          <path
            fill="currentColor"
            d="M8 28v-6.17l2.59 2.58L12 23l-5-5l-5 5l1.41 1.41L6 21.83V28c0 1.103.897 2 2 2h9v-2H8zm17-11c-2.85 0-5 1.29-5 3v7c0 1.71 2.15 3 5 3s5-1.29 5-3v-7c0-1.71-2.15-3-5-3zm0 2c1.936 0 3 .751 3 1s-1.064 1-3 1s-3-.751-3-1s1.064-1 3-1zm0 9c-1.936 0-3-.751-3-1v-4.58c.826.363 1.85.58 3 .58s2.174-.217 3-.58V27c0 .249-1.064 1-3 1zm3.59-20.41L26 10.17V4c0-1.103-.897-2-2-2h-9v2h9v6.17l-2.59-2.58L20 9l5 5l5-5l-1.41-1.41zM7 15c2.85 0 5-1.29 5-3V5c0-1.71-2.15-3-5-3S2 3.29 2 5v7c0 1.71 2.15 3 5 3zM7 4c1.936 0 3 .751 3 1S8.936 6 7 6s-3-.751-3-1s1.064-1 3-1zM4 7.42c.826.363 1.85.58 3 .58s2.174-.217 3-.58V12c0 .249-1.064 1-3 1s-3-.751-3-1V7.42z"
          />
        </svg>
        Returns
      </a>
      <div class="separator"></div>
      <p>Account</p>
      <a href="#">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="feather feather-help-circle"
        >
          <circle cx="12" cy="12" r="10"></circle>
          <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
          <line x1="12" y1="17" x2="12.01" y2="17"></line>
        </svg>{' '}
        Help Center
      </a>
      <a href="#">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="feather feather-settings"
        >
          <circle cx="12" cy="12" r="3"></circle>
          <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
        </svg>{' '}
        Account Settings
      </a>
      <a href="/auth/logout/?rr=/">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="feather feather-log-out"
        >
          <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
          <polyline points="16 17 21 12 16 7"></polyline>
          <line x1="21" y1="12" x2="9" y2="12"></line>
        </svg>
        Sign Out
      </a>
    </div>
  );
});
