import { component$, useStylesScoped$ } from '@builder.io/qwik';
import styles from './beautiful-shops.css?inline';

import { CardAboutStore } from '~/components/cards/about-store/about-store';
export const BeautifulShops = component$(() => {
  useStylesScoped$(styles);
  return (
    <div class="container__all">
      <div class="title">
        <p>Beautiful shops in douvery</p>
        <a href="/">Ver mas</a>
      </div>
      <div>
        <div class="store">
          {' '}
          <a href="">
            <img
              width={800}
              height={400}
              src="../../../../public/img/store.png"
              alt=""
            />
          </a>
          <div class="card_aboutstore">
            <CardAboutStore />
          </div>
        </div>
      </div>
    </div>
  );
});
