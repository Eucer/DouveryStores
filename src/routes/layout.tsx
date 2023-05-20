import { component$, Slot } from '@builder.io/qwik';
import { NavBar } from '~/components/nav-bar/nav-bar';

export default component$(() => {
  return (
    <main>
      <header>
        <NavBar />
      </header>
      <Slot />
    </main>
  );
});
