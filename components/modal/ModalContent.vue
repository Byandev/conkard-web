<script setup lang="ts">
import { useFieldTypeStore } from '~/store/fieldTypeStore';
import { computed } from 'vue';

const props = defineProps<{
  name: string;
}>();

const { fieldTypes } = storeToRefs(useFieldTypeStore());

console.log(fieldTypes);

const matchedFieldType = computed(() => {
  const matchedField = fieldTypes.value.find(field => field.name === props.name);
  return matchedField && matchedField.suggested_labels
    ? matchedField.suggested_labels.split(', ').join(', ')
    : '';
});

</script>

<template>
  <AddField
    :name="props.name"
    :suggested-labels="matchedFieldType" 
  />
</template>