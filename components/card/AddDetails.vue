<script setup lang="ts">
import { useCardStore } from '~/store/cardStore';
import type { Type } from '~/types/models/Card';
import { computed } from 'vue';

const newCardStore = useCardStore();

const props = defineProps<{
    fieldTypes: Type[];
}>();

const { personalFields } = storeToRefs(newCardStore);


const updateTitle = (title: string, category: string) => {
    newCardStore.setCurrentCategory(category);
    newCardStore.setEditing(false);
    newCardStore.setModalTitle(title);
    newCardStore.setModalOpen(true);
};

const isFieldDisabled = (fieldName: string) => {
    switch (fieldName) {
        case 'Name':
            return personalFields.value.find((field: any) => field?.name === 'Name') !== undefined;
        case 'Job Title':
            return personalFields.value.find((field: any) => field?.name === 'Job Title') !== undefined;
        case 'Department':
            return personalFields.value.find((field: any) => field?.name === 'Department') !== undefined;
        case 'Company Name':
            return personalFields.value.find((field: any) => field?.name === 'Company Name') !== undefined;
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
    <div v-for="(fields, category) in groupedFieldTypes" :key="category" class="mt-5">
        <CardSubtitle :for-id="`add-details-${category}`" :text="sentenceCaseCategory(category)" />
        <div class="mt-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
            <IconTitle
                v-for="(fieldType, index) in fields" :key="index"
                class="disabled:cursor-not-allowed" foreground="gray" background="gray"
                :icon_url="fieldType.icon_url" :text="fieldType.name" :disabled="isFieldDisabled(fieldType.name)"
                @click="updateTitle(fieldType.name, fieldType.category)" />
        </div>
    </div>
</template>