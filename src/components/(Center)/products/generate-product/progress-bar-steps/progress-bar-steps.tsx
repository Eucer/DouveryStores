import { $, component$, useStylesScoped$ } from '@builder.io/qwik';
import style from './progress-bar-steps.css?inline';

export const ProgressBarSteps = component$(
  ({ step, setStep, productStore }: any) => {
    useStylesScoped$(style);

    const handleClick = $((index: any) => {
      setStep.value = index;
    });

    return (
      <>
        <ul class="progress-bar">
          <li
            class={step === 1 ? 'active' : ''}
            onClick$={() => handleClick(1)}
          >
            Product Category
          </li>

          <li
            class={step === 2 ? 'active' : ''}
            onClick$={() => handleClick(2)}
          >
            {!productStore.productName ||
            !productStore.productPrice ||
            !productStore.productQty ||
            !productStore.productMaxQty ||
            !productStore.productGTIN ||
            !productStore.productHeight ||
            !productStore.productWidth ||
            !productStore.productDepth ? (
              <div class="circle-red"></div>
            ) : (
              ''
            )}{' '}
            Product Data
          </li>

          <li
            class={step === 3 ? 'active' : ''}
            onClick$={() => handleClick(3)}
          >
            Product Images
          </li>

          <li
            class={step === 4 ? 'active' : ''}
            onClick$={() => handleClick(4)}
          >
            Product Details
          </li>
        </ul>
      </>
    );
  }
);
