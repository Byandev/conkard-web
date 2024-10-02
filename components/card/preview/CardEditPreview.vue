<script setup lang="ts">
import { useCardStore } from '~/store/cardStore';
import type { CardField } from '~/types/models/CardField';

const { cardForm } = storeToRefs(useCardStore());

const sortedFields = computed(() => {
    if (!cardForm.value) return [];
    return cardForm.value?.fields ? [...cardForm.value.fields].sort((a: CardField, b: CardField) => a.type.order - b.type.order) : [];
});

//Reason for this is to Add margin top and button to separate PERSONAL Fields
const personalFields = computed(() => sortedFields.value.filter(field => field.type.category === 'PERSONAL'));
const otherFields = computed(() => sortedFields.value.filter(field => field.type.category !== 'PERSONAL'));

</script>

<template>
    <div class="grid gap-4">
        <div class="divide-y divide-gray-200 overflow-hidden rounded-xl bg-white shadow">
            <div class="px-4 py-5 h-28 bg-orange-400 flex items-center justify-center">
                <svg
                    class="h-12 w-12 text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
                    fill="currentColor">
                    <path
                        fill-rule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm0-2a6 6 0 100-12 6 6 0 000 12zm0-10a2 2 0 100-4 2 2 0 000 4z"
                        clip-rule="evenodd" />
                </svg>
            </div>
            <div v-if="cardForm" class="px-5 pb-7">
                <!-- Displaying only PERSONAL fields to add margin top and button to separate PERSONAL Fields -->
                <div class="my-10">
                    <div v-for="(field, index) in personalFields" :key="index">
                        <FieldPreview :field="field" :is-clickable="true" />
                    </div>
                </div>

                <!-- Display Fields Except PERSONAL fields -->
                <div v-for="(field, index) in otherFields" :key="index">
                    <FieldPreview :field="field" :is-clickable="true" />
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
@tailwind utilities;
</style>