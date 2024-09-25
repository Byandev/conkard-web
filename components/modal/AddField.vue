<script setup lang="ts">
import { useCardStore } from '~/store/cardStore.js';
import { reactive, toRefs } from 'vue';
import type { Category } from '~/types/enums/CategoryEnum';

const props = defineProps<{
  name: string;
  suggestedLabels: string;
}>();

const cardStore = useCardStore();
const { addField } = cardStore;

const { currentCategory } = storeToRefs(cardStore);

console.log('Current category', currentCategory.value);

const fieldData = reactive({
  value: '',
  title: ''
});

const { value, title } = toRefs(fieldData);

const emit = defineEmits(["update:open"]);

const closeModal = () => {
  emit("update:open", false);
};

const handleSubmit = () => {
  addField(`${currentCategory.value.toLowerCase()}Fields` as Category, {
    type: props.name,
    label: title.value,
    value: value.value,
    category: currentCategory.value
  });
  closeModal();
};

</script>

<template>
  <div class="flex flex-col gap-5 px-4">
    <FloatingLabelInput
      v-model="value" label="Value" input-name="Value" placeholder="Value" input-type="text"
      class="w-full" />
    <FloatingLabelInput
      v-model="title" label="Title" input-name="Title" placeholder="Title" input-type="text"
      class="w-full" />

    <Suggestion
      v-if="props.suggestedLabels" :suggested-labels="props.suggestedLabels" :current="title"
      title="Here are some suggestions for your title:" @update:label="title = $event" />
  </div>

  <div class="flex justify-end gap-3 mt-5 w-full border-t-2">
    <div class="px-4 flex flex-row mt-5 gap-5">
      <Button text="Cancel" background="white" foreground="gray" @click="closeModal" />
      <Button
        text="Save" background="gray" foreground="white"
        @click="handleSubmit" />
    </div>
  </div>
</template>