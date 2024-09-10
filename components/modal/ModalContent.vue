<script setup lang="ts">
import type { FieldType } from '~/types/models/FieldType';

const props = defineProps<{
  modalTitle: string;
  isEdit: boolean;
  id?: number;
  fieldTypes: FieldType[];
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
    // console.log(acc);
    return acc;
  }, {} as Record<string, FieldType[]>);
});

</script>

<template>
  <div>
    <div v-for="(fieldTypes, category) in groupedFieldTypes" :key="category">
      <template v-for="(fieldType) in fieldTypes" :key="fieldType.id">
        <AddName v-if="modalTitle === fieldType.name && category == 'PERSONAL'" @update:open="closeModal" />
        <AddJobTitle v-else-if="modalTitle === fieldType.name && category == 'PERSONAL'" @update:open="closeModal" />
        <AddDepartment v-else-if="modalTitle === fieldType.name && category == 'PERSONAL'" @update:open="closeModal" />
        <AddCompanyName v-else-if="modalTitle === fieldType.name && category == 'PERSONAL'" @update:open="closeModal" />

        <!-- General category -->
        <AddGeneral v-if="modalTitle == fieldType.name && category == 'GENERAL'" :id="id" :edit_data="isEdit"
          :fieldLabel="fieldType.name" :type="fieldType.name" :suggested-labels="fieldType.suggested_labels"
          @update:open="closeModal" />

        <!-- Socials category -->
        <AddSocials v-if="modalTitle == fieldType.name && category == 'SOCIAL'" :id="id" :edit_data="isEdit"
          :suggested-labels="fieldType.suggested_labels" :type="fieldType.name" @update:open="closeModal" />

        <!-- Messaging category -->
        <AddMessaging v-if="modalTitle == fieldType.name && category == 'MESSAGING'" :id="id" :edit_data="isEdit"
          :suggested-labels="fieldType.suggested_labels" :type="fieldType.name" @update:open="closeModal" />

        <!-- Business category -->
        <AddBusiness v-if="modalTitle == fieldType.name && category == 'BUSINESS'" :id="id" :edit_data="isEdit"
          :suggested-labels="fieldType.suggested_labels" :type="fieldType.name" @update:open="closeModal" />

        <!-- Others category -->
        <AddGeneral v-if="modalTitle == fieldType.name && category == 'OTHERS'" :id="id" :edit_data="isEdit"
          :fieldLabel="fieldType.name" :type="fieldType.name" :suggested-labels="fieldType.suggested_labels"
          @update:open="closeModal" />
      </template>
    </div>
  </div>
</template>