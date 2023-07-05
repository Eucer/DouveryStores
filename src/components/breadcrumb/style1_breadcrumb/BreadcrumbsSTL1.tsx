import { component$, useStylesScoped$ } from '@builder.io/qwik';
import style from './BreadcrumbsSTL1.css?inline';
import { useLocation } from '@builder.io/qwik-city';

export const BreadcrumbItem = component$(({ to, children }: any) => {
  return (
    <li>
      <a href={to}>{children}</a>
    </li>
  );
});

export const BreadcrumbsSTL1 = component$(() => {
  useStylesScoped$(style);
  const location = useLocation();
  const pathnames = location.url.pathname.split('/').filter((x) => x);

  return (
    <div class="breadcrumb">
      {pathnames.map((value, index) => {
        const to = `/${pathnames.slice(0, index + 1).join('/')}`;

        const breadcrumb = value
          .split('-')
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ');

        return (
          <span key={index}>
            {index < pathnames.length - 1 ? (
              <>
                <a href={to}>{breadcrumb}</a>
                {' / '}
              </>
            ) : (
              <span>{breadcrumb}</span>
            )}
          </span>
        );
      })}
    </div>
  );
});
