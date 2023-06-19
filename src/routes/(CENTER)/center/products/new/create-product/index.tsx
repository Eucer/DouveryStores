import { component$ } from '@builder.io/qwik';
import {
  BreadcrumbItem,
  Style1_breadcrumb,
} from '~/components/breadcrumb/style1_breadcrumb/style1_breadcrumb';

export default component$(() => {
  return (
    <div>
      <Style1_breadcrumb>
        <BreadcrumbItem to="/">Inicio</BreadcrumbItem>
        <BreadcrumbItem to="/section">Sección</BreadcrumbItem>
        <BreadcrumbItem to="/section/subsection">Subsección</BreadcrumbItem>
      </Style1_breadcrumb>
    </div>
  );
});
