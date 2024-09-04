import { defineStore } from "pinia";
import { ref } from "vue";

interface CardFields {
  name: {
    first_name: string;
    last_name: string;
    prefix: string;
    preferred_name: string;
    middle_name: string;
    maiden_name: string;
    suffix: string;
    pronoun: string;
  };
  job: { job_title: string };
  department: { department_name: string };
  company: { company_name: string };
  accreditation: { id: number; value: string[] };
  headline: { headline: string };
  general: {
    email: { id: number | null; value: string; label: string };
    phone: { id: number | null; value: string; label: string };
  };
}

export const useNewCardStore = defineStore("newCard", () => {
  const fields = {
    nameField: ref<CardFields["name"] | null>(null),
    jobField: ref<CardFields["job"] | null>(null),
    departmentField: ref<CardFields["department"] | null>(null),
    companyNameField: ref<CardFields["company"] | null>(null),
    accreditationField: ref<CardFields["accreditation"][]>([]),
    headlineField: ref<CardFields["headline"] | null>(null),
    emailField: ref<CardFields["general"]["email"][]>([]),
    phoneField: ref<CardFields["general"]["phone"][]>([]),
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

  const changeOrder = <T>(
    field: keyof typeof fields,
    currentIndex: number,
    newIndex: number
  ) => {
    const array = fields[field].value as unknown as T[];
    if (
      currentIndex < 0 ||
      currentIndex >= array.length ||
      newIndex < 0 ||
      newIndex >= array.length
    ) {
      console.error("Invalid indices for changing order");
      return;
    }
    const [movedItem] = array.splice(currentIndex, 1);
    array.splice(newIndex, 0, movedItem);
  };

  return {
    ...fields,
    addNameField: (value: CardFields["name"]) => addField("nameField", value),
    addJobField: (value: CardFields["job"]) => addField("jobField", value),
    addDepartmentField: (value: CardFields["department"]) =>
      addField("departmentField", value),
    addCompanyNameField: (value: CardFields["company"]) =>
      addField("companyNameField", value),
    addAccreditationField: (value: CardFields["accreditation"][]) =>
      addField("accreditationField", value),
    addHeadlineField: (value: CardFields["headline"]) =>
      addField("headlineField", value),
    addOrUpdateEmailField: (value: CardFields["general"]["email"]) =>
      addOrUpdateField("emailField", value),
    addOrUpdatePhoneField: (value: CardFields["general"]["phone"]) =>
      addOrUpdateField("phoneField", value),
    changeOrder,
  };
});
