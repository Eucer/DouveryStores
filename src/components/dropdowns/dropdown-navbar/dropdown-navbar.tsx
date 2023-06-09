import { component$, useStore, useStylesScoped$ } from '@builder.io/qwik';
import styles from './dropdown-navbar.css?inline';
import { useLocation } from '@builder.io/qwik-city';
import { TextCL } from '~/components/textCL/textCL';

export const ProfileDropdownNavBar = component$(({ user, store }: any) => {
  useStylesScoped$(styles);
  const isOpen = useStore({ setIsOpen: false });
  const loc = useLocation();
  store;
  return (
    <div>
      {' '}
      {isOpen.setIsOpen && (
        <div
          class="shad-modal"
          onClick$={() => (isOpen.setIsOpen = false)}
        ></div>
      )}
      <div>
        <div class="ctr-session-none">
          {' '}
          <button
            class="trl-drs"
            onClick$={() => (isOpen.setIsOpen = !isOpen.setIsOpen)}
          >
            <p class="ttle-draw">
              <strong class="text-hello"> Hello,</strong>{' '}
              <strong>
                {' '}
                <TextCL text={user.name} /> (<TextCL text={store.name} />)
              </strong>
            </p>
          </button>
        </div>{' '}
        <div class="crt-drpd">
          <ul class={`dropdown-menu ${isOpen.setIsOpen ? 'show' : ''}`}>
            <div class="dropdown-divider"></div>
            <a
              class="dropdown-item"
              href={'/auth/logout?rr=' + loc.url.pathname + loc.url.search}
            >
              Cerrar sesión
            </a>
          </ul>
        </div>
      </div>
    </div>
  );
});
