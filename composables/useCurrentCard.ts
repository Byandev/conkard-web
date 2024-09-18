import type { Field } from "~/types/models/Card";
import { useCardStore } from "~/store/cardStore";

export function useCurrentCard(): {
  fetchCards: (id: number, label: string) => Promise<void>;
} {
  const { $api } = useNuxtApp();
  const {setCurrentLabel, setCurrentCard, setCurrentId} = useCardStore();

  const fetchCards = async (id: number, label: string) => {
    try {
      console.log("Fetching data for card with ID:", id);
      const response: { data: { fields: Field[] } } = await $api(
        `v1/cards/${id}`
      );
      const fields: Field[] = response.data.fields;
      setCurrentLabel(label)
      setCurrentCard(fields);
      setCurrentId(id);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return {
    fetchCards,
  };
}
