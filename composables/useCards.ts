
import type { Card } from "~/types/models/Card";
import type { CardField } from "~/types/models/CardField";

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
  }

  const getFieldByCategory = computed(() => (category: string, card: CardField[]) => {
    return card
      .filter((field) => field.type.category === category)
      .map((field) => ({
        id: field.id,
        value: field.value,
        label: field.label,
        name: field.type.name,
      }));
  });


  return {
    cards,
    currentPage,
    totalPages,
    fetchCardsPage,
    fetchCardDetails,
    getFieldByCategory,
  };
}