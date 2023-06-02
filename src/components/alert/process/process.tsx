import { component$, useStylesScoped$ } from '@builder.io/qwik';

import styles from './process.css?inline';
import { DouveryInfo } from '~/components/icons/info';
export const AlertProcesProyect = component$(() => {
  useStylesScoped$(styles);
  return (
    <div class="alert-procss">
      <DouveryInfo />
      <strong>Nota importante:</strong> Por favor tenga en cuenta que este
      proyecto se encuentra en desarrollo y los productos aquí presentados no
      son oficiales. Solo estamos utilizando esta información con fines de
      aprendizaje y comprensión.
    </div>
  );
});
