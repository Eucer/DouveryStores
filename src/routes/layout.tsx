import { component$, Slot, useStylesScoped$ } from '@builder.io/qwik';
import { Footer } from '~/components/footer/footer';
import { NavBar } from '~/components/nav-bar/nav-bar';
import style from './index.css?inline';
export default component$(() => {
  useStylesScoped$(style);
  return (
    <><main>
      <header>
        <NavBar />
      </header>

      <Slot />

    </main>
      <Footer /></>

  );
});
