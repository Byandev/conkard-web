import type { Card } from "~/types/models/Card";
import { initialPaginatedList, type PaginatedList } from "~/types/models/Pagination";

export function useCards() {
  const cards = ref<PaginatedList<Card>>(initialPaginatedList);
  const { $api } = useNuxtApp();

  const fetchCards = async (page = 1) => {
    try {
      const response = await $api(`v1/cards?page=${page}`);
      cards.value = response as PaginatedList<Card>;
    } catch (error) {
      console.error("Error fetching cards data:", error);
    }
  };

  const fetchCard = async (id: number) => {
    try {
      const response: { data: Card } = await $api(`v1/cards/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching card data:", error);
    }
  };

  return {
    cards,
    fetchCards,
    fetchCard,
  };
}