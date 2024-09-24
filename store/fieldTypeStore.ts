import { defineStore } from "pinia";
import { ref } from "vue";
import type { Type } from "~/types/models/Card";

export const useFieldTypeStore = defineStore("fieldType", () => {
  const fieldTypes = ref<Type[]>([]);

  const setFieldTypes = (types: Type[]) => {
    fieldTypes.value = types;
  };

  return {
    fieldTypes,
    setFieldTypes,
  };
});