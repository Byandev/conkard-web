<script lang="ts" setup>
import { reactive } from "vue";
import { useNewCardStore } from "~/store/newCardStore";

interface AccreditationInterface {
  id: number;
  value: string[];
}

const { addAccreditationField, accreditationField } = useNewCardStore();

let idCounter = 0;
const accreditations: AccreditationInterface[] = reactive<AccreditationInterface[]>([
  ...accreditationField as AccreditationInterface[],
  { id: idCounter++, value: [""] },
]);

function handleInput(index: number, value: string) {
  accreditations[index].value = [value];
  const lastValue = accreditations[accreditations.length - 1].value[0];
  if (lastValue !== "") {
    accreditations.push({ id: idCounter++, value: [""] });
  }
}

function removeInput(index: number) {
  if (accreditations.length > 1) {
    accreditations.splice(index, 1);
  }
}

const saveAccreditationFields = () => {
  console.log("Final accreditations:", accreditations);
  const validAccreditations = accreditations.filter(
    (accreditation) => accreditation.value[0] !== "",
  );
  const accreditationFields = validAccreditations.map((accreditation) => ({
    id: accreditation.id,
    value: accreditation.value,
  }));
  addAccreditationField(accreditationFields);
  closeModal();
};

const emit = defineEmits(["update:open"]);

const closeModal = () => {
  emit("update:open", false);
};
</script>

<template>
  <div class="flex flex-col gap-4">
    <div v-for="(accreditation, index) in accreditations" :key="accreditation.id" class="flex items-center gap-2">
      <FloatingLabelInput
v-model="accreditation.value[0]" :label="`Accreditation ${index + 1}`"
        :input-name="`accreditation-${index}`" placeholder="Accreditation" input-type="text" class="w-full"
        :floating-label="accreditation.value[0] !== ''"
        @input="(event: Event) => handleInput(index, (event.target as HTMLInputElement).value)" />
      <button class="text-red-500" @click="removeInput(index)">X</button>
    </div>
    <div class="bg-gray-50 px-4 py-3 sm:flex sm:flex-row justify-end">
      <button
ref="cancelButtonRef" type="button"
        class="mt-3 p-4 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
        @click="closeModal">
        Cancel
      </button>
      <button
type="button"
        class="inline-flex w-full justify-center rounded-md bg-gray-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-500 sm:ml-3 sm:w-auto"
        @click="saveAccreditationFields">
        Save
      </button>
    </div>
  </div>
</template>