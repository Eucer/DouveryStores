import { component$, useStylesScoped$ } from '@builder.io/qwik';
import style from './how-it-works.css?inline';
export const HowItWorksIndex = component$(() => {
  useStylesScoped$(style);
  return (
    <div class="how-it-works">
      <h1>Empieza a vender</h1>

      <div class="timeline">
        <div class="container left">
          <div class="content">
            <h2>1 - Unirse a Douvery Shops</h2>
            <p>
              Regístrate para obtener una cuenta de vendedor en nuestra
              plataforma.
            </p>
          </div>
        </div>
        <div class="container right">
          <div class="content">
            <h2>2 - Lista tus productos</h2>
            <p>
              Utiliza nuestras herramientas intuitivas para agregar y
              administrar tus productos.
            </p>
          </div>
        </div>
        <div class="container left">
          <div class="content">
            <h2>3 - Realiza ventas</h2>
            <p>
              Aprovecha nuestra creciente base de clientes para vender tus
              productos y crecer tu negocio.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
});
