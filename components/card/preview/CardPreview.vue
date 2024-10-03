<script setup lang="ts">
import { useCards } from '~/composables/useCards';
import type { Card } from '~/types/models/Card';
import type { CardField } from '~/types/models/CardField';

const props = defineProps<{
  cardId: number;
}>();

const cardDetails = ref<Card>();

const { fetchCard } = useCards();

const sortedFields = computed(() => {
  if (!cardDetails.value) return [];
  return [...cardDetails.value.fields].sort((a: CardField, b: CardField) => a.type.order - b.type.order);
});


//Reason for this is to Add margin top and button to separate PERSONAL Fields
const personalFields = computed(() => sortedFields.value.filter(field => field.type.category === 'PERSONAL'));
const otherFields = computed(() => sortedFields.value.filter(field => field.type.category !== 'PERSONAL'));

onMounted(async () => {
  if (props.cardId) {
    cardDetails.value = await fetchCard(props.cardId); 
  }
});
</script>

<template>
  <div class="grid gap-4">
    <div class="divide-y divide-gray-200 overflow-hidden rounded-xl bg-white shadow">
      <div class="px-4 py-5 h-28 bg-orange-400 flex items-center justify-center">
        <svg class="h-12 w-12 text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
          <path
            fill-rule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zm0-2a6 6 0 100-12 6 6 0 000 12zm0-10a2 2 0 100-4 2 2 0 000 4z"
            clip-rule="evenodd" />
        </svg>
      </div>
      <div v-if="cardDetails" class="px-5 pb-7">
        <!-- Displaying only PERSONAL fields to add margin top and button to separate PERSONAL Fields -->
        <div class="my-10">
          <div v-for="(field, index) in personalFields" :key="index">
            <FieldPreview :field="field" :is-clickable="true" />
          </div>
        </div>

        <!-- Display Fields Exept PERSONAL fields -->
        <div v-for="(field, index) in otherFields" :key="index">
          <FieldPreview :field="field" :is-clickable="true" />
        </div>
      </div>
      <div v-else class="px-5 py-7 animate-fade-in">
        <div class="h-6 bg-gray-200 rounded w-3/4 mb-4" />
        <div class="h-6 bg-gray-200 rounded w-1/2 mb-4" />
        <div class="h-6 bg-gray-200 rounded w-1/4 mb-4" />
      </div>
    </div>
  </div>
</template>

<style scoped>
@tailwind utilities;
</style>