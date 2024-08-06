import type { Field } from "~/types/models/Card";
import { ref } from "vue";

export const useCardStore = () => {
  const currentCard = ref<Field[]>([]);

  return {
    currentCard,
    setCurrentCard(fields: Field[]) {
      console.log("Setting current card:", fields);
      this.currentCard.value = fields;
    },
  };
};
