import { ref, onMounted } from "vue";
import type { Card } from "~/types/models/Card";

export function useFetchFields() {
  const cards = ref<Card[]>([]);
  const { $api } = useNuxtApp();
  const { fetchCards } = useCurrentCard();

  const fetchData = async () => {
    try {
      const response: { data: Card[] } = await $api("v1/cards");
      cards.value = response.data;
      console.log(response);
      if (cards.value.length > 0) {
        await fetchCards(cards.value[0].id.toString());
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  onMounted(fetchData);

  return {
    fetchData,
    cards,
  };
}
