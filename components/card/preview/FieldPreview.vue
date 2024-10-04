<script setup lang="ts">
import type { CardField } from '~/types/models/CardField';

const props = defineProps<{
    field: CardField;
    isClickable?: boolean;
}>();

</script>

<template>
    <div class="flex items-center gap-3">
        <div v-if="field.type.display_icon" class="flex items-center justify-center w-11 h-11 rounded-full">
            <img :src="field.type.icon_url" alt="Image" class="w-11 h-11 rounded-full object-cover">
        </div>
        <div v-if="['Company URL', 'Link', 'Calendly'].includes(field.type.name)" class="flex flex-col">
            <h1 class="text-xl font-normal text-black">
                <template v-if="props.isClickable">
                    <a :href="field.value" target="_blank" rel="noopener noreferrer">{{ field.label }}</a>
                </template>
                <template v-else>
                    {{ field.label }}
                </template>
            </h1>
        </div>
        <div v-else class="flex flex-col">
            <h1 
                :class="[
                'text-black',
                field.type.category === 'PERSONAL' ? 'text-2xl' : 'text-lg',
                field.type.name === 'Name' ? 'font-bold' : 'font-normal']">
                {{ field.value }}
            </h1>
            <h1 class="text-base font-normal text-black">{{ field.label }}</h1>
        </div>
    </div>
</template>