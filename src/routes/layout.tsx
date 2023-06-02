import { component$, Slot } from '@builder.io/qwik';
import { Footer } from '~/components/footer/footer';
import { NavBar } from '~/components/nav-bar/nav-bar';

export default component$(() => {
  return (
    <main>
      <header>
        <NavBar />
      </header>

      <Slot />
      <Footer />
    </main>
  );
});
