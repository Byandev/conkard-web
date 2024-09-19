export interface CardFields {
  label: string;
  image: {
    type: string;
    image: File;
  };
  personal: {
    name: {
      prefix: string;
      first_name: string;
      preferred_name: string;
      middle_name: string;
      last_name: string;
      suffix: string;
      maiden_name: string;
      pronoun: string;
    };
    accreditation: { id: number; value: string[] };
    job: { value: string };
    department: { value: string };
    company: { value: string };
    headline: { value: string };
  };
  general: {
    id: number;
    name: string;
    value: string;
    label: string;
  };
  socials: {
    id: number;
    name: string;
    value: string;
    label: string;
  };
  messaging: {
    id: number;
    name: string;
    value: string;
    label: string;
  };
  business: {
    id: number;
    name: string;
    value: string;
    label: string;
  };
}

export const useNewCardStore = defineStore('newCard', () => {
  const initialState = {
    label: null as CardFields['label'] | null,
    nameField: null as CardFields['personal']['name'] | null,
    jobField: null as CardFields['personal']['job'] | null,
    departmentField: null as CardFields['personal']['department'] | null,
    companyNameField: null as CardFields['personal']['company'] | null,
    accreditationField: [] as CardFields['personal']['accreditation'][],
    headlineField: null as CardFields['personal']['headline'] | null,
    generalField: [] as CardFields['general'][],
    socialField: [] as CardFields['socials'][],
    messagingField: [] as CardFields['messaging'][],
    businessField: [] as CardFields['business'][],
    imageField: [] as CardFields['image'][],
  };

  const fields = {
    label: ref(initialState.label),
    nameField: ref(initialState.nameField),
    jobField: ref(initialState.jobField),
    departmentField: ref(initialState.departmentField),
    companyNameField: ref(initialState.companyNameField),
    accreditationField: ref(initialState.accreditationField),
    headlineField: ref(initialState.headlineField),
    generalField: ref(initialState.generalField),
    socialField: ref(initialState.socialField),
    messagingField: ref(initialState.messagingField),
    businessField: ref(initialState.businessField),
    imageField: ref(initialState.imageField),
  };

  let uniqueId = 0;

  const addField = <T>(field: keyof typeof fields, value: T) => {
    (fields[field] as Ref<T>).value = value;
  };

  const addOrUpdateField = <T extends { id: number | null }>(
    field: keyof typeof fields,
    value: T
  ) => {
    const fieldValue = fields[field].value as T[] | null;
    if (!fieldValue) {
      console.error(`Field ${field} is not an array or is undefined`);
      return;
    }

    const existingIndex = fieldValue.findIndex(
      (item: T) => item.id === value.id
    );

    if (existingIndex !== -1) {
      fieldValue[existingIndex] = value;
    } else {
      fieldValue.push({ ...value, id: uniqueId++ });
    }
  };

  const deleteField = <T extends { id: number | null }>(
    field: keyof typeof fields,
    id: number | null
  ) => {
    const fieldValue = fields[field].value as T[] | null;
    if (!fieldValue) {
      console.error(`Field ${field} is not an array or is undefined`);
      return;
    }

    const index = fieldValue.findIndex((item: T) => item.id === id);
    if (index !== -1) {
      fieldValue.splice(index, 1);
    } else {
      console.error(`Item with id ${id} not found in field ${field}`);
    }
  };

  const resetCard = () => {
    fields.label.value = initialState.label;
    fields.nameField.value = initialState.nameField;
    fields.jobField.value = initialState.jobField;
    fields.departmentField.value = initialState.departmentField;
    fields.companyNameField.value = initialState.companyNameField;
    fields.accreditationField.value = [...initialState.accreditationField];
    fields.headlineField.value = initialState.headlineField;
    fields.generalField.value = [...initialState.generalField];
    fields.socialField.value = [...initialState.socialField];
    fields.messagingField.value = [...initialState.messagingField];
    fields.businessField.value = [...initialState.businessField];
    fields.imageField.value = [...initialState.imageField];
  };

  const addImage = (image: CardFields['image']) => {
    fields.imageField.value.push(image);
  };

  return {
    ...fields,
    addLabel: (value: CardFields['label']) => addField('label', value),
    addNameField: (value: CardFields['personal']['name']) =>
      addField('nameField', value),
    addJobField: (value: CardFields['personal']['job']) =>
      addField('jobField', value),
    addDepartmentField: (value: CardFields['personal']['department']) =>
      addField('departmentField', value),
    addCompanyNameField: (value: CardFields['personal']['company']) =>
      addField('companyNameField', value),
    addAccreditationField: (value: CardFields['personal']['accreditation'][]) =>
      addField('accreditationField', value),
    addHeadlineField: (value: CardFields['personal']['headline']) =>
      addField('headlineField', value),
    addOrUpdateGeneralField: (value: CardFields['general']) =>
      addOrUpdateField('generalField', value),
    addOrUpdateSocialField: (value: CardFields['socials']) =>
      addOrUpdateField('socialField', value),
    addOrUpdateMessagingField: (value: CardFields['messaging']) =>
      addOrUpdateField('messagingField', value),
    addOrUpdateBusinessField: (value: CardFields['business']) =>
      addOrUpdateField('businessField', value),
    addImage,
    deleteField,
    resetCard,
  };
});