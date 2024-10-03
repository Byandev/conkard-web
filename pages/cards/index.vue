<script setup lang="ts">
import { useCards } from "~/composables/useCards";
import { useCardStore } from "~/store/cardStore";

definePageMeta({
  layout: "dashboard-layout",
});

const { fetchCards, cards} = useCards();
const { loading } = storeToRefs(useCardStore());
const { setLoading } = useCardStore();

onMounted(async () => {
  try {
    setLoading(true);
    await fetchCards();
  } catch (error) {
    console.error(error);
  } finally {
    setLoading(false);
  }
});
</script>

<template>
  <div>
    <div class="h-full animate-fade-in">
      <div class="flex flex-col">
        <div class="flex flex-row items-center justify-center md:justify-start gap-2 mt-5">
          <h1 class="text-2xl font-normal">Cards</h1>
          <Dropdown />
        </div>
        <div class="grid grid-cols-1 gap-3 w-full p-3 rounded-lg">
          <div v-if="loading" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 w-full">
            <div v-for="n in 3" :key="n" class="animate-pulse px-5 w-full">
              <div class="bg-gray-200 rounded w-full h-40 mb-4" /> 
              <div class="bg-gray-200 rounded w-3/4 h-6 mb-4" />
              <div class="bg-gray-200 rounded w-1/2 h-6 mb-4" />
              <div class="bg-gray-200 rounded w-full h-4 mb-2" />
              <div class="bg-gray-200 rounded w-full h-4 mb-2" />
              <div class="bg-gray-200 rounded w-3/4 h-4 mb-2" />
            </div>
          </div>
          <div
            v-else-if="cards && cards.data.length > 0"
            class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 animate-fade-in">
            <CardPreview
              v-for="card in cards.data"
              :key="card.id"
              :card-id="card.id"
              class="transition-transform transform hover:scale-105 hover:shadow-lg"
            />
          </div>
          <div
            v-else
            class="flex flex-col items-center justify-center text-center text-gray-500 w-full p-5 border-2 border-dashed rounded-lg">
            <p class="text-lg font-semibold mb-2">You don't have any cards!</p>
            <p class="mb-4">Click the button below (or the +) to create a personal card.</p>
            <NuxtLink
              to="cards/create"
              class="px-4 py-2 bg-gray-900 text-white rounded hover:bg-blue-600 transition-colors duration-300">
              Create Card
            </NuxtLink>
          </div>
        </div>
        <PaginationControl
          v-if="!loading && (cards.data ?? []).length > 0"
          :current-page="cards.meta.current_page"
          :total-pages="cards.meta.last_page"
          @prev-page="fetchCards(cards.meta.current_page - 1)"
          @next-page="fetchCards(cards.meta.current_page + 1)"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
@tailwind utilities;
</style>