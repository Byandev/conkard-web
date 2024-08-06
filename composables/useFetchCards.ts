import { ref, onMounted } from "vue";
import type { Card } from "~/types/models/Card"; // Adjust the import path as necessary

export function useFetchCards() {
  const cards = ref<Card[]>([]);
  const { $api } = useNuxtApp();

  const fetchData = async () => {
    try {
      const response: { data: Card[] } = await $api("v1/cards");
      cards.value = response.data;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  onMounted(() => {
    fetchData();
  });

  return {
    cards,
  };
}
