<script setup lang="ts">
const props = defineProps<{
    text: string;
    background: string;
    foreground: string;
}>();
</script>

<template>
    <button type="button" :class="[
        `rounded-lg bg-${props.background}-700 flex gap-2 items-center px-5 border-2 py-2 text-sm font-semibold text-${props.foreground} shadow-sm`,
        `hover:bg-${props.background}-500`,
        `focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-${props.background}-700`
    ]">
        {{ props.text }}
    </button>
</template>