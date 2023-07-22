import { component$, useStylesScoped$ } from '@builder.io/qwik';
import styles from './button-1-icon.css?inline';
import { useNavigate } from '@builder.io/qwik-city';
export const Button1Icon = component$(({ title, icon, navigate }: any) => {
  useStylesScoped$(styles);
  const nav = useNavigate();
  return (
    <>
      {' '}
      <button class={'button-1'} onClick$={() => nav(navigate)}>
        <span class="button-icon">{icon}</span>
        <span class="button-text">{title}</span>
      </button>
    </>
  );
});
