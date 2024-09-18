import { ref } from "vue";
import type { Type } from "~/types/models/Card";

export function useFetchFieldTypes() {
  const fieldTypes = ref<Type[]>([]);
  const { $api } = useNuxtApp();

  const fetchData = async () => {
    try {
      const response: { data: Type[] } = await $api(
        "v1/cards/field-types"
      );
      fieldTypes.value = response.data;

      console.log("Success");
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return {
    fetchData,
    fieldTypes,
  };
}
