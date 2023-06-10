import { component$ } from '@builder.io/qwik';

export const TextCL = component$(({ text }: any) => {
  const capitalizedText = text.charAt(0).toUpperCase() + text.slice(1);

  return <>{capitalizedText}</>;
});
