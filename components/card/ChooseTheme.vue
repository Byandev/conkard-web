<script setup lang="ts">
import { ref } from 'vue';
import type { Theme} from '~/types/data/Theme';
import { themes } from '~/types/data/Theme';
import { useCardStore } from '~/store/cardStore.js';

const { setSelectedColor } = useCardStore();

const selectedThemeId = ref<number | null>(1);

const selectTheme = (theme: Theme) => {
    selectedThemeId.value = theme.id;
    setSelectedColor(theme.color);
};

onMounted(() => {
    setSelectedColor(themes[0].color);
});
</script>

<template>
    <div>
        <h2 class="text-xl font-medium leading-6 text-gray-900">Choose a Theme</h2>
        <div class="grid grid-cols-12 gap-1">
            <div
v-for="theme in themes" :key="theme.id"
                :class="['mt-5 w-6 h-6 cursor-pointer rounded-lg', { 'ring-2 ring-offset-2 ring-blue-500': theme.id === selectedThemeId }]"
                :style="{ backgroundColor: theme.color }" @click="selectTheme(theme)" />
        </div>
    </div>
</template>