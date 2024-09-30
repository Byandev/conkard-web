<script setup lang="ts">
import { defineProps } from 'vue';

const props = defineProps<{
    currentPage: number;
    totalPages: number;
    prevPage: () => void;
    nextPage: () => void;
}>();
</script>

<template>
    <div class="flex justify-between items-center mt-4">
        <button
            :disabled="props.currentPage === 1"
            class="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
            @click="prevPage">
            Previous
        </button>
        <span class="text-gray-700 font-semibold">Page {{ props.currentPage }} of {{ props.totalPages }}</span>
        <button
            :disabled="currentPage === totalPages"
            class="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
            @click="nextPage">
            Next
        </button>
    </div>
</template>

<style scoped>
@tailwind utilities;
</style>