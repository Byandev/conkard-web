<script setup lang="ts">
import { useFetchFields } from "~/composables/useFetchField";
import { useCurrentCard } from "~/composables/useCurrentCard";
import { useCardStore } from "~/store/cardStore";
import { storeToRefs } from "pinia";

definePageMeta({
  layout: "dashboard-layout",
});

const { fetchData, cards, currentPage, totalPages } = useFetchFields();
const { fetchCards } = useCurrentCard();
const { setLoading } = useCardStore();
const { isLoading } = storeToRefs(useCardStore());
const { currentCard, currentId } = storeToRefs(useCardStore());

const handleCurrentCard = async (id: number) => {
  try {
    setLoading(true);
    await fetchCards(id);
  } catch (error) {
    console.log(error);
  } finally {
    setLoading(false);
  }
};

onMounted(() => {
  if (!currentId.value) {
    fetchData();
  }
});
</script>

<template>
  <div>
    <div class="h-full animate-fade-in">
      <div class="flex flex-col md:flex-row h-full gap-3">
        <section class="flex flex-col gap-7 w-full md:w-auto">
          <section class="flex flex-row items-center justify-center md:justify-start gap-2 mt-10">
            <h1 class="text-2xl font-normal">Cards</h1>
            <CardDropdown />
          </section>
          <div class="flex flex-col gap-3 justify-start items-start w-full border-2 p-3 rounded-lg">
            <div v-if="isLoading && cards.length == 0" class="animate-pulse px-5 w-[235px]">
              <div class="bg-gray-200 rounded w-full h-[28px] mb-4" />
              <div class="bg-gray-200 rounded w-full h-[28px] mb-4" />
              <div class="bg-gray-200 rounded w-full h-[28px] mb-4" />
            </div>
            <div v-else-if="cards.length === 0"
              class="flex flex-col items-center justify-center text-center text-gray-500 w-full p-5 border-2 border-dashed rounded-lg">
              <p class="text-lg font-semibold mb-2">You don't have any cards!</p>
              <p class="mb-4">Click the button below (or the +) to create a personal card.</p>
              <NuxtLink to="/dashboard/cards/new"
                class="px-4 py-2 bg-gray-900 text-white rounded hover:bg-blue-600 transition-colors duration-300">Create
                Card</NuxtLink>

            </div>
            <div v-else class="w-[235px]">
              <div v-for="card in cards" :key="card.id"
                class="w-full px-2 py-2 mb-2 hover:cursor-pointer hover:bg-gray-100 rounded-md transition-all duration-300"
                :class="currentId === card.id ? 'bg-gray-200' : ''">
                <h2 class="text-lg text-start font-normal" @click="handleCurrentCard(card.id)">
                  {{ card.label }}
                </h2>
              </div>
            </div>
          </div>
          <div class="flex justify-center space-x-2">
            <button v-if="cards.length != 0 && totalPages > 1" v-for="page in totalPages" :key="page"
              @click="fetchData(page)"
              :class="['px-4 py-2 rounded-full transition-colors duration-300', { 'bg-gray-300 hover:bg-gray-400': currentPage !== page, 'bg-orange-500 text-white': currentPage === page }]">
              {{ page }}
            </button>
          </div>
        </section>
        <div v-if="cards.length != 0" class="p-4 md:p-5 w-full">
          <Tabs class="ml-5" />
          <section class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
            <DashboardCard :current-card="currentCard" class="mt-5 w-full md:w-96 animate-fade-in" />
          </section>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@tailwind utilities;

@layer utilities {
  @keyframes fadeIn {
    from {
      opacity: 0;
    }

    to {
      opacity: 1;
    }
  }

  .animate-fade-in {
    animation: fadeIn 0.5s forwards;
  }
}
</style>