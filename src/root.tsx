import { component$ } from '@builder.io/qwik';
import {
  QwikCityProvider,
  RouterOutlet,
  ServiceWorkerRegister,
} from '@builder.io/qwik-city';
import { RouterHead } from './components/router-head/router-head';

import './global.css';

export default component$(() => {
  /**
   * The root of a QwikCity site always start with the <QwikCityProvider> component,
   * immediately followed by the document's <head> and <body>.
   *
   * Dont remove the `<head>` and `<body>` elements.
   */

  return (
    <QwikCityProvider>
      <head>
        <meta charSet="utf-8" />
        <link rel="manifest" href="/manifest.json" />

        <RouterHead />
      </head>
      <body lang="en">
        <script
          src="https://cdn.tiny.cloud/1/gpfm1czm9uffph4gth3ugnsuj980qbls0ovvvni4ozog6pn3/tinymce/6/tinymce.min.js"
          referrerPolicy="origin"
        ></script>
        <RouterOutlet />
        <ServiceWorkerRegister />
        <script src="./tiny.js"></script>
      </body>{' '}
    </QwikCityProvider>
  );
});
