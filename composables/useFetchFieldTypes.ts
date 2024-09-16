import { ref } from "vue";
import type { FieldType } from "~/types/models/FieldType";

export function useFetchFieldTypes() {
  const fieldTypes = ref<FieldType[]>([]);
  const { $api } = useNuxtApp();

  const fetchData = async () => {
    try {
      const response: { data: FieldType[] } = await $api(
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
