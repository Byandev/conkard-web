import { useFieldTypeStore } from "~/store/fieldTypeStore";

export function useCardFieldTypes() {
  const { fieldTypes } = storeToRefs(useFieldTypeStore());


  return { fieldTypes };
}