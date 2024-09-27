<script setup lang="ts">
import { useFieldTypeStore } from '~/store/fieldTypeStore';
import { useCardStore } from '~/store/cardStore';

const { fieldTypes } = storeToRefs(useFieldTypeStore());

const { modalTitle } = storeToRefs(useCardStore());

const matchedFieldType = computed(() => {
  const matchedField = fieldTypes.value.find(field => field.name === modalTitle.value);
  return matchedField && matchedField.suggested_labels
    ? matchedField.suggested_labels.split(', ').join(', ')
  : '';
});

</script>

<template>
  <AddField
    :suggested-labels="matchedFieldType" 
  />
</template>