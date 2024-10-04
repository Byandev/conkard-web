import type { CardFieldType } from "~/types/models/CardFieldType";
import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { useNuxtApp } from "#app";

export const useFieldTypeStore = defineStore("fieldType", () => {
  const fieldTypes = ref<CardFieldType[]>([]); //Stores FieldTypes

  const { $api } = useNuxtApp();

  const fetchFieldTypes = async () => {
    try {
      const response: { data: CardFieldType[] } = await $api("v1/cards/field-types");
      fieldTypes.value = response.data;
    } catch (error) {
      console.error("Error fetching field types data:", error);
    }
  };

  const groupedFieldsByCategory = computed(() => {
    return fieldTypes.value.reduce((acc: Record<string, CardFieldType[]>, field: CardFieldType) => {
      const category = field.category;
      
      if (!acc[category]) {
        acc[category] = [];
      }

      acc[category].push(field);

      return acc;
    }, {});
  });

  return {
    fieldTypes,
    fetchFieldTypes,
    groupedFieldsByCategory,
  };
});