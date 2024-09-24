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
  const mapFields = (fields: any[], name: string, keys: string[]) =>
    fields.filter((field: any) => field.name === name && keys.every((key) => field[key]))
          .map((field: any) => ({ type_id: getFieldTypesId(name) ?? 0, ...keys.reduce((acc, key) => ({ ...acc, [key]: field[key] }), {}) }));
  const getValuesByType = (fields: any[], name: string) => fields.filter((field: any) => field.type?.name === name).map((field: any) => field.value);

  const cardData = computed(() => {
    const personalField = ["Name", "Job Title", "Department", "Company Name"]
      .map(name => ({ type_id: getFieldTypesId(name), value: getValuesByType(personalFields.value, name) }))
      .filter(field => isNotEmpty(field.value));

    const fields = [
      ...personalField,
      ...["Email", "Phone", "Company URL", "Link", "Address"].flatMap(name => mapFields(generalFields.value, name, ["value", "label"])),
      ...["Facebook", "X", "Instagram", "Threads", "LinkedIn", "Youtube", "Tiktok", "Spotify"].flatMap(name => mapFields(socialFields.value, name, ["value", "label"])),
      ...["Skype", "Telegram", "Whatsapp"].flatMap(name => mapFields(messagingFields.value, name, ["value", "label"])),
      ...mapFields(businessFields.value, "Calendly", ["value", "label"])
    ];

    return { label: label.value || "", fields };
  });

  return { cardData };
}