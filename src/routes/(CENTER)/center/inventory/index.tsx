import {
  Resource,
  component$,
  useResource$,
  useSignal,
  useStore,
  useStylesScoped$,
} from '@builder.io/qwik';
import { BreadcrumbsSTL1 } from '~/components/breadcrumb/style1_breadcrumb/BreadcrumbsSTL1';
import style from './index.css?inline';
import { Link, useLocation, useNavigate } from '@builder.io/qwik-city';

import { fetchStoreInventoryProducts } from '~/services/fetch/products/inventory-products/inventory-product';
import { Button1 } from '~/components/button/button-1/button-1';

import { type Product } from '~/services/util/types/product';
import { useGetCurrentUser } from '~/routes/layout';

import { DouveryArrowDown } from '~/components/icons/arrow-down';
import { Paginator1 } from '~/components/paginator/paginator-1/paginator-1';
import { Card2S } from '~/components/cards/inventory/card-2-s/card-2-s';
import { IconsSearch } from '~/components/icons/search';

export const category = [
  {
    name: 'Any',
    value: 'all',
  },
  {
    name: 'Books',
    value: 'books',
    subCategory: [{ name: 'Pasta blanda', value: 'pasta blanda' }],
  },
  {
    name: 'Moda Para Hombre',
    value: 'moda para hombre',
    subCategory: [
      { name: 'Ropa', value: 'ropa' },
      { name: 'Calzado masculino', value: 'calzado masculino' },
      { name: 'Deportivo', value: 'deportivo' },
      { name: 'Tenis', value: 'tenis' },
    ],
  },
  {
    name: 'Computadoras  & Accesorios',
    value: 'computadoras y accesorios',
    subCategory: [
      { name: 'Monitor para videojuegos', value: 'monitor para videojuegos' },
      {
        name: 'Procesador para computadoras',
        value: 'procesador para computadoras',
      },
      { name: 'Laptop', value: 'laptop' },
      { name: 'Teclado', value: 'teclado' },
    ],
  },
  {
    name: 'Electronico & Accesorios',
    value: 'electronic Y accesorios',
    subCategory: [
      { name: 'Celulares', value: 'celular' },
      { name: 'Audífonos', value: 'audífonos' },
      { name: 'Televisores', value: 'televisor' },
      { name: 'Reloj moderno', value: 'reloj moderno' },
      { name: 'Volante de videojuegos', value: 'volante de videojuegos' },
    ],
  },
  {
    name: 'Nutrición',
    value: 'nutrición',
    subCategory: [
      { name: 'Nutrición deportiva', value: 'nutrición deportiva' },
    ],
  },
];
interface IState {
  searchInput: string;
}

