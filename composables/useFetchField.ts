import { ref, onMounted } from "vue";
import { useCardStore } from "~/store/cardStore";
import type { Card } from "~/types/models/Card";

export function useFetchFields() {
  const cards = ref<Card[]>([]);
  const { $api } = useNuxtApp();
  const { fetchCards } = useCurrentCard();
  const { setLoading } = useCardStore();

  const fetchData = async () => {
    try {
      setLoading(true);
      const response: { data: Card[] } = await $api("v1/cards");
      cards.value = response.data;
      console.log(response);
      if (cards.value.length > 0) {
        await fetchCards(cards.value[0].id, cards.value[0].label);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  onMounted(fetchData);

  return {
    fetchData,
    cards,
  };
}
