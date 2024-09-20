import type { Field } from "~/types/models/Card";
import { useCardStore } from "~/store/cardStore";
import { useNewCardStore } from "~/store/newCardStore";

export function useCurrentCard(): {
  fetchCards: (id: number, label: string) => Promise<void>;
} {
  const { $api } = useNuxtApp();
  const {setCurrentLabel, setCurrentCard, setCurrentId, resetCurrentCard} = useCardStore();
  const { resetCard } = useNewCardStore();

  const fetchCards = async (id: number) => {
    try {
      const response: { data: { 
        label: string,
        fields: Field[] } } = await $api(
        `v1/cards/${id}`
      );

      //Reset the current card and new card store
      resetCurrentCard();
      resetCard();

      //Setting new card store data
      setCurrentLabel(response.data.label)
      setCurrentCard(response.data.fields);
      setCurrentId(id);

    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return {
    fetchCards,
  };
}
