<script setup lang="ts">
const props = defineProps<{
    text: string;
    icon: any;
    foreground: string;
    background: string;
}>();
</script>

<template>
    <button type="button" :class="[`bg-${props.background}-50`]"
        class=" whitespace-nowrap px-7 py-5 border text-sm border-gray-300 rounded-xl flex flex-col items-center">
        <component :is="props.icon" :class="[
            `text-${props.foreground}-400`,
            `group-hover:text-${props.foreground}`,
            'text-center',
            'h-5',
            'w-5',
            'shrink-0'
        ]" aria-hidden="true" />
        {{ props.text }}
    </button>
</template>