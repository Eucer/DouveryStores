import { component$, useStylesScoped$ } from '@builder.io/qwik';
import styles from './beautiful-shops.css?inline';

import { CardAboutStore } from '~/components/cards/about-store/about-store';
export const BeautifulShops = component$(() => {
  useStylesScoped$(styles);
  return (
    <div class="container__all">
      <div class="title">
        <p>Crea una hermosas tienda en Douvery</p>
        <a href="/" class="show_more">
          Ver mas
        </a>
      </div>
      <div>
        <div class="store">
          {' '}
          <a href="https://www.douvery.com/Douvery/STORE-3465460B-51D47297-87C20FED/h/">
            <img
              width={800}
              height={400}
              src="https://res.cloudinary.com/douvery/image/upload/v1687113719/wxzffcr7iaxsggvfdw9w.png"
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
