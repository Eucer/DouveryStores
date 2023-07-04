import {
  $,
  component$,
  useSignal,
  useStore,
  useStylesScoped$,
} from '@builder.io/qwik';
import style from './bullet-product.css?inline';

export const BulletProduct = component$(({ productStore }: any) => {
  useStylesScoped$(style);
  const bullets = useStore(
    productStore.productBullets && productStore.productBullets.length > 0
      ? { setBullets: productStore.productBullets }
      : { setBullets: [''] }
  );

  const disabled = useSignal(false);
  const handleBulletChange = $((e: any, index: any) => {
    const newBullets = [...bullets.setBullets];
    newBullets[index] = e.target.value as never;

    bullets.setBullets = newBullets as any;
    productStore.productBullets = bullets.setBullets;
  });

  const addNewBullet = $(() => {
    if (bullets.setBullets.length < 8) {
      bullets.setBullets = [...bullets.setBullets, ''] as any;
    } else {
      disabled.value = true;
    }
  });

  const removeBullet = $((index: any) => {
    const newBullets = [...bullets.setBullets];
    newBullets.splice(index, 1);

    bullets.setBullets = newBullets;
    productStore.productBullets = bullets.setBullets;
  });

  return (
    <div>
      {bullets?.setBullets?.map((bullet: any, index: any) => (
        <div key={index} class="conten_vinetas">
          <div class="cirle-bg"> </div>
          <input
            type="text"
            id="vinetas_product"
            placeholder="Ingrese características destacadas del producto aquí"
            value={bullet}
            onChange$={(e) => handleBulletChange(e, index)}
          />
          {index == 0 ? (
            ''
          ) : (
            <span
              class="btn_deleted_bullet"
              onClick$={() => removeBullet(index)}
            >
              {/* SVG Code */}
            </span>
          )}
        </div>
      ))}
      <div class="conten_newvineta">
        {disabled.value == true ? (
          <></>
        ) : (
          <span class="btn_new_vineta" onClick$={addNewBullet}>
            Agregar otra
          </span>
        )}
      </div>
    </div>
  );
});
