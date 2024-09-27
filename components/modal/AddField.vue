<script setup lang="ts">
import { useCardStore } from '~/store/cardStore.js';
import type { Category } from '~/types/enums/CategoryEnum';

const props = defineProps<{
  suggestedLabels?: string;
}>();
const label = ref<string>('');
const value = ref<string>('');

const cardStore = useCardStore();
const { addField, setEditing, setModalOpen, updateField, deleteField } = cardStore;

const { currentCategory, isEditing, currentFieldId, personalFields, generalFields, socialFields, messagingFields,businessFields, modalTitle } = storeToRefs(cardStore);

const getFieldData = () => {
  if (isEditing.value) {
    let field: any;
    switch (currentCategory.value) {
      case 'PERSONAL':
        field = personalFields.value.find((f: any) => f.id === currentFieldId.value);
        break;
      case 'GENERAL':
        field = generalFields.value.find((f: any) => f.id === currentFieldId.value);
        break;
      case 'SOCIAL':
        field = socialFields.value.find((f: any) => f.id === currentFieldId.value);
        break;
      case 'MESSAGING':
        field = messagingFields.value.find((f: any) => f.id === currentFieldId.value);
        break;
      case 'BUSINESS':
        field = businessFields.value.find((f: any) => f.id === currentFieldId.value);
        break;
    }

    if (field) {
      value.value = field.value;
      if (field.label) {
        label.value = field.label;
      }
    }
  }
};

const closeModal = () => {
  setEditing(false);
  setModalOpen(false);
};

const handleSubmit = () => {
  const fieldData = {
    ...(isEditing.value && { id: currentFieldId.value ?? 0 }),
    name: modalTitle.value,
    value: value.value,
    category: currentCategory.value,
    ...(currentCategory.value !== 'PERSONAL' && { label: label.value })
  };

  if (!isEditing.value) {
    addField(`${currentCategory.value.toLowerCase()}Fields` as Category, fieldData);
  } else {
    console.log('Updated', fieldData);
    updateField(`${currentCategory.value.toLowerCase()}Fields` as Category, { ...fieldData, id: currentFieldId.value ?? 0 });
  }
  closeModal();
};

onMounted(() => {
  getFieldData();
});

</script>

<template>
  <div class="flex flex-col gap-5 px-4">
    <FloatingLabelInput
      v-model="value" label="Value" input-name="Value" placeholder="Value" input-type="text"
      class="w-full" />
    <FloatingLabelInput
      v-if="currentCategory != 'PERSONAL'" v-model="label" label="Title" input-name="Title"
      placeholder="Title" input-type="text" class="w-full" />

    <Suggestion
      v-if="props.suggestedLabels" :suggested-labels="props.suggestedLabels" :current="label"
      title="Here are some suggestions for your title:" @update:label="label = $event" />
  </div>

  <div class="flex gap-3 w-full" :class="isEditing ? 'justify-between' : 'justify-end'">
    <ModalFooterButton
      class="mx-5 w-full" :edit_data="isEditing" :on-save="handleSubmit"
      :on-delete="() => { deleteField(currentCategory.toLowerCase() + 'Fields' as Category, currentFieldId ?? 0); closeModal() }" :on-cancel="closeModal" />
  </div>
</template>