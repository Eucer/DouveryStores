import { $, component$, useStylesScoped$ } from '@builder.io/qwik';
import style from './progress-bar-steps.css?inline';

export const ModifyProduct__ProgressBarSteps = component$(
  ({ step, setStep }: any) => {
    useStylesScoped$(style);

    const handleClick = $((index: any) => {
      setStep.value = index;
    });

    return (
      <nav>
        <strong>Product Tabs</strong>
        <br />
        <br />
        <ul class="progress-bar">
          <li
            class={step === 1 ? 'active' : ''}
            onClick$={() => handleClick(1)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M18.5 3.75h-10A2.75 2.75 0 0 0 5.75 6.5v.25H5.5A2.75 2.75 0 0 0 2.75 9.5v8a2.75 2.75 0 0 0 2.75 2.75h10a2.75 2.75 0 0 0 2.75-2.75v-.25h.25a2.75 2.75 0 0 0 2.75-2.75v-8a2.75 2.75 0 0 0-2.75-2.75ZM7.25 6.5A1.25 1.25 0 0 1 8.5 5.25h10a1.25 1.25 0 0 1 1.25 1.25v6.2l-2.27-1.91a.74.74 0 0 0-1.05.08l-1.07 1.26l-4-3.88a.7.7 0 0 0-.52-.25a.75.75 0 0 0-.54.26l-3.05 3.63Zm1.25 9.25a1.25 1.25 0 0 1-1.25-1.25v-.3l3.67-4.32l3.46 3.39l-2.1 2.48Zm8.25 1.75a1.25 1.25 0 0 1-1.25 1.25h-10a1.25 1.25 0 0 1-1.25-1.25v-8A1.25 1.25 0 0 1 5.5 8.25h.25v6.25a2.75 2.75 0 0 0 2.75 2.75h8.25Zm1.75-1.75h-4.25l2.84-3.34l2.63 2.23a1.23 1.23 0 0 1-1.22 1.11Z"
              />
            </svg>{' '}
            Product images
          </li>

          <li
            class={step === 2 ? 'active' : ''}
            onClick$={() => handleClick(2)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 36 36"
            >
              <path
                fill="currentColor"
                d="M32 6H4a2 2 0 0 0-2 2v20a2 2 0 0 0 2 2h28a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2Zm0 22H4V8h28Z"
                class="clr-i-outline clr-i-outline-path-1"
              />
              <path
                fill="currentColor"
                d="M9 14h18a1 1 0 0 0 0-2H9a1 1 0 0 0 0 2Z"
                class="clr-i-outline clr-i-outline-path-2"
              />
              <path
                fill="currentColor"
                d="M9 18h18a1 1 0 0 0 0-2H9a1 1 0 0 0 0 2Z"
                class="clr-i-outline clr-i-outline-path-3"
              />
              <path
                fill="currentColor"
                d="M9 22h10a1 1 0 0 0 0-2H9a1 1 0 0 0 0 2Z"
                class="clr-i-outline clr-i-outline-path-4"
              />
              <path fill="none" d="M0 0h36v36H0z" />
            </svg>{' '}
            Product details
          </li>

          <li
            class={step === 3 ? 'active' : ''}
            onClick$={() => handleClick(3)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
            >
              <path
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 12V6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v6m-10 6H3m18 0h-7m-8-3l-3 3l3 3m12-6l3 3l-3 3"
              />
            </svg>
            Product Basic details
          </li>

          <li
            class={step === 4 ? 'active' : ''}
            onClick$={() => handleClick(4)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 512 512"
            >
              <path
                fill="currentColor"
                d="M176 184h32v-48h96v232h-40v32h144v-32h-40V136h96v48h32v-80H176v80z"
              />
              <path
                fill="currentColor"
                d="M16 280h32v-32h56v152H72v32h112v-32h-32V248h64v32h32v-64H16v64z"
              />
            </svg>
            Short description & Bullets
          </li>
          <li
            class={step === 5 ? 'active' : ''}
            onClick$={() => handleClick(5)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 256 256"
            >
              <path
                fill="currentColor"
                d="M34 64a6 6 0 0 1 6-6h176a6 6 0 0 1 0 12H40a6 6 0 0 1-6-6Zm6 70h72a6 6 0 0 0 0-12H40a6 6 0 0 0 0 12Zm88 52H40a6 6 0 0 0 0 12h88a6 6 0 0 0 0-12Zm108.24 10.24a6 6 0 0 1-8.48 0l-21.49-21.48a38.06 38.06 0 1 1 8.49-8.49l21.48 21.49a6 6 0 0 1 0 8.48ZM184 170a26 26 0 1 0-26-26a26 26 0 0 0 26 26Z"
              />
            </svg>
            Keywords
          </li>
        </ul>
      </nav>
    );
  }
);
