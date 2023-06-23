import { $, component$, useStore } from '@builder.io/qwik';

export const CategorySelector = component$(
  ({ categories, onSelectCategory }: any) => {
    const state = useStore({
      selectedCategory: '',
    });
    const handleCategoryChange = $((e: any) => {
      const categoryId = parseInt(e.target.value);
      const selectedCategory = categories.find(
        ({ category }: any) => category.id === categoryId
      );
      state.selectedCategory = selectedCategory as any;
      onSelectCategory.onSelectCategory = selectedCategory as any;
    });

    return (
      <div>
        <label>Selecciona una categoría:</label>
        <select
          value={state.selectedCategory ? state.selectedCategory : ''}
          onChange$={handleCategoryChange}
        >
          <option value="">Seleccione una categoría</option>
          {categories.map((category: any) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>
    );
  }
);
