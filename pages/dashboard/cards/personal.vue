<script setup lang="ts">
import { useFetchCards } from '~/composables/useFetchCards';
import { useCurrentCard } from '~/composables/useCurrentCard';
import { useCardStore } from '~/store/cardStore';

definePageMeta({
  layout: 'dashboard-layout',
});

var key = '1';
const { cards } = useFetchCards();
const { fetchData } = useCurrentCard();
const cardStore = useCardStore();
const currentCard = cardStore.currentCard;

const getCard = (id: string) => {
  fetchData(id);
  key = key + 1;
};

console.log(currentCard);

</script>

<template>
  <div class="h-full">
    <div class="flex flex-row h-full gap-3">
      <div class="flex flex-col gap-7">
        <div class="flex flex-row items-start justify-start gap-2 mt-10">
          <h1 class="text-3xl font-normal">Cards</h1>
          <Dropdown />
        </div>
        <div class="flex flex-col gap-3 justify-start items-start">
          <div v-for="card in cards" :key="card.id"
            class="px-10 py-2 hover:cursor-pointer hover:bg-gray-100 rounded-md">
            <h2 @click="getCard(card.id.toString())" class="text-lg font-medium whitespace-nowrap">{{ card.label }}
            </h2>
          </div>
        </div>
      </div>
      <div class="p-10 w-full">
        <CardTabs />
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
          <DashboardCard :key="key" :currentCard="currentCard" class="m-6 w-96" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped="true"></style>