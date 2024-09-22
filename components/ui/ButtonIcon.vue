<script setup lang="ts">
const props = defineProps<{
    icon: any,
    text: string,
    background: string,
    foreground: string
}>()
</script>

<template>
    <button type="button" :class="[
        `rounded-lg bg-${props.background} flex gap-2 flex-row items-center px-5 border-2 py-2 text-sm font-semibold text-${props.foreground} shadow-sm`,
        `hover:bg-${props.background}`,
        `focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-${props.background}-700`
    ]">
        <component :is="props.icon" :class="[
            `text-${props.foreground}`,
            `group-hover:text-${props.foreground}`,
            'h-5',
            'w-5',
            'shrink-0'
        ]" aria-hidden="true" />
        {{ props.text }}
    </button>
</template>