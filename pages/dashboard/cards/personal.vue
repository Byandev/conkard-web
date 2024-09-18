<script setup lang="ts">
import { useFetchFields } from "~/composables/useFetchField";
import { useCurrentCard } from "~/composables/useCurrentCard";
import { useCardStore } from "~/store/cardStore";

definePageMeta({
  layout: "dashboard-layout",
});

const { cards } = useFetchFields();
const { fetchCards } = useCurrentCard();
const { setLoading } = useCardStore();
const { currentCard } = storeToRefs(useCardStore());

const handleCurrentCard = async (id: number, label: string) => {
  try {
    setLoading(true)
    await fetchCards(id, label)
  } catch (error) {
    console.log(error)
  } finally {
    setLoading(false)
  }
}

</script>

<template>
  <div class="h-full">
    <div class="flex flex-col md:flex-row h-full gap-3">
      <section class="flex flex-col gap-7 w-full md:w-auto">
        <section class="flex flex-row items-start justify-start md:justify-start gap-2 mt-10">
          <h1 class="text-3xl font-normal">Cards</h1>
          <CardDropdown />
        </section>
        <div class="flex flex-col gap-3 justify-start items-start">
          <div v-for="card in cards" :key="card.id"
            class="px-10 py-2 hover:cursor-pointer hover:bg-gray-100 rounded-md w-full md:w-auto">
            <h2 class="text-lg font-medium whitespace-nowrap" @click="handleCurrentCard(card.id, card.label)">
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

<style scoped="true"></style>
