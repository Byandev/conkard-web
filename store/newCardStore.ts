import { defineStore } from "pinia";

export interface CardFields {
  label: string;
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
    id: number | null;
    title: string;
    url: string;
    type: string;
    value: string;
    label: string;
  };
  socials: {
    id: number | null;
    title: string;
    url: string;
    username: string;
    type: string;
  };
  messaging: {
    id: number | null;
    title: string;
    url: string;
    username: string;
    type: string;
    value: string;
  };
  business: {
    id: number | null;
    title: string;
    url: string;
    username: string;
    type: string;
  };
  payment: {
    id: number | null;
    title: string;
    url: string;
    username: string;
    type: string;
  };
}

export const useNewCardStore = defineStore("newCard", () => {
  const fields = {
    label: ref<CardFields["label"] | null>(null),
    nameField: ref<CardFields["personal"]["name"] | null>(null),
    jobField: ref<CardFields["personal"]["job"] | null>(null),
    departmentField: ref<CardFields["personal"]["department"] | null>(null),
    companyNameField: ref<CardFields["personal"]["company"] | null>(null),
    accreditationField: ref<CardFields["personal"]["accreditation"][]>([]),
    headlineField: ref<CardFields["personal"]["headline"] | null>(null),
    generalField: ref<CardFields["general"][]>([]),
    socialField: ref<CardFields["socials"][]>([]),
    messagingField: ref<CardFields["messaging"][]>([]),
    businessField: ref<CardFields["business"][]>([]),
    paymentField: ref<CardFields["payment"][]>([]),
  };

  let uniqueId = 0;

  const addField = <T>(field: keyof typeof fields, value: T) => {
    (fields[field] as any).value = value;
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

  return {
    ...fields,
    addLabel: (value: CardFields["label"]) => addField("label", value),
    addNameField: (value: CardFields["personal"]["name"]) =>
      addField("nameField", value),
    addJobField: (value: CardFields["personal"]["job"]) =>
      addField("jobField", value),
    addDepartmentField: (value: CardFields["personal"]["department"]) =>
      addField("departmentField", value),
    addCompanyNameField: (value: CardFields["personal"]["company"]) =>
      addField("companyNameField", value),
    addAccreditationField: (value: CardFields["personal"]["accreditation"][]) =>
      addField("accreditationField", value),
    addHeadlineField: (value: CardFields["personal"]["headline"]) =>
      addField("headlineField", value),
    addOrUpdateGeneralField: (value: CardFields["general"]) =>
      addOrUpdateField("generalField", value),
    addOrUpdateSocialField: (value: CardFields["socials"]) =>
      addOrUpdateField("socialField", value),
    addOrUpdateMessagingField: (value: CardFields["messaging"]) =>
      addOrUpdateField("messagingField", value),
    addOrUpdateBusinessField: (value: CardFields["business"]) =>
      addOrUpdateField("businessField", value),
    addOrUpdatePaymentField: (value: CardFields["payment"]) =>
      addOrUpdateField("paymentField", value),
    deleteField,
  };
});
