import type { CardType } from "~/types/models/CardType";

export const useFieldTypeStore = defineStore("fieldType", () => {
  const fieldTypes = ref<CardType[]>([]);
  const fieldTypeCategory = ref<string[]>([]);
  const { $api } = useNuxtApp();

  const fetchFieldTypes = async () => {
    try {
      const response: { data: CardType[] } = await $api("v1/cards/field-types");
      fieldTypeCategory.value = Array.from(new Set(fieldTypes.value.map((fieldType) => fieldType.category))); //Skip duplicate categories
      fieldTypes.value = response.data;
    } catch (error) {
      console.error("Error fetching field types data:", error);
    }
  };

  return {
    fieldTypes,
    fieldTypeCategory,
    fetchFieldTypes,
  };
});