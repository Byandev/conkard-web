<script setup lang="ts">
import { useCardStore } from '~/store/cardStore.js';
import { useValidation } from '~/composables/useValidation';
import type { CardField } from '~/types/models/CardField';
import { useFieldTypeStore } from '~/store/fieldTypeStore';

const cardStore = useCardStore();
const { setEditing, setModalOpen, resetSuggestedLabel, addField } = cardStore;
const { editing, suggestedLabels, type_id } = storeToRefs(cardStore);
const { fieldTypes } = storeToRefs(useFieldTypeStore());

const CardForm = ref<Partial<CardField>>({
  type_id: type_id.value,
  value: '',
  label: '',
});

const { formRef, v$ } = useValidation(CardForm, {
  value: { required: true },
  label: { required: false },
});

const closeModal = () => {
  setEditing(false);
  setModalOpen(false);
  resetSuggestedLabel();
};

const handleSubmit = () => {
  v$.value.$touch();
  if (v$.value.$invalid) return;

  const { type_id, value, label } = formRef.value;

  const fieldData: Partial<CardField> = { type_id, value };

  // Find the field type object from the fieldTypes store
  fieldData.type = fieldTypes.value.find((fieldType) => fieldType.id === type_id);

  // If label is not empty, add it to the fieldData object
  if (label) fieldData.label = label;

  addField(fieldData as CardField);
  closeModal();
};
</script>

<template>
  <div class="flex flex-col gap-5 px-4">

    <div class="flex flex-col gap-3">
      <label>Value</label>
      <input v-model="formRef.value" class="w-full p-2 border border-gray-300 rounded-md">
    </div>

    <div v-if="suggestedLabels" class="flex flex-col gap-3">
      <label>Title</label>
      <input v-model="formRef.label" class="w-full p-2 border border-gray-300 rounded-md">
    </div>

    <Suggestion
      v-if="suggestedLabels" :suggested-labels="suggestedLabels" :current="formRef.label"
      title="Here are some suggestions for your title:" @update:label="formRef.label = $event" />
  </div>

  <div class="flex gap-3 w-full" :class="editing ? 'justify-between' : 'justify-end'">
    <ModalFooterButton :has-save="true" lass="mx-5 w-full" :edit-data="editing" @save="handleSubmit" @cancel="closeModal" />
  </div>
</template>