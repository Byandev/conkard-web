import { defineStore } from "pinia";
import type { Field } from "~/types/models/Card";
import { ref } from "vue";

export const useCardStore = defineStore("card", () => {
  const currentCard = ref<Field[]>([]);
  const currentId = ref<number>();
  const currentLabel = ref<string>('')
  const isLoading = ref<boolean>(true);

  const setCurrentId = (id: number) => {
    currentId.value = id;
  }

  const setCurrentCard = (fields: Field[]) => {
    currentCard.value = fields;
  };

  const setLoading = (state: boolean) => {
      isLoading.value = state;
  }

  const setCurrentLabel = (label: string) => {
    currentLabel.value = label;
  }

  const resetCurrentCard = () => {
    currentCard.value = [];
    currentId.value = undefined;
    currentLabel.value = '';
  }

  return {
    currentCard,
    setCurrentCard,
    currentId,
    setCurrentId,
    setLoading,
    isLoading,
    setCurrentLabel,
    currentLabel,
    resetCurrentCard
  };
});
