<script setup lang="ts">
import { computed } from 'vue';
import type { Type } from '~/types/models/Card';

const props = defineProps<{
  modalTitle: string;
  isEdit: boolean;
  id?: number;
  fieldTypes: Type[];
}>();

const emit = defineEmits(["update:open"]);

const closeModal = () => {
  emit("update:open", false);
};

// Group fieldTypes by category
const groupedFieldTypes = computed(() => {
  return props.fieldTypes.reduce((acc, fieldType) => {
    if (!acc[fieldType.category]) {
      acc[fieldType.category] = [];
    }
    acc[fieldType.category].push(fieldType);
    return acc;
  }, {} as Record<string, Type[]>);
});

// Check if modalTitle matches any PERSONAL category field type
const personalFieldType = computed(() => {
  return props.fieldTypes.find(fieldType => fieldType.category === 'PERSONAL' && fieldType.name === props.modalTitle);
});
</script>

<template>
  <div>
    <AddName v-if="personalFieldType && personalFieldType.name === 'Name'" @update:open="closeModal" />
    <AddJobTitle v-else-if="personalFieldType && personalFieldType.name === 'Job Title'" @update:open="closeModal" />
    <AddDepartment v-else-if="personalFieldType && personalFieldType.name === 'Department'" @update:open="closeModal" />
    <AddCompanyName v-else-if="personalFieldType && personalFieldType.name === 'Company Name'" @update:open="closeModal" />

    <div v-for="(fieldTypesItem, category) in groupedFieldTypes" :key="category">
      <template v-for="(fieldType, index) in fieldTypesItem" :key="index">
        <!-- General category -->
        <AddGeneral
          v-if="modalTitle === fieldType.name && category === 'GENERAL'" :id="id" :edit-data="isEdit"
          :field-label="fieldType.name" :name="fieldType.name" :suggested-labels="fieldType.suggested_labels"
          @update:open="closeModal" />
        <!-- Socials category -->
        <AddSocials
          v-if="modalTitle === fieldType.name && category === 'SOCIAL'" :id="id" :edit-data="isEdit"
          :suggested-labels="fieldType.suggested_labels" :name="fieldType.name" @update:open="closeModal" />
        <!-- Messaging category -->
        <AddMessaging
          v-if="modalTitle === fieldType.name && category === 'MESSAGING'" :id="id" :edit-data="isEdit"
          :suggested-labels="fieldType.suggested_labels" :name="fieldType.name" @update:open="closeModal" />
        <!-- Business category -->
        <AddBusiness
          v-if="modalTitle === fieldType.name && category === 'BUSINESS'" :id="id" :edit-data="isEdit"
          :suggested-labels="fieldType.suggested_labels" :name="fieldType.name" @update:open="closeModal" />
        <!-- Others category -->
        <AddGeneral
          v-if="modalTitle === fieldType.name && category === 'OTHERS'" :id="id" :edit-data="isEdit"
          :field-label="fieldType.name" :name="fieldType.name" :suggested-labels="fieldType.suggested_labels"
          @update:open="closeModal" />
      </template>
    </div>
  </div>
</template>