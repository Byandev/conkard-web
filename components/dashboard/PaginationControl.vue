<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';

const props = defineProps<{
    currentPage: number;
    totalPages: number;
}>();

const _emit = defineEmits(['prevPage', 'nextPage']);
</script>

<template>
    <div class="flex justify-between items-center mt-4">
        <button
            :disabled="props.currentPage === 1"
            class="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
            @click="_emit('prevPage')">
            Previous
        </button>
        <span class="text-gray-700 font-semibold">Page {{ props.currentPage }} of {{ props.totalPages }}</span>
        <button
            :disabled="props.currentPage === props.totalPages"
            class="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
            @click="_emit('nextPage')">
            Next
        </button>
    </div>
</template>

<style scoped>
@tailwind utilities;
</style>