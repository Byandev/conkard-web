<template>
    <div>
        <!-- Component content goes here -->
        <p>{{ content }}</p>
    </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';

// Define the props with TypeScript
interface Props {
    content: string;
}

const props = defineProps<Props>();
</script>