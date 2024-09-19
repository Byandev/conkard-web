<script setup lang="ts">
import { useFetchFields } from "~/composables/useFetchField";
import { useCurrentCard } from "~/composables/useCurrentCard";
import { useCardStore } from "~/store/cardStore";
import { storeToRefs } from "pinia";

definePageMeta({
  layout: "dashboard-layout",
});

const { cards } = useFetchFields();
const { fetchCards } = useCurrentCard();
const { setLoading } = useCardStore();
const { isLoading } = storeToRefs(useCardStore());
const { currentCard, currentId } = storeToRefs(useCardStore());

const handleCurrentCard = async (id: number, label: string) => {
  try {
    setLoading(true);
    await fetchCards(id, label);
  } catch (error) {
    console.log(error);
  } finally {
    setLoading(false);
  }
};
</script>

<template>
  <div class="h-full">
    <div class="flex flex-col md:flex-row h-full gap-3">
      <section class="flex flex-col gap-7 w-full md:w-auto">
        <section class="flex flex-row items-center justify-center md:justify-start gap-2 mt-10">
          <h2 class="font-normal">Cards</h2>
          <CardDropdown />
        </section>
        <div class="flex flex-col gap-3 justify-start items-start w-full">
          <div v-if="isLoading && cards.length == 0" class="animate-pulse px-5 w-[265px]">
            <div class="h-10 bg-gray-200 rounded w-full mb-4" />
            <div class="h-10 bg-gray-200 rounded w-full mb-4" />
            <div class="h-10 bg-gray-200 rounded w-full mb-4" />
          </div>
          <div v-else v-for="card in cards" :key="card.id"
            class="px-10 py-2 hover:cursor-pointer hover:bg-gray-100 rounded-md w-full"
            :class="currentId === card.id ? 'bg-gray-200' : ''">
            <h2 class="text-lg text-start font-normal whitespace-nowrap"
              @click="handleCurrentCard(card.id, card.label)">
              {{ card.label }}
            </h2>
          </div>
        </div>
      </section>
      <div class="p-4 md:p-10 w-full">
        <Tabs />
        <section class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
          <DashboardCard v-if="currentCard.length > 0" :current-card="currentCard" class="m-6 w-full md:w-96" />
        </section>
      </div>
    </div>
  </div>
</template>

<style scoped>
:root {
  --base-font-size: 16px;
}

h1 {
  font-size: 2rem;
  /* 32px */
}

h2 {
  font-size: 1.5rem;
  /* 24px */
}

.text-lg {
  font-size: 1.125rem;
  /* 18px */
}

.text-3xl {
  font-size: 1.875rem;
  /* 30px */
}

.font-normal {
  font-weight: 400;
}

.font-medium {
  font-weight: 500;
}

.whitespace-nowrap {
  white-space: nowrap;
}

.hover\:bg-gray-100:hover {
  background-color: #f7fafc;
}

.bg-gray-200 {
  background-color: #edf2f7;
}

.hover\:cursor-pointer:hover {
  cursor: pointer;
}

.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

@keyframes pulse {

  0%,
  100% {
    opacity: 1;
  }

  50% {
    opacity: 0.5;
  }
}
</style>