<template>
    <div>
        <h2 class="text-xl font-medium leading-6 text-gray-900 mb-8">Choose a Theme</h2>
        <div class="grid grid-cols-12 gap-2">
            <div v-for="theme in themes" :key="theme.id"
                :class="['w-8 h-8 cursor-pointer rounded-lg', { 'ring-2 ring-offset-2 ring-blue-500': theme.id === selectedThemeId }]"
                :style="{ backgroundColor: theme.color }" @click="selectTheme(theme)">
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const themes = ref([
    { id: 1, name: 'Theme 1', color: '#FF5733' },
    { id: 2, name: 'Theme 2', color: '#33FF57' },
    { id: 3, name: 'Theme 3', color: '#3357FF' },
    { id: 4, name: 'Theme 4', color: '#FF33A1' },
    { id: 5, name: 'Theme 5', color: '#A133FF' },
    { id: 6, name: 'Theme 6', color: '#33FFA1' },
    { id: 7, name: 'Theme 7', color: '#FF5733' },
    { id: 8, name: 'Theme 8', color: '#33FF57' },
    { id: 9, name: 'Theme 9', color: '#3357FF' },
    { id: 10, name: 'Theme 10', color: '#FF33A1' },
    { id: 11, name: 'Theme 11', color: '#FFB533' },
    { id: 12, name: 'Theme 12', color: '#33FFB5' },
    { id: 13, name: 'Theme 13', color: '#B533FF' },
    { id: 14, name: 'Theme 14', color: '#FF33B5' },
    { id: 15, name: 'Theme 15', color: '#33B5FF' },
    // Add more themes as needed
]);
const selectedThemeId = ref<number | null>(null);

const selectTheme = (theme: { id: number, name: string, color: string }) => {
    selectedThemeId.value = theme.id;
    console.log('Selected theme:', theme);
};
</script>