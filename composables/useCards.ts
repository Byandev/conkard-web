import { computed, onMounted } from "vue";
import { storeToRefs } from "pinia";
import { useCardStore } from "~/store/cardStore";
import { useCardFieldTypes } from "~/composables/useCardFieldTypes";
import type { Type } from "~/types/models/Card";
import { useFieldTypeStore } from "~/store/fieldTypeStore";

export function useCards() {
  const cardStore = useCardStore();
  const { fieldTypes } = storeToRefs(useFieldTypeStore());
  const { fetchData } = useCardFieldTypes();

  onMounted(async () => await fetchData());

  const { label, personalFields, generalFields, socialFields, messagingFields, businessFields } = storeToRefs(cardStore);

  const getFieldTypesId = (name: string) => fieldTypes.value.find((fieldType: Type) => fieldType.name === name)?.id ?? null;
  const isNotEmpty = (value: any) => value !== null && value !== undefined && value !== "";
  const getValuesByType = (fields: any[], name: string): string => {
    return fields
      .filter((field: any) => field.type === name)
      .map((field: any) => field.value)
      .join(', ');
  };

  const getLabelByType = (fields: any[], name: string): string => {
    return fields
      .filter((field: any) => field.type === name)
      .map((field: any) => field.label)
      .join(', ');
  };



  const cardData = computed(() => {
    const personalField = ["Name", "Job Title", "Department", "Company Name"]
    .map(name => ({ type_id: getFieldTypesId(name), value: getValuesByType(personalFields.value, name) }))
    .filter(field => isNotEmpty(field.value));
  
    const generalField = ["Email", "Phone", "Company URL", "Link", "Address"]
      .map(name => ({
        type_id: getFieldTypesId(name),
        value: getValuesByType(generalFields.value, name),
        label: getLabelByType(generalFields.value, name)
      }))
      .filter(field => isNotEmpty(field.value));
    
    const socialField = ["Facebook", "X", "Instagram", "Threads", "LinkedIn", "Youtube", "Tiktok", "Spotify"]
      .map(name => ({
        type_id: getFieldTypesId(name),
        value: getValuesByType(socialFields.value, name),
        label: getLabelByType(socialFields.value, name)
      }))
      .filter(field => isNotEmpty(field.value));
    
    const messagingField = ["Skype", "Telegram", "Whatsapp"]
      .map(name => ({
        type_id: getFieldTypesId(name),
        value: getValuesByType(messagingFields.value, name),
        label: getLabelByType(messagingFields.value, name)
      }))
      .filter(field => isNotEmpty(field.value));
    
    const businessField = ["Calendly"]
      .map(name => ({
        type_id: getFieldTypesId(name),
        value: getValuesByType(businessFields.value, name),
        label: getLabelByType(businessFields.value, name)
      }))
      .filter(field => isNotEmpty(field.value));

    const fields = [
      ...personalField,
      ...generalField,
      ...socialField,
      ...messagingField,
      ...businessField
    ];

    return { label: label.value || "", fields };
  });

  return { cardData };
}