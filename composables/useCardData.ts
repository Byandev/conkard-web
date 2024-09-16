// composables/useCardData.ts
import { computed, onMounted } from "vue";
import { storeToRefs } from "pinia";
import { useNewCardStore } from "~/store/newCardStore";
import { useFetchFieldTypes } from "~/composables/useFetchFieldTypes";
import type { Type } from "~/types/models/Card";

export function useCardData() {
  const newCard = useNewCardStore();
  const { fetchData, fieldTypes } = useFetchFieldTypes();

  onMounted(async () => {
    await fetchData();
  });

  const {
    nameField,
    label,
    jobField,
    departmentField,
    companyNameField,
    generalField,
    socialField,
    messagingField,
    businessField,
  } = storeToRefs(newCard);

  const getFieldTypesId = (name: string) => {
    const fieldType = fieldTypes.value.find(
      (fieldType: Type) => fieldType.name === name
    );
    return fieldType ? fieldType.id : null;
  };

  const isNotEmpty = (value: any) =>
    value !== null && value !== undefined && value !== "";

  const mapFields = (fields: any[], name: string, keys: string[]) =>
    fields
      .filter(
        (field: any) => field.name === name && keys.every((key) => field[key])
      )
      .map((field: any) => ({
        type_id: getFieldTypesId(name) ?? 0,
        ...keys.reduce((acc, key) => ({ ...acc, [key]: field[key] }), {}),
      }));

  const cardData = computed(() => {
    const personalField = [
      {
        type_id: getFieldTypesId("Name"),
        value: [
          nameField.value?.prefix,
          nameField.value?.first_name,
          nameField.value?.preferred_name,
          nameField.value?.middle_name,
          nameField.value?.last_name,
          nameField.value?.suffix,
          nameField.value?.maiden_name,
          nameField.value?.pronoun,
        ]
          .filter(Boolean)
          .join(" "),
      },
      {
        type_id: getFieldTypesId("Job Title"),
        value: jobField.value?.value,
      },
      {
        type_id: getFieldTypesId("Department"),
        value: departmentField.value?.value,
      },
      {
        type_id: getFieldTypesId("Company Name"),
        value: companyNameField.value?.value,
      },
    ].filter((field) => isNotEmpty(field.value));

    const fields = [
      ...personalField,
      ...mapFields(generalField.value, "Email", ["value", "label"]),
      ...mapFields(generalField.value, "Phone", ["value", "label"]),
      ...mapFields(generalField.value, "Company URL", ["value", "label"]),
      ...mapFields(generalField.value, "Link", ["value", "label"]),
      ...mapFields(generalField.value, "Address", ["value", "label"]),
      ...mapFields(socialField.value, "Facebook", ["value", "label"]),
      ...mapFields(socialField.value, "X", ["value", "label"]),
      ...mapFields(socialField.value, "Instagram", ["value", "label"]),
      ...mapFields(socialField.value, "Threads", ["value", "label"]),
      ...mapFields(socialField.value, "LinkedIn", ["value", "label"]),
      ...mapFields(socialField.value, "Youtube", ["value", "label"]),
      ...mapFields(socialField.value, "Tiktok", ["value", "label"]),
      ...mapFields(socialField.value, "Spotify", ["value", "label"]),
      ...mapFields(messagingField.value, "Skype", ["value", "label"]),
      ...mapFields(messagingField.value, "Telegram", ["value", "label"]), 
      ...mapFields(messagingField.value, "Whatsapp", ["value", "label"]),
      ...mapFields(businessField.value, "Calendly", ["value", "label"]),
    ];

    return {
      label: label.value || "",
      fields,
    };
  });

  return {
    cardData,
  };
}
