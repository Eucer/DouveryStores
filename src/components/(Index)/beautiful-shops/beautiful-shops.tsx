import { component$, useStylesScoped$ } from '@builder.io/qwik';
import styles from './beautiful-shops.css?inline';
export const BeautifulShops = component$(() => {
  useStylesScoped$(styles);
  return (
    <div class="container__all">
      <div class="title">
        <p>Beautiful shops in douvery</p>
        <a href="/">Ver mas</a>
      </div>
      <a href="https://www.douvery.com/Douvery/STORE-3465460B-51D47297-87C20FED/h/">
        <div class="store">
          {' '}
          <img
            width={800}
            height={400}
            src="https://res.cloudinary.com/douvery/image/upload/v1687110092/sllypsjy0j6ct181fnxw.webp"
            alt=""
          />
          <img
            width={400}
            height={200}
            src="https://res.cloudinary.com/douvery/image/upload/v1687111072/l4xmfk5pqnj6ioyzrvon.webp"
            alt=""
          />
        </div>
      </a>
    </div>
  );
});
