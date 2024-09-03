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
  job: {
    job_title: string;
  };
  department: {
    department_name: string;
  };
  company: {
    company_name: string;
  };
  accreditation: {
    id: number;
    value: string[];
  };
  headline: {
    headline: string;
  };
  general: {
    email: {
      id: number | null;
      value: string;
      label: string;
    };
  };
}

export const useNewCardStore = defineStore("newCard", () => {
  const fields = {
    nameField: ref<CardFields["name"]>(),
    jobField: ref<CardFields["job"]>(),
    departmentField: ref<CardFields["department"]>(),
    companyNameField: ref<CardFields["company"]>(),
    accreditationField: ref<CardFields["accreditation"][]>([]),
    headlineField: ref<CardFields["headline"]>(),
    emailField: ref<CardFields["general"]["email"][]>([]),
  };

  let emailIdCounter = 0; // Counter for email IDs

  const addField = <T>(field: keyof typeof fields, value: T) => {
    console.log(`Setting ${field}:`, value);
    (fields[field] as any).value = value;
  };

  const addOrUpdateEmailField = (value: CardFields["general"]["email"]) => {
    const existingEmailIndex = fields.emailField.value.findIndex(
      (email) => email.id === value.id
    );

    if (existingEmailIndex !== -1) {
      // Update existing email
      fields.emailField.value[existingEmailIndex] = value;
    } else {
      // Add new email
      const newEmail = {
        ...value,
        id: emailIdCounter++, // Increment the counter for each new email
      };
      fields.emailField.value.push(newEmail);
    }
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
    addOrUpdateEmailField,
  };
});
