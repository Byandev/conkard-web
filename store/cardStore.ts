import { defineStore } from "pinia";
import { reactive, ref, toRefs } from "vue";
import type { Field } from "~/types/models/Card";

export interface CardFields {
  label: string;
  image: {
    type: string;
  image: File;
  };
  fields: Field[];
}

export const useCardStore = defineStore("card", () => {
  const state = reactive({
    currentCard: [] as Field[],
    currentId: undefined as number | undefined,
    currentLabel: '',
    isLoading: true,
  });

  const initialState = {
    label: null as CardFields["label"] | null,
    imageFields: [] as CardFields["image"][],
    personalFields: [] as CardFields["fields"][],
    generalFields: [] as CardFields["fields"][],
    socialFields: [] as CardFields["fields"][],
    messagingFields: [] as CardFields["fields"][],
    businessFields: [] as CardFields["fields"][],
  };

  const fields = {
    label: ref(initialState.label),
    imageFields: ref(initialState.imageFields),
    personalFields: ref(initialState.personalFields),
    generalFields: ref(initialState.generalFields),
    socialFields: ref(initialState.socialFields),
    messagingFields: ref(initialState.messagingFields),
    businessFields: ref(initialState.businessFields),
  };

  const addField = <T>(field: keyof typeof fields, value: T) => {
    if (Array.isArray(fields[field].value)) {
      (fields[field].value as T[]).push(value);
    } else {
      (fields[field] as Ref<T>).value = value;
    }
  };

  const setCurrentId = (id: number) => {
    state.currentId = id;
  };

  const setCurrentCard = (fields: Field[]) => {
    state.currentCard = fields;
  };

  const setLoading = (isLoading: boolean) => {
    state.isLoading = isLoading;
  };

  const setCurrentLabel = (label: string) => {
    state.currentLabel = label;
  };

  const resetCurrentCard = () => {
    state.currentCard = [];
    state.currentId = undefined;
    state.currentLabel = '';
  };

  return {
    ...toRefs(state),
    ...fields,
    addField,
    setCurrentId,
    setCurrentCard,
    setLoading,
    setCurrentLabel,
    resetCurrentCard,
  };
});