export default component$(() => {
  useStylesScoped$(style);
  const loc = useLocation();
  const pg = loc.url.searchParams.get('pg') || '';
  const currentPage = useSignal((pg && parseInt(pg)) || 1);
  const number = useStore({ setNumber: 1 });
  const navigate = useNavigate();
  const input = useStore<IState>({
    searchInput: '',
  });

  const item = useStore({
    itemsReturned: [] as any,
  });
  const { url } = useLocation();
  const user = useGetCurrentUser().value;
  const prodcureducer = useResource$<Product[]>(async ({ cleanup, track }) => {
    track(() => currentPage.value && url.search && input.searchInput);

    const controller = new AbortController();
    cleanup(() => controller.abort());
    const category = url.searchParams.get('or-c') || 'all';
    const subcategory = url.searchParams.get('or-sc') || 'all';
    const query = input.searchInput;
    const price = url.searchParams.get('or-p') || 'all';
    const rating = url.searchParams.get('or-r') || 'all';
    const order = url.searchParams.get('or-or') || 'newest';

    const brand = url.searchParams.get('or-b') || 'all';
    item.itemsReturned = await fetchStoreInventoryProducts(
      category,
      subcategory,
      query,
      price,
      rating,
      order,
      currentPage.value,
      brand,
      user?.token || '',
      controller
    );

    return item.itemsReturned;
  });

  const layout = url.searchParams.get('or-ly') || '';

  const prices = [
    {
      name: '$1 to $50',
      value: '1-50',
    },
    {
      name: '$51 to $200',
      value: '51-200',
    },
    {
      name: '$201 to $1000',
      value: '201-1000',
    },
  ];

  const selectedValue = useStore({ selectedValue: '' });
  const or_c = url.searchParams.has('or-c')
    ? `&or-c=${url.searchParams.get('or-c')}`
    : '';
  const or_sc = url.searchParams.has('or-sc')
    ? `&or-sc=${url.searchParams.get('or-sc')}`
    : '';
  const or_p = url.searchParams.has('or-p')
    ? `&or-p=${url.searchParams.get('or-p')}`
    : '';
  const or_ly = url.searchParams.has('or-ly')
    ? `&or-ly=${url.searchParams.get('or-ly')}`
    : '';

  return (
    <div class="container__all">
      <div class="title_and_infos">
        <div class="title">
          <BreadcrumbsSTL1 />
          <div class="product_new__title">Control de Inventario</div>
        </div>
      </div>

      <div class="container__grid">
        <div class="filter-section">
          <div class="filter-section-header">
            <h2>Filters</h2>
            <div class="filter">
              {or_c || or_p ? (
                <Button1
                  title="Desmarcar filtros"
                  navigate={
                    url.pathname.replace(/ /g, '+') +
                    `?q=${url.searchParams.get('q')}`
                  }
                />
              ) : (
                <></>
              )}
            </div>
          </div>

          <div class="filter-section-body">
            <div>
              <h3>By Price Range</h3>
              {prices.map((p, i) => (
                <li
                  class={
                    url.searchParams.get('or-p') === p.value
                      ? 'active-undeline'
                      : ''
                  }
                  key={i}
                >
                  <Link
                    href={
                      url.pathname +
                      `?q=${url.searchParams.get('q')}` +
                      or_c +
                      `&or-p=${p.value}` +
                      or_ly
                    }
                    class={
                      url.searchParams.get('or-p') === p.value
                        ? 'active-undeline'
                        : ''
                    }
                  >
                    {p.name}
                  </Link>
                </li>
              ))}
            </div>
          </div>
        </div>
        <div class="product-section">
          <div class="header_section">
            {' '}
            <div class="search_container">
              <span class="searh_fast">Busqueda rapida: </span>
              <div class="input_search">
                <IconsSearch />
                <input
                  class="input_search__product"
                  type="text"
                  onKeyUp$={(ev) => {
                    input.searchInput = (ev.target as HTMLInputElement).value;
                    url.searchParams.set('q', input.searchInput);
                    navigate(url.pathname + '?q=' + input.searchInput);
                  }}
                  value={input.searchInput}
                  placeholder={'Buscar productos y más'}
                />{' '}
              </div>
            </div>
            <div class="container-select">
              <div class="select">
                <select
                  id="slct"
                  value={
                    selectedValue.selectedValue
                      ? selectedValue.selectedValue
                      : 'toprated'
                  }
                  onChange$={(event) =>
                    navigate(
                      url.pathname +
                        '?q=' +
                        url.searchParams.get('q') +
                        or_c +
                        or_sc +
                        '&or-or=' +
                        event.target.value +
                        or_ly
                    )
                  }
                >
                  <option value="newest" selected>
                    Llegadas más recientes
                  </option>

                  <option value="oldest">Llegadas más antiguas</option>
                  <option value="pending">Pendientes</option>
                  <option value="approved">Aprobados</option>
                  <option value="rejected">Rechazados</option>
                  <option value="all">Todos</option>
                </select>
                <DouveryArrowDown size="14px" />
              </div>{' '}
              <div class="container-button-view-layout">
                <button
                  onClick$={() => (
                    number.setNumber == 1
                      ? (number.setNumber = 2)
                      : (number.setNumber = 1),
                    navigate(
                      url.pathname +
                        `?q=${url.searchParams.get('q')}` +
                        or_c +
                        or_sc +
                        `&or-ly=${number.setNumber}`
                    )
                  )}
                >
                  {layout === '1' ? (
                    <div>
                      <svg
                        width="15"
                        height="15"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M17.2788 11.2002C17.0888 11.2002 16.8988 11.1302 16.7488 10.9802C16.4588 10.6902 16.4588 10.2102 16.7488 9.9202L19.9388 6.7302L16.7488 3.54019C16.4588 3.25019 16.4588 2.7702 16.7488 2.4802C17.0387 2.1902 17.5187 2.1902 17.8087 2.4802L21.5288 6.20023C21.6688 6.34023 21.7488 6.5302 21.7488 6.7302C21.7488 6.9302 21.6688 7.12022 21.5288 7.26022L17.8087 10.9802C17.6587 11.1202 17.4688 11.2002 17.2788 11.2002Z"
                          fill="#292D32"
                        />
                        <path
                          d="M21 7.47998H3C2.59 7.47998 2.25 7.13998 2.25 6.72998C2.25 6.31998 2.59 5.97998 3 5.97998H21C21.41 5.97998 21.75 6.31998 21.75 6.72998C21.75 7.13998 21.41 7.47998 21 7.47998Z"
                          fill="#292D32"
                        />
                        <path
                          d="M6.71997 21.75C6.52997 21.75 6.34 21.68 6.19 21.53L2.46997 17.81C2.32997 17.67 2.25 17.48 2.25 17.28C2.25 17.08 2.32997 16.89 2.46997 16.75L6.19 13.03C6.48 12.74 6.96 12.74 7.25 13.03C7.54 13.32 7.54 13.8 7.25 14.09L4.06 17.28L7.25 20.4699C7.54 20.7599 7.54 21.24 7.25 21.53C7.11 21.68 6.91997 21.75 6.71997 21.75Z"
                          fill="#292D32"
                        />
                        <path
                          d="M21 18.02H3C2.59 18.02 2.25 17.68 2.25 17.27C2.25 16.86 2.59 16.52 3 16.52H21C21.41 16.52 21.75 16.86 21.75 17.27C21.75 17.68 21.41 18.02 21 18.02Z"
                          fill="#292D32"
                        />
                      </svg>
                    </div>
                  ) : (
                    <div>
                      {' '}
                      <svg
                        width="15"
                        height="15"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M10.4493 7.46997C10.2593 7.46997 10.0692 7.4 9.91922 7.25L6.72922 4.06L3.53922 7.25C3.24922 7.54 2.76922 7.54 2.47922 7.25C2.18922 6.96 2.18922 6.48 2.47922 6.19L6.19925 2.46997C6.33925 2.32997 6.52922 2.25 6.72922 2.25C6.92922 2.25 7.11925 2.32997 7.25925 2.46997L10.9792 6.19C11.2692 6.48 11.2692 6.96 10.9792 7.25C10.8292 7.4 10.6392 7.46997 10.4493 7.46997Z"
                          fill="#292D32"
                        />
                        <path
                          d="M6.73047 21.75C6.32047 21.75 5.98047 21.41 5.98047 21V3C5.98047 2.59 6.32047 2.25 6.73047 2.25C7.14047 2.25 7.48047 2.59 7.48047 3V21C7.48047 21.41 7.14047 21.75 6.73047 21.75Z"
                          fill="#292D32"
                        />
                        <path
                          d="M17.28 21.7497C17.08 21.7497 16.89 21.6698 16.75 21.5298L13.03 17.8097C12.74 17.5197 12.74 17.0397 13.03 16.7497C13.32 16.4597 13.8 16.4597 14.09 16.7497L17.28 19.9397L20.4699 16.7497C20.7599 16.4597 21.24 16.4597 21.53 16.7497C21.82 17.0397 21.82 17.5197 21.53 17.8097L17.81 21.5298C17.67 21.6698 17.47 21.7497 17.28 21.7497Z"
                          fill="#292D32"
                        />
                        <path
                          d="M17.2695 21.75C16.8595 21.75 16.5195 21.41 16.5195 21V3C16.5195 2.59 16.8595 2.25 17.2695 2.25C17.6795 2.25 18.0195 2.59 18.0195 3V21C18.0195 21.41 17.6895 21.75 17.2695 21.75Z"
                          fill="#292D32"
                        />
                      </svg>
                    </div>
                  )}
                </button>
              </div>
            </div>
          </div>
          <br />
          <br />
          <Resource
            value={prodcureducer}
            onPending={() => <div class="loader"></div>}
            onRejected={() => (
              <>
                Al parecer, hay un error en la solicitud. Por favor, actualiza
                la página para verificar nuevamente.
              </>
            )}
            onResolved={(data: any) => (
              <>
                {' '}
                <ul>
                  {data.allProducts.length === 0 ? (
                    <p>No hay productos para mostrar.</p>
                  ) : (
                    <ul
                      class={
                        layout == '2'
                          ? 'container-product-layout-grid'
                          : 'container-product-layout-vert'
                      }
                    >
                      {data.allProducts.map((product: any) => (
                        <>
                          <li class="card_product" key={product.id}>
                            <Card2S product={product} />
                            {product.status == 'pending' ? (
                              ''
                            ) : (
                              <>
                                {' '}
                                <div class="separator_hz" />
                                <div class="option_product">
                                  <div class="button_modifi">
                                    <a
                                      href={`/center/products/modify/${product.dui}/`}
                                    >
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="14"
                                        height="14"
                                        viewBox="0 0 14 14"
                                      >
                                        <g
                                          fill="none"
                                          stroke="currentColor"
                                          stroke-linecap="round"
                                          stroke-linejoin="round"
                                        >
                                          <path d="m7.5 9l-3 .54L5 6.5L10.73.79a1 1 0 0 1 1.42 0l1.06 1.06a1 1 0 0 1 0 1.42Z" />
                                          <path d="M12 9.5v3a1 1 0 0 1-1 1H1.5a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1h3" />
                                        </g>
                                      </svg>
                                      Moficar
                                    </a>
                                  </div>
                                  <div class="button_statistics">
                                    <a
                                      href={`/center/products/statistics/${product.dui}/`}
                                    >
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="14"
                                        height="14"
                                        viewBox="0 0 24 24"
                                      >
                                        <g
                                          fill="none"
                                          stroke="currentColor"
                                          stroke-linecap="round"
                                          stroke-linejoin="round"
                                          stroke-width="2"
                                        >
                                          <path
                                            stroke-miterlimit="5.759"
                                            d="M3 3v16a2 2 0 0 0 2 2h16"
                                          />
                                          <path
                                            stroke-miterlimit="5.759"
                                            d="m7 14l4-4l4 4l6-6"
                                          />
                                          <path d="M18 8h3v3" />
                                        </g>
                                      </svg>
                                      Statistics
                                    </a>
                                  </div>
                                </div>
                              </>
                            )}
                          </li>
                        </>
                      ))}

                      <Paginator1
                        currentPage={data.currentPage}
                        totalPages={data.totalPages}
                        onPageChange={currentPage}
                      />
                    </ul>
                  )}
                </ul>
              </>
            )}
          />
        </div>
      </div>
    </div>
  );
});
