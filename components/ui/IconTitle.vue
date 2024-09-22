<script setup lang="ts">
const props = defineProps<{
    text: string;
    icon_url: any;
    foreground: string;
    background: string;
}>();
</script>

<template>
    <button
type="button" :class="[`bg-${props.background}-100`]"
        class=" whitespace-nowrap p-1 border text-xs border-gray-300 rounded-xl flex flex-col items-center">
        <img
:src="props.icon_url" :class="[
            `text-${props.foreground}-900`,
            `group-hover:text-${props.foreground}`,
            'text-center',
            'h-8',
            'w-8',
            'shrink-0',
            'mb-2'
        ]" aria-hidden="true" >
        {{ props.text }}
    </button>
</template>