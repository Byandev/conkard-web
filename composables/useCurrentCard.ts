import type { Field } from "~/types/models/Card";
import { useCardStore } from "~/store/cardStore";

export function useCurrentCard(): {
  fetchData: (id: string) => Promise<void>;
} {
  const { $api } = useNuxtApp();
  const cardStore = useCardStore();

  const fetchData = async (id: string) => {
    try {
      console.log("Fetching data for card with ID:", id);
      const response: { data: { fields: Field[] } } = await $api(
        `v1/cards/${id}`
      );
      const fields: Field[] = response.data.fields;
      cardStore.setCurrentCard(fields);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return {
    fetchData,
  };
}
