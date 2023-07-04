import { component$, useStylesScoped$ } from '@builder.io/qwik';
import style from './title-subtitle-component.css?inline';
export const TitleSubtitleComponent = component$(({ title, subtitle }: any) => {
  useStylesScoped$(style);
  return (
    <div class="crrts-title">
      <div class="ofrs">
        <hs-sr3>{title}</hs-sr3>
      </div>

      <p class="ps-sr1 ">{subtitle} </p>
    </div>
  );
});
