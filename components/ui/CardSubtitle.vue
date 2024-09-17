<script setup lang="ts">
defineProps<{
    forId: string;
    text: string;
}>();
</script>

<template>
    <label :for="forId" class=" text-base font-medium leading-6 text-gray-900">{{ text }}</label>
</template>