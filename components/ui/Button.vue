<script setup lang="ts">
const props = withDefaults(defineProps<{
    text: string;
    background: string;
    foreground: string;
    type?: 'button' | 'submit' | 'reset';
    isLoading?: boolean;
    isWide?: boolean;
}>(), {
    type: 'button',
    isWide: false,
});
</script>

<template>
    <button
:type="props.type" :class="[
        `flex justify-center rounded-lg bg-${props.background}-700 flex gap-2 items-center px-5 border-2 py-2 text-sm font-semibold text-${props.foreground} shadow-sm`,
        `hover:bg-${props.background}-500`,
        `${props.isWide ? 'w-full' : ''}`,
        `focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-${props.background}-700`,
        props.isLoading ? 'opacity-50 cursor-not-allowed' : ''
    ]" :disabled="props.isLoading">
        <span>{{ props.text }}</span>
        <svg
v-if="props.isLoading" class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg"
            fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
            <path
class="opacity-75" fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
        </svg>
    </button>
</template>