import { defineStore } from "pinia";
import type { Field } from "~/types/models/Card";

const generateUniqueId = () => {
  return Math.floor(Math.random() * 90) + 10;
};

export interface CardFields {
  label: string;
  image: {
    type: string;
    image: File;
  };
  fields: {
    id?: number;
    type: string;
    title?: string;
    value: string;
    category: string;
  }[];
}

export const useCardStore = defineStore("card", () => {
  const state = reactive({
    currentCard: [] as Field[],
    currentId: undefined as number | undefined,
    currentCategory: '',
    currentFieldId: undefined as number | undefined,
    currentLabel: '',
    isLoading: true,
    isEditing: false,
    modalTitle: '',
    isModalOpen: false,
    selectedColor: '',
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
    const valueWithId = { ...value, id: generateUniqueId() };

    if (fields[field] && Array.isArray(fields[field].value)) {
      (fields[field].value as T[]).push(valueWithId);
    } else if (fields[field]) {
      (fields[field] as Ref<T>).value = value;
    } else {
      console.error(`Field ${field} does not exist in fields object.`);
    }
  };

  const updateField = <T extends { id: number | undefined }>(field: keyof typeof fields, value: T) => {
    if (fields[field] && Array.isArray(fields[field].value)) {
      const fieldArray = fields[field].value as T[];
      const existingFieldIndex = fieldArray.findIndex(item => item.id === value.id);
  
      if (existingFieldIndex !== -1) {
        fieldArray[existingFieldIndex] = { ...fieldArray[existingFieldIndex], ...value };
        console.log("Updated field:", field, value);
      } else {
        console.error(`Field with id ${value.id} does not exist in ${field}.`);
      }
    } else {
      console.error(`Field ${field} does not exist in fields object or is not an array.`);
    }
  };

  const deleteField = (field: keyof typeof fields, id: number) => {
    if (fields[field] && Array.isArray(fields[field].value)) {
      const fieldArray = fields[field].value;
      const index = fieldArray.findIndex((item : any) => item.id === id);

      if (index !== -1) {
        fieldArray.splice(index, 1);
        console.log(`Deleted field with id ${id} from ${field}.`);
      } else {
        console.error(`Field with id ${id} does not exist in ${field}.`);
      }
    } else {
      console.error(`Field ${field} does not exist in fields object or is not an array.`);
    }
  };

  const setCurrentId = (id: number) => {
    state.currentId = id;
  };

  const setCurrentFieldId = (id: number) => {
    state.currentFieldId = id;
  }

  const setCurrentCategory = (category: string) => {
    state.currentCategory = category;
  }

  const setCurrentCard = (fields: Field[]) => {
    state.currentCard = fields;
  };

  const setLoading = (isLoading: boolean) => {
    state.isLoading = isLoading;
  };

  const setEditing = (isEditing: boolean) => {
    console.log("Setting editing:", isEditing);
    state.isEditing = isEditing;
  }

  const setCurrentLabel = (label: string) => {
    state.currentLabel = label;
  };

  const setModalTitle = (title: string) => {
    state.modalTitle = title;
  }

  const setModalOpen = (isOpen: boolean) => {
    console.log("Setting modal open:", isOpen);
    state.isModalOpen = isOpen;
  }

  const setSelectedColor = (color: string) => {
    state.selectedColor = color;
  }

  const resetCurrentCard = () => {
    state.currentCard = [];
    state.currentId = undefined;
    state.currentLabel = '';
  };

  return {
    ...toRefs(state),
    ...fields,
    addField,
    updateField,
    deleteField,
    setCurrentId,
    setCurrentFieldId,
    setCurrentCategory,
    setCurrentCard,
    setModalTitle,
    setModalOpen,
    setSelectedColor,
    setLoading,
    setEditing,
    setCurrentLabel,
    resetCurrentCard,
  };
});