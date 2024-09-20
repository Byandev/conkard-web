import { ref, onMounted } from "vue";
import { useCardStore } from "~/store/cardStore";
import type { Card } from "~/types/models/Card";

export function useFetchFields() {
  const cards = ref<Card[]>([]);
  const currentPage = ref(1);
  const totalPages = ref(1);
  const { $api } = useNuxtApp();
  const { fetchCards } = useCurrentCard();
  const { setLoading } = useCardStore();
  const { currentId } = storeToRefs(useCardStore());

    const fetchData = async (page = 1) => {
    try {
      setLoading(true);
      const response: { data: Card[], meta: { current_page: number, last_page: number } } = await $api(`v1/cards?page=${page}`);
      cards.value = response.data;
      currentPage.value = response.meta.current_page;
      totalPages.value = response.meta.last_page;
  
      if (cards.value.length > 0) {
        await fetchCards(cards.value[0].id);
      }else{
        await fetchCards(currentId.value ?? 0);
      }

      
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  onMounted(() => {
    fetchData();
  });

  return {
    fetchData,
    cards,
    currentPage,
    totalPages,
  };
}