import { component$, useStylesScoped$ } from '@builder.io/qwik';
import style from './title-link.css?inline';
export const TitleLink = component$(({ title, nameLink, link }: any) => {
  useStylesScoped$(style);
  return (
    <span class="titleLink">
      {title}
      <a href={link} class="link">
        {' '}
        {nameLink}
      </a>{' '}
    </span>
  );
});
