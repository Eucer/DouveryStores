import { component$ } from '@builder.io/qwik';
export const BreadcrumbItem = component$(({ to, children }: any) => {
  return (
    <li>
      <a href={to}>{children}</a>
    </li>
  );
});

export const Style1_breadcrumb = component$(({ children }: any) => {
  return (
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb">{children}</ol>
    </nav>
  );
});
