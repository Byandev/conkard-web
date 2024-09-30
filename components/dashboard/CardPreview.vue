<script setup lang="ts">
import { useCards } from '~/composables/useCards';
import type { Card } from '~/types/models/Card';
import type { CardField } from '~/types/models/CardField';
import { useFieldTypeStore } from '~/store/fieldTypeStore';

const props = defineProps<{
  cardId: number;
}>();

const cardDetails = ref<Card>();

const { fetchCardDetails, getFieldByCategory } = useCards();
const { fetchFieldTypes } = useFieldTypeStore();
const { fieldTypeCategory } = storeToRefs(useFieldTypeStore());

onMounted(async () => {
  if (props.cardId) {
    await fetchFieldTypes();
    cardDetails.value = await fetchCardDetails(props.cardId);
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
      <div v-if="!cardDetails" class="animate-pulse px-5 my-7">
        <div class="h-6 bg-gray-200 rounded w-3/4 mb-4" />
        <div class="h-6 bg-gray-200 rounded w-1/2 mb-4" />
        <div class="h-6 bg-gray-200 rounded w-1/4 mb-4" />
      </div>
      <div v-else class="px-5 pb-7 animate-fade-in">
        <div v-for="(category, index) in fieldTypeCategory" :key="index">
          <div v-if="index == 0">
            <FieldSection
              v-for="(field) in getFieldByCategory(category, cardDetails?.fields as CardField[])"
              :key="field.id" :is-view="false" :field="field" :keys="['value']" />
          </div>
          <div v-for="(item) in getFieldByCategory(category, cardDetails?.fields as CardField[])" v-else :key="item.id">
            <ContactPreview 
              :id="item.id ?? 0" :is-clickable="true" class="mt-5" :color="'#FFA500'"
              :value="item.value ?? ''" :label="item.label ?? ''" :name="item.name ?? ''" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@tailwind utilities;
</style>