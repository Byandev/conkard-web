<script setup lang="ts">
import { useFieldTypeStore } from '~/store/fieldTypeStore';
import { computed } from 'vue';

const props = defineProps<{
  name: string;
}>();

const { fieldTypes } = useFieldTypeStore();

console.log(fieldTypes);

const matchedFieldType = computed(() => {
  const matchedField = fieldTypes.find(field => field.name === props.name);
  return matchedField && Array.isArray(matchedField.suggested_labels)
    ? matchedField.suggested_labels.join(', ')
    : '';
});

console.log(matchedFieldType.value);

const addField = (title: string, value: string) => {
  console.log(`Title: ${title}, Value: ${value}`);
};

</script>

<template>
  <AddField 
    :add-field="addField" 
    :suggested-labels="matchedFieldType" 
  />
</template>