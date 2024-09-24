<script setup lang="ts">
import { useCardStore } from '~/store/cardStore';
import type { Type } from '~/types/models/Card';
import { computed } from 'vue';

const newCardStore = useCardStore();

const props = defineProps<{
    fieldTypes: Type[];
}>();

const { personalFields } = storeToRefs(newCardStore);

const emit = defineEmits(['update:title', 'update:open', 'update:isEdit', 'update:id']);

const updateTitle = (title: string) => {
    console.log('Update Title', title)
    emit('update:title', title);
    emit('update:open', true);
    emit('update:isEdit', false);
    emit('update:id', null);
};

const isFieldDisabled = (fieldName: string) => {
    switch (fieldName) {
        case 'Name':
            return personalFields.value.find((field: any) => field?.type?.name === 'Name') !== undefined;
        case 'Job Title':
            return personalFields.value.find((field: any) => field?.type?.name === 'Job Title') !== undefined;
        case 'Department':
            return personalFields.value.find((field: any) => field?.type?.name === 'Department') !== undefined;
        case 'Company Name':
            return personalFields.value.find((field: any) => field?.type?.name === 'Company Name') !== undefined;
        default:
            return false;
    }
};

const groupedFieldTypes = computed(() => {
    return props.fieldTypes.reduce((acc, fieldType) => {
        if (!acc[fieldType.category]) {
            acc[fieldType.category] = [];
        }
        acc[fieldType.category].push(fieldType);
        return acc;
    }, {} as Record<string, Type[]>);
});

const sentenceCaseCategory = (text: string) => {
    if (!text) return '';
    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
}
</script>

<template>
    <CardTitle for-id="add-details" text="Add your details" />
    <div v-for="(fieldTypes, category) in groupedFieldTypes" :key="category" class="mt-5">
        <CardSubtitle :for-id="`add-details-${category}`" :text="sentenceCaseCategory(category)" />
        <div class="mt-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
            <IconTitle
v-for="(fieldType, index) in fieldTypes" :key="index"
                class="disabled:opacity-40 disabled:cursor-not-allowed" foreground="gray" background="gray"
                :icon_url="fieldType.icon_url" :text="fieldType.name" :disabled="isFieldDisabled(fieldType.name)"
                @click="updateTitle(fieldType.name)" />
        </div>
    </div>
</template>