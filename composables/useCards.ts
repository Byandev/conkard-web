import type { Card } from "~/types/models/Card";

export function useCards() {
  const cards = ref<Card[]>();
  const currentPage = ref(1);
  const totalPages = ref(1);
  const { $api } = useNuxtApp();

  const fetchCardsPage = async (page = 1) => {
    try {
      const response: { data: Card[], meta: { current_page: number, last_page: number } } = await $api(`v1/cards?page=${page}`);
      cards.value = response.data;
      currentPage.value = response.meta.current_page;
      totalPages.value = response.meta.last_page;
    } catch (error) {
      console.error("Error fetching cards data:", error);
    }
  };

  const fetchCardDetails = async (id: number) => {
    try {
      const response: { data: Card } = await $api(`v1/cards/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching card data:", error);
    }
  };

  const nextPage = () => {
    if (currentPage.value < totalPages.value) {
      fetchCardsPage(currentPage.value + 1);
    }
  };

  const prevPage = () => {
    if (currentPage.value > 1) {
      fetchCardsPage(currentPage.value - 1);
    }
  };

  return {
    cards,
    currentPage,
    totalPages,
    fetchCardsPage,
    fetchCardDetails,
    nextPage,
    prevPage,
  };
}