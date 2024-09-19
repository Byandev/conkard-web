import { defineStore } from "pinia";
import type { Field } from "~/types/models/Card";
import { ref } from "vue";

export const useCardStore = defineStore("card", () => {
  const currentCard = ref<Field[]>([]);
  const currentId = ref<number>();
  const currentLabel = ref<string>('')
  const isLoading = ref<boolean>(false);

  const setCurrentId = (id: number) => {
    console.log("Setting current ID:", id);
    currentId.value = id;
  }

  const setCurrentCard = (fields: Field[]) => {
    console.log("Setting current card:", fields);
    currentCard.value = fields;
  };

  const setLoading = (state: boolean) => {
      console.log('State Change', state)
      isLoading.value = state;
  }

  const setCurrentLabel = (label: string) => {
    console.log('new label', label)
    currentLabel.value = label;
  }

  const resetCurrentCard = () => {
    currentCard.value = [];
    currentId.value = undefined;
    currentLabel.value = '';
    console.log("Current Card reset", currentCard);
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
