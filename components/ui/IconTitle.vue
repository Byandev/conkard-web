<script setup lang="ts">
const props = defineProps<{
    text: string;
    icon: any;
    foreground: string;
    background: string;
}>();
</script>

<template>
    <button type="button" :class="[`bg-${props.background}-100`]"
        class=" whitespace-nowrap p-2 border text-sm border-gray-300 rounded-xl flex flex-col items-center">
        <component :is="props.icon" :class="[
            `text-${props.foreground}-900`,
            `group-hover:text-${props.foreground}`,
            'text-center',
            'h-8',
            'w-8',
            'shrink-0',
            'mb-2'
        ]" aria-hidden="true" />
        {{ props.text }}
    </button>
</template>