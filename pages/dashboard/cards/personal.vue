<script setup lang="ts">
import { useFetchFields } from "~/composables/useFetchField";
import { useCurrentCard } from "~/composables/useCurrentCard";
import { useCardStore } from "~/store/cardStore";
import { storeToRefs } from "pinia";

definePageMeta({
  layout: "dashboard-layout",
});

const { cards, fetchData } = useFetchFields();
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

onMounted(fetchData);
</script>

<template>
  <div class="h-full animate-fade-in">
    <div class="flex flex-col md:flex-row h-full gap-3">
      <section class="flex flex-col gap-7 w-full md:w-auto">
        <section class="flex flex-row items-center justify-center md:justify-start gap-2 mt-10">
          <h1 class=" text-2xl font-normal">Cards</h1>
          <CardDropdown />
        </section>
        <div class="flex flex-col gap-3 justify-start items-start w-full">
          <div v-if="isLoading && cards.length == 0" class="animate-pulse px-5 w-[265px]">
            <div class="h-10 bg-gray-200 rounded w-full mb-4" />
            <div class="h-10 bg-gray-200 rounded w-full mb-4" />
            <div class="h-10 bg-gray-200 rounded w-full mb-4" />
          </div>
          <div v-else v-for="card in cards" :key="card.id"
            class="px-2 py-2 hover:cursor-pointer hover:bg-gray-100 rounded-md w-52 transition-all duration-300"
            :class="currentId === card.id ? 'bg-gray-200' : ''">
            <h2 class="text-lg text-start font-normal" @click="handleCurrentCard(card.id)">
              {{ card.label }}
            </h2>
          </div>
        </div>
      </section>
      <div class="p-4 md:p-5 w-full">
        <Tabs class="ml-5" />
        <section class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
          <DashboardCard v-if="currentCard.length > 0" :current-card="currentCard"
            class="mt-5 w-full md:w-96 animate-fade-in" />
        </section>
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