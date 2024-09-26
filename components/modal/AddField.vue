<script setup lang="ts">
import { useCardStore } from '~/store/cardStore.js';
import type { Category } from '~/types/enums/CategoryEnum';

const props = defineProps<{
  name: string;
  suggestedLabels: string;
}>();

const fieldData = reactive({
  value: '',
  title: ''
});

const { value, title } = toRefs(fieldData);

const cardStore = useCardStore();
const { addField, setEditing, setModalOpen, updateField, deleteField } = cardStore;

const { currentCategory, isEditing, currentFieldId, personalFields, generalFields, socialFields, messagingFields,businessFields, modalTitle } = storeToRefs(cardStore);

const getFieldData = () => {
  if (isEditing.value) {
    if (currentCategory.value === 'PERSONAL') {
      const field = personalFields.value.find(field => field.id === currentFieldId.value);
      fieldData.value = field.value;
    } else if (currentCategory.value === 'GENERAL') {
      const field = generalFields.value.find(field => field.id === currentFieldId.value);
      fieldData.value = field.value;
      fieldData.title = field.label;
    } else if (currentCategory.value === 'SOCIAL') {
      const field = socialFields.value.find(field => field.id === currentFieldId.value);
      fieldData.value = field.value;
      fieldData.title = field.label;
    } else if (currentCategory.value === 'MESSAGING') {
      const field = messagingFields.value.find(field => field.id === currentFieldId.value);
      fieldData.value = field.value;
      fieldData.title = field.label;
    } else if (currentCategory.value === 'BUSINESS') {
      const field = businessFields.value.find(field => field.id === currentFieldId.value);
      fieldData.value = field.value;
      fieldData.title = field.label;
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
    type: modalTitle.value,
    value: value.value,
    category: currentCategory.value,
    ...(currentCategory.value !== 'PERSONAL' && { label: title.value })
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
v-if="currentCategory != 'PERSONAL'" v-model="title" label="Title" input-name="Title"
      placeholder="Title" input-type="text" class="w-full" />

    <Suggestion
v-if="props.suggestedLabels" :suggested-labels="props.suggestedLabels" :current="title"
      title="Here are some suggestions for your title:" @update:label="title = $event" />
  </div>

  <div class="flex gap-3 mt-5 w-full border-t-2" :class="isEditing ? 'justify-between' : 'justify-end'">
    <div v-if="isEditing" class="px-4 flex flex-row mt-5 gap-5">
      <ButtonIconIconify icon="bi:trash" text="Delete" foreground="gray" background="white" @click="{deleteField(currentCategory.toLowerCase() + 'Fields' as Category ,currentFieldId ?? 0); closeModal()}" />
    </div>
    <div class="px-4 flex flex-row mt-5 gap-5">
      <Button text="Cancel" background="white" foreground="gray" @click="closeModal" />
      <Button text="Save" background="gray" foreground="white" @click="handleSubmit" />
    </div>
  </div>
</template>