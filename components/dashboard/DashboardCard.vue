<script setup lang="ts">
import { EnvelopeIcon } from '@heroicons/vue/24/solid';
import type { Field } from '~/types/models/Card';

defineProps<{
    currentCard: Field[] | null;
}>();
</script>

<template>
    <div class="divide-y divide-gray-200 overflow-hidden rounded-xl bg-white shadow max-w-md drop-shadow-xl">
        <div class="px-4 py-5 sm:px-6 h-28 bg-orange-400 flex items-center justify-center">
            <EnvelopeIcon class="text-white h-20 w-20" />
        </div>
        <div class="px-4 py-5 sm:p-6">
            <div v-if="currentCard" class="text-3xl my-7 font-semibold">
                <div v-for="field in currentCard" :key="field.id">
                    <div v-if="field.label">{{ field.label }}: {{ field.value }}</div>
                    <div v-else>{{ field.value }}</div>
                </div>
            </div>
            <div class="flex flex-row items-center gap-5">
                <div class="bg-gray-500 rounded-full p-2 inline-flex items-center justify-center">
                    <EnvelopeIcon class="text-white h-6 w-6" />
                </div>
                <div>
                    kyleanthony47@gmail.com
                </div>
            </div>
        </div>
    </div>
</template>