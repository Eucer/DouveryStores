import { component$, useStylesScoped$ } from '@builder.io/qwik';
import styles from './terms-Conditions.css?inline';
export const TermsConditions = component$(() => {
  useStylesScoped$(styles);
  return (
    <div class="terms-and-conditions">
      {' '}
      <p>
        Al continuar, aceptas nuestros <a href="#">Términos y condiciones</a>.
      </p>
    </div>
  );
});
