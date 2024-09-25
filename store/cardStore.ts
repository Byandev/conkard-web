import { defineStore } from "pinia";
import type { Field } from "~/types/models/Card";

export interface CardFields {
  label: string;
  image: {
    type: string;
    image: File;
  };
  fields: {
    type: string;
    label: string;
    value: string;
    category: string;
  }[];
}

export const useCardStore = defineStore("card", () => {
  const state = reactive({
    currentCard: [] as Field[],
    currentId: undefined as number | undefined,
    currentCategory: '',
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
    console.log("Adding field:", field, value);
    if (fields[field] && Array.isArray(fields[field].value)) {
      (fields[field].value as T[]).push(value);
    } else if (fields[field]) {
      (fields[field] as Ref<T>).value = value;
    } else {
      console.error(`Field ${field} does not exist in fields object.`);
    }
  };

  const setCurrentId = (id: number) => {
    state.currentId = id;
  };

  const setCurrentCategory = (category: string) => {
    state.currentCategory = category;
  }

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
    setCurrentCategory,
    setCurrentCard,
    setLoading,
    setCurrentLabel,
    resetCurrentCard,
  };
});