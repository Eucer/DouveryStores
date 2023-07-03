import { component$, useStylesScoped$ } from '@builder.io/qwik';
import style from './index.css?inline';
export default component$(() => {
  useStylesScoped$(style);
  return (
    <div class="success-container">
      <h1>¡Tu solicitud ha sido recibida con éxito!</h1>
      <p>
        Agradecemos tu interés en nuestro producto. Pronto nos pondremos en
        contacto contigo con más información.
      </p>
      <br />
      <button>Ver inventario</button>
    </div>
  );
});
