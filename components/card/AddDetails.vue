<script setup lang="ts">
import { useNewCardStore } from '~/store/newCardStore';
import type { FieldType } from '~/types/models/FieldType';
import { computed } from 'vue';

const newCardStore = useNewCardStore();

const props = defineProps<{
    fieldTypes: FieldType[];
}>();

const { nameField, jobField, departmentField, companyNameField } = storeToRefs(newCardStore);

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
            return nameField.value !== null;
        case 'Job Title':
            return jobField.value !== null;
        case 'Department':
            return departmentField.value !== null;
        case 'Company Name':
            return companyNameField.value !== null;
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
    }, {} as Record<string, FieldType[]>);
});
</script>

<template>
    <CardTitle forId="add-details" text="Add your details" />
    <div v-for="(fieldTypes, category) in groupedFieldTypes" :key="category" class="mt-5">
        <CardSubtitle :forId="`add-details-${category}`" :text="category" />
        <div class="mt-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
            <IconTitle v-for="(fieldType, index) in fieldTypes" :key="index"
                class="disabled:opacity-40 disabled:cursor-not-allowed" @click="updateTitle(fieldType.name)"
                foreground="gray" background="gray" :icon_url="fieldType.icon_url" :text="fieldType.name"
                :disabled="isFieldDisabled(fieldType.name)" />
        </div>
    </div>
</template>