import { component$, useStylesScoped$ } from '@builder.io/qwik';
import styles from './benefits.css?inline';
import { DouveryDocSearhAni } from '~/components/icons/icon-doc-search';
import { DouveryRatingBrandAni } from '~/components/icons/icon-reting-brand';
import { DouveryDBoxCheckAni } from '~/components/icons/icon-box-check';
import { DouveryDocCheckAni } from '~/components/icons/icon-doc-checl';
export const BenefitsINDEX = component$(() => {
  useStylesScoped$(styles);
  return (
    <div class="benefits">
      <div class="title">
        <h1>Te ofrecemos:</h1>

        <div class="container__video">
          <video
            src="https://res.cloudinary.com/douvery/video/upload/v1685706994/uijjsbjtbsoqqg7hiksg.mp4"
            autoPlay
            muted
          />
        </div>
        <a class="show-more" href="">Ver mas beneficios</a>
      </div>
      <ul>
        <li>
          <div class="icon">
            <DouveryDocSearhAni />
          </div>

          <div class="content">
            <h3>Mayor Visibilidad</h3>
            <p>
              En Douvery Stores, tu producto tiene el potencial de ser
              descubierto por un público en crecimiento. Únete hoy y crece con
              nosotros.
            </p>
          </div>
        </li>
        <li>
          <div class="icon">
            <DouveryRatingBrandAni />
          </div>
          <div class="content">
            <h3>Acceso a Clientes Diversos</h3>
            <p>
              Nuestra plataforma atrae a clientes de diferentes ubicaciones,
              edades e intereses. Hay un lugar para tu tienda en Douvery, sin
              importar lo que vendas.
            </p>
          </div>
        </li>
        <li>
          <div class="icon">
            <DouveryDBoxCheckAni />
          </div>
          <div class="content">
            <h3>Herramientas Intuitivas de Gestión de Productos</h3>
            <p>
              Nuestro sistema de gestión de productos facilita la adición y
              administración de tus productos. Vende con facilidad en Douvery.
            </p>
          </div>
        </li>
        <li>
          <div class="icon">
            <DouveryDocCheckAni />
          </div>
          <div class="content">
            <h3>Soporte al Vendedor</h3>
            <p>
              Nuestro equipo de soporte está disponible para responder a tus
              preguntas y proporcionarte la ayuda que necesites. Estamos aquí
              para ayudarte a tener éxito.
            </p>
          </div>
        </li>
      </ul>
    </div>
  );
});
