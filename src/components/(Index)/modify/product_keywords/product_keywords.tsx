import { $, component$, useStore, useStylesScoped$ } from '@builder.io/qwik';
import style from './product_keywords.css?inline';

export const Product_keywords = component$(({ productStore }: any) => {
  useStylesScoped$(style);

  const inputValue = useStore({ value: '' });

  const addKeywords = $((event: any, props: any) => {
    if (inputValue.value !== '') {
      productStore.productKeywords = [
        ...productStore.productKeywords,
        inputValue.value,
      ];
      props.selectedKeywords = [
        ...productStore.productKeywords,
        inputValue.value,
      ];
    }
  });

  const removeKeywords = $((index: any) => {
    productStore.productKeywords = productStore.productKeywords.filter(
      (item: any, i: any) => i !== index
    );
  });

  return (
    <div class="keywords-input">
      <ul id="keywords">
        {productStore.productKeywords.map((keyword: any, index: any) => (
          <li key={index} class="keyword">
            <span class="keyword-title">{keyword}</span>
            <span
              class="keyword-close-icon"
              onClick$={() => removeKeywords(index)}
            >
              x
            </span>
          </li>
        ))}
      </ul>
      <div class="input_btn">
        <input
          type="text"
          value={inputValue.value}
          onKeyUp$={(event) =>
            event.key === 'Enter'
              ? (addKeywords(event, ''), (inputValue.value = ''))
              : null
          }
          onInput$={(event: any) => {
            inputValue.value = event.target.value;
          }}
          placeholder="Press enter to add keywords"
        />
        <button
          onClick$={() => (
            addKeywords(inputValue.value, ''), (inputValue.value = '')
          )}
        >
          +
        </button>
      </div>
    </div>
  );
});
