import { component$, useStylesScoped$ } from '@builder.io/qwik';
import { BreadcrumbsSTL1 } from '~/components/breadcrumb/style1_breadcrumb/BreadcrumbsSTL1';
import style from './header_info.css?inline';
export const Header_info = component$(({ title }: any) => {
  useStylesScoped$(style);
  return (
    <div class="title_and_infos">
      <div class="title">
        <BreadcrumbsSTL1 />
        <div class="product_new__title">{title}</div>
      </div>
    </div>
  );
});
