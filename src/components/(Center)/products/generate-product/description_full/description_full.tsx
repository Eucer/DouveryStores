import { component$, useVisibleTask$ } from '@builder.io/qwik';
import tinymce from 'tinymce/tinymce';
import { ExampleCodeDesrcriptionFUll } from '~/fuctions/examples/examples-generate-product';

export const Description_full = component$(
  ({ productStore, onProductDescriptionFullChange, nextStep }: any) => {
    useVisibleTask$(async ({ track, cleanup }) => {
      track(() => nextStep.value);

      const data = (await tinymce.init({
        selector: '#descriptionFUll',
        height: 1000,
        menubar: false,
        plugins:
          'anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount checklist mediaembed casechange export formatpainter pageembed linkchecker a11ychecker tinymcespellchecker permanentpen powerpaste advtable advcode editimage tinycomments tableofcontents footnotes mergetags autocorrect typography inlinecss',
        toolbar:
          'code undo redo | blocks fontsize | bold italic underline strikethrough| forecolor backcolor | link image media table mergetags | align lineheight | checklist numlist bullist indent outdent ',
        tinycomments_mode: 'embedded',
        toolbar_mode: 'floating',
        setup: function (editor: any) {
          editor.on('change undo redo', function () {
            const newContent = editor.getContent();
            // Use newContent to update your state.
            newContent;
          });
          editor.on('init', function () {
            // Contenido de ejemplo
            editor.setContent(ExampleCodeDesrcriptionFUll());
          });
        },
      })) as any;
      cleanup(() => clearTimeout(data));
    });

    return (
      <textarea
        id="descriptionFUll"
        value={productStore.productDescriptionFull}
        onChange$={onProductDescriptionFullChange}
      ></textarea>
    );
  }
);
