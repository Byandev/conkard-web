import { defineStore } from "pinia";
import { ref } from "vue";
import type { Card } from "~/types/models/Card";
import type { CardField } from "~/types/models/CardField";

export const useCardStore = defineStore("card", () => {
  const cardForm = ref<Partial<Card>>({
    label: '',
    fields: []
  });

  const addLabel = (label: string) => {
    cardForm.value.label = label;
  };

  const addField = (field: CardField) => {
    cardForm.value.fields?.push(field);
  };

  const deleteField = (id: number) => {
    const fieldIndex = cardForm.value.fields?.findIndex(field => field.id === id);
    if (fieldIndex !== undefined && fieldIndex !== -1) {
      cardForm.value.fields?.splice(fieldIndex, 1);
    } else {
      console.error(`Field with id ${id} not found.`);
    }
  };

  const resetForm = () => {
    cardForm.value = {
      label: '',
      fields: []
    };
  };

  return {
    addLabel,
    addField,
    deleteField,
    resetForm,
  };
});