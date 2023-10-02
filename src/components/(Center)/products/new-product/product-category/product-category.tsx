import { component$ } from '@builder.io/qwik';

export const ProductCategory = component$(
  ({ nextStep, productStore, productCategoryHandlers }: any) => {
    const { onProductCategoryChange, onProductSubCategoryChange } =
      productCategoryHandlers;

    const categories = [
      {
        id: 1,
        name: 'Electrónica',
        subcategories: ['Teléfonos', 'Televisores', 'Laptops'],
      },
      {
        id: 2,
        name: 'Ropa',
        subcategories: ['Hombres', 'Mujeres', 'Niños'],
      },
    ];
    return (
      <div class="form-container">
        <label>Selecciona una categoría:</label>
        <br />
        <select
          value={productStore.selectedCategoryIndex}
          onChange$={onProductCategoryChange}
        >
          <option value="-1">Seleccione una categoría</option>
          {categories?.map(({ category, index }: any) => (
            <option key={index} value={index}>
              {category?.name}
            </option>
          ))}
        </select>

        {productStore.selectedCategoryIndex !== -1 && (
          <div>
            <label>Selecciona una subcategoría:</label>
            <select
              value={productStore.selectedSubCategoryIndex}
              onChange$={onProductSubCategoryChange}
            >
              <option value="-1">Seleccione una subcategoría</option>
              {categories[productStore.selectedCategoryIndex].subcategories.map(
                ({ subCat, index }: any) => (
                  <option key={index} value={index}>
                    {subCat}
                  </option>
                )
              )}
            </select>
          </div>
        )}

        <br />
        <div class="buttons-container">
          <button
            type="button"
            class="next-button"
            onClick$={nextStep}
            disabled={!productStore.productSubCategory}
          >
            Siguiente
          </button>
        </div>
      </div>
    );
  }
);
