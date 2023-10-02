import { component$, useStylesScoped$ } from '@builder.io/qwik';
import { AssetsDouveryLgoLargue } from '~/components/douvery-assets/lgos/douvery-lgo-largue';

export const LogoNavbar = component$(() => {
  useStylesScoped$(
    `
    
.logo {
    display: flex;
    align-items: center;
    gap: 1px;
    font-size: 24px;
    color: #000;
    font-weight: bold;
}

.logo img {
    width: 30px;
    height: 30px;
    border-radius: 5px;
}

.logo strong {
    font-weight: 800;
    font-size: 20px;
    padding-top: 3px;
    text-decoration: none;
    color: var(--color-action-show-more);
}
      `
  );
  return (
    <a href="/">
      <div class="logo">
        <AssetsDouveryLgoLargue size="150" />
        <strong>Shops</strong>
      </div>
    </a>
  );
});
