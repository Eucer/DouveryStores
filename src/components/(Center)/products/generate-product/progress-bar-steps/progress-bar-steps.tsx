import { component$, useStylesScoped$ } from '@builder.io/qwik';
import style from './progress-bar-steps.css?inline';

export const ProgressBarSteps = component$(() => {
  useStylesScoped$(style);
  return (
    <>
      <ul class="progress-bar">
        <li class="active">Product Category</li>

        <li>Product Data</li>
        <li>Product Details</li>
        <li>Product Seo</li>
      </ul>
    </>
  );
});
