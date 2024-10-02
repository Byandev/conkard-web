import { defineStore } from "pinia";
import { ref, reactive, toRefs } from "vue";
import type { Card } from "~/types/models/Card";
import type { CardField } from "~/types/models/CardField";

export const useCardStore = defineStore("card", () => {
  const state = reactive({
    cardId: 0,
    loading: true,
    editing: false,
    modalTitle: '',
    type_id: 0,
    suggestedLabels:'',
    modalOpen: false,
    selectedColor: '',
  });

  

  const cardForm = ref<Partial<Card>>({
    label: '',
    fields: [],
  });

  const addLabel = (label: string) => {
    cardForm.value.label = label;
  };

  const addField = (field: CardField) => {
    cardForm.value.fields?.push(field);
  }

  const deleteField = (id: number) => {
    const fieldIndex = cardForm.value.fields?.findIndex(field => field.id === id);
    if (fieldIndex !== undefined && fieldIndex !== -1) {
      cardForm.value.fields?.splice(fieldIndex, 1);
    } else {
      console.error(`Field with id ${id} not found.`);
    }
  };
  
  const setCardId = (id: number) => {
    state.cardId = id;
  }

  const setSuggestedLabels = (labels: string) => {
    state.suggestedLabels = labels;
  }

  const setLoading = (isLoading: boolean) => {
    state.loading = isLoading;
  };

  const setEditing = (isEditing: boolean) => {
    state.editing = isEditing;
  };

  const setModalTitle = (title: string) => {
    state.modalTitle = title;
  };

  const setTypeId = (id: number) => {
    state.type_id = id;
  }

  const setModalOpen = (isOpen: boolean) => {
    state.modalOpen = isOpen;
  };

  const setSelectedColor = (color: string) => {
    state.selectedColor = color;
  };

  const resetSuggestedLabel = () => {
    state.suggestedLabels = '';
  }

  const resetForm = () => {
    cardForm.value = {
      label: '',
      fields: []
    };
  };

  return {
    ...toRefs(state),
    cardForm,
    addLabel,
    setCardId,
    addField,
    deleteField,
    resetForm,
    resetSuggestedLabel,
    setSuggestedLabels,
    setModalTitle,
    setTypeId,
    setModalOpen,
    setSelectedColor,
    setLoading,
    setEditing,
  };
});