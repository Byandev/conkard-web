import { defineStore } from "pinia";
import type { Field } from "~/types/models/Card";
import { ref } from "vue";

export const useCardStore = defineStore("card", () => {
  const currentCard = ref<Field[]>([]);

  const setCurrentCard = (fields: Field[]) => {
    console.log("Setting current card:", fields);
    currentCard.value = fields;
  };

  return {
    currentCard,
    setCurrentCard,
  };
});
