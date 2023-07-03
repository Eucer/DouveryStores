import { $, component$, useStylesScoped$ } from '@builder.io/qwik';
import styles from './paginator-1.css?inline';

export const Paginator1 = component$(
  ({ currentPage, totalPages, onPageChange }: any) => {
    useStylesScoped$(styles);
    const hasPreviousPage = currentPage > 1;
    const hasNextPage = currentPage < totalPages;

    const onPageChangeMinus = $(() => {
      const newPage = currentPage - 1;
      onPageChange.value = newPage;
      window.history.pushState(null, '', `?pg=${newPage}`);
    });

    const onPageChangePlus = $(() => {
      const newPage = currentPage + 1;
      onPageChange.value = newPage;
      window.history.pushState(null, '', `?pg=${newPage}`);
    });
    return (
      <div class="paginator">
        <button
          class="paginator__button"
          disabled={!hasPreviousPage}
          onClick$={onPageChangeMinus}
        >
          Anterior
        </button>
        <span class="paginator__info">
          Página {currentPage} de {totalPages}
        </span>

        <button
          class="paginator__button"
          disabled={!hasNextPage}
          onClick$={onPageChangePlus}
        >
          Siguiente
        </button>
      </div>
    );
  }
);
