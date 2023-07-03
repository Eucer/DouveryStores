import { component$, useStylesScoped$ } from '@builder.io/qwik';
import styles from './button-1.css?inline';
import { useNavigate } from '@builder.io/qwik-city';
export const Button1 = component$(({ title, navigate }: any) => {
  useStylesScoped$(styles);
  const nav = useNavigate();
  return (
    <>
      {' '}
      <button class={'button-1'} onClick$={() => nav(navigate)}>
        <span class="button-text">{title}</span>
      </button>
    </>
  );
});
