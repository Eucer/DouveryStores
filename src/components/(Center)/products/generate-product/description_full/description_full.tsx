import {
  component$,
  useStylesScoped$,
  useVisibleTask$,
} from '@builder.io/qwik';
import style from './description_full.css?inline';

export const Description_full = component$(
  ({ productStore, onProductDescriptionFullChange, nextStep }: any) => {
    useStylesScoped$(style);

    productStore;
    onProductDescriptionFullChange;
    useVisibleTask$(async ({ track }) => {
      track(() => nextStep.value);
      const editor = new EditorJS({
        holder: 'editorjs',
        tools: {
          header: Header,
        },
      });
    });

    return (
      <>
        <div id="editorjs"></div>
      </>
    );
  }
);
