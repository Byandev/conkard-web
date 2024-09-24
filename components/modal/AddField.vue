<script setup lang="ts">
const props = defineProps<{
  suggestedLabels: string;
  addField: (title: string, value: string) => void;
}>();

const fieldData = reactive({
  value: '',
  title: ''
});

const emit = defineEmits(["update:open"]);

const closeModal = () => {
  emit("update:open", false);
};
</script>

<template>
  <FloatingLabelInput
    v-model="fieldData.value"
    label="Value"
    input-name="Value"
    placeholder="Value"
    input-type="text"
    class="w-full"
  />
  <FloatingLabelInput
    v-model="fieldData.title"
    label="Title"    
    input-name="Title"
    placeholder="Title"
    input-type="text"
    class="w-full"
  />

  <Suggestion
    v-if="props.suggestedLabels"
    :suggested-labels="props.suggestedLabels"
    :current="fieldData.title"
    title="Suggested Labels"
    @update:label="fieldData.title = $event"
  />

  <div class="flex justify-end gap-3 mt-5">
    <button @click="closeModal">Cancel</button>
    <button @click="props.addField(fieldData.title, fieldData.value)">Add Field</button>
  </div>
</template>