import { ref, onMounted } from "vue";
import { useCardStore } from "~/store/cardStore";
import { useFieldTypeStore } from "~/store/fieldTypeStore";
import type { Card, Type } from "~/types/models/Card";

export function useCardFieldTypes() {
  const cards = ref<Card[]>([]);
  const currentPage = ref(1);
  const totalPages = ref(1);
  const { $api } = useNuxtApp();
  const { setFieldTypes } = useFieldTypeStore();
  const { setLoading, setCurrentCard, setCurrentId } = useCardStore();
  const { currentId } = storeToRefs(useCardStore());

  const fetchCards = async (id: number) => {
    try {
      const response: { data: Card } = await $api(`v1/cards/${id}`);
      // Handle the response data as needed
      console.log("Fetched card:", response.data);
      setCurrentCard(response.data.fields);
      setCurrentId(response.data.id);
    } catch (error) {
      console.error("Error fetching card:", error);
    }
  };

  const fetchCardsData = async (page = 1) => {
    try {
      setLoading(true);
      const response: { data: Card[], meta: { current_page: number, last_page: number } } = await $api(`v1/cards?page=${page}`);
      cards.value = response.data;
      currentPage.value = response.meta.current_page;
      totalPages.value = response.meta.last_page;

      if (cards.value.length > 0) {
        await fetchCards(cards.value[0].id);
      } else {
        await fetchCards(currentId.value ?? 0);
      }
    } catch (error) {
      console.error("Error fetching cards data:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchFieldTypesData = async () => {
    try {
      const response: { data: Type[] } = await $api("v1/cards/field-types");
      setFieldTypes(response.data);
      console.log("Success");
    } catch (error) {
      console.error("Error fetching field types data:", error);
    }
  };

  const fetchData = async (page = 1) => {
    await Promise.all([fetchCardsData(page), fetchFieldTypesData()]);
  };

  onMounted(() => {
    fetchData();
  });

  return {
    fetchCards,
    fetchData,
    cards,
    currentPage,
    totalPages,
  };
}