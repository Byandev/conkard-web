import { defineStore } from "pinia";
import { reactive, toRefs } from "vue";
import type { Card } from "~/types/models/Card";

export const useStateStore = defineStore("store", () => {
  const state = reactive({
    Card: {} as Card,
    cardId: undefined as number | undefined,
    fieldId: undefined as number | undefined,
    category: '',
    label: '',
    loading: true,
    editing: false,
    modalTitle: '',
    modalOpen: false,
    selectedColor: '',
  });

  const setCard = (card: Card) => {
    state.Card = card;
  }

  const setCardId = (id: number) => {
    state.cardId = id;
  };

  const setFieldId = (id: number) => {
    state.fieldId = id;
  };

  const setCategory = (category: string) => {
    state.category = category;
  };

  const setLoading = (isLoading: boolean) => {
    state.loading = isLoading;
  };

  const setEditing = (isEditing: boolean) => {
    state.editing = isEditing;
  };

  const setLabel = (label: string) => {
    state.label = label;
  };

  const setModalTitle = (title: string) => {
    state.modalTitle = title;
  };

  const setModalOpen = (isOpen: boolean) => {
    state.modalOpen = isOpen;
  };

  const setSelectedColor = (color: string) => {
    state.selectedColor = color;
  };

  const resetCardFields = () => {
    state.cardId = undefined;
    state.label = '';
  };

  return {
    ...toRefs(state),
    setCard,
    setCardId,
    setFieldId,
    setCategory,
    setModalTitle,
    setModalOpen,
    setSelectedColor,
    setLoading,
    setEditing,
    setLabel,
    resetCardFields,
  };
});