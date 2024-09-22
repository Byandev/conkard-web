<script setup lang="ts">
import { ref } from "vue";
import { useNewCardStore } from "~/store/newCardStore";

interface Input {
  order: number;
  label: string;
  name: string;
  value: string;
}

console.log('AddName Component')

const { addNameField, nameField } = useNewCardStore();

const dynamicInputs = ref<Input[]>([
  {
    order: 2,
    label: "First name",
    name: "first-name",
    value: nameField?.first_name || "",
  },
  {
    order: 5,
    label: "Last name",
    name: "last-name",
    value: nameField?.last_name || "",
  },
  { order: 1, label: "Prefix", name: "prefix", value: nameField?.prefix || "" },
  {
    order: 3,
    label: "Preferred name",
    name: "preferred-name",
    value: nameField?.preferred_name || "",
  },
  {
    order: 4,
    label: "Middle name",
    name: "middle-name",
    value: nameField?.middle_name || "",
  },
  { order: 6, label: "Suffix", name: "suffix", value: nameField?.suffix || "" },
  {
    order: 7,
    label: "Maiden name",
    name: "maiden-name",
    value: nameField?.maiden_name || "",
  },
  {
    order: 8,
    label: "Pronoun",
    name: "pronoun",
    value: nameField?.pronoun || "",
  },
]);

const addedInputs = ref<Input[]>([]);

// Automatically add inputs from dynamicInputs if they have a value
dynamicInputs.value.forEach((input) => {
  if (input.value) {
    addedInputs.value.push({ ...input });
  } else if (input.name === "first-name" || input.name === "last-name") {
    addedInputs.value.push({ ...input });
  }
});

// Sort addedInputs by order
addedInputs.value.sort((a, b) => a.order - b.order);

const addInput = (input: Input) => {
  if (!addedInputs.value.some((i) => i.name === input.name)) {
    addedInputs.value.push({ ...input });
    // Sort addedInputs by order after adding a new input
    addedInputs.value.sort((a, b) => a.order - b.order);
  }
};

const saveNameFields = () => {
  const nameFields = {
    first_name:
      addedInputs.value.find((input) => input.name === "first-name")?.value ||
      "",
    last_name:
      addedInputs.value.find((input) => input.name === "last-name")?.value ||
      "",
    prefix:
      addedInputs.value.find((input) => input.name === "prefix")?.value || "",
    preferred_name:
      addedInputs.value.find((input) => input.name === "preferred-name")
        ?.value || "",
    middle_name:
      addedInputs.value.find((input) => input.name === "middle-name")?.value ||
      "",
    maiden_name:
      addedInputs.value.find((input) => input.name === "maiden-name")?.value ||
      "",
    suffix:
      addedInputs.value.find((input) => input.name === "suffix")?.value || "",
    pronoun:
      addedInputs.value.find((input) => input.name === "pronoun")?.value || "",
  };
  addNameField(nameFields);
  closeModal();
};

const emit = defineEmits(["update:open"]);

const closeModal = () => {
  emit("update:open", false);
};
</script>

<template>
  <div class="flex flex-col gap-5">
    <!-- Dynamically show added inputs -->
    <div v-for="(input, index) in addedInputs" :key="index" class="flex items-center w-full">
      <FloatingLabelInput
v-model="input.value" :label="input.label" :input-name="input.name" :placeholder="input.label"
        input-type="text" class="w-full" />
    </div>
    <!-- Add buttons for other inputs -->
    <div class="flex flex-wrap gap-2">
      <button
v-for="(input, index) in dynamicInputs.filter(
        (di) => !addedInputs.some((ai) => ai.name === di.name),
      )" :key="index"
        class="gap-2 rounded-xl inline-flex justify-center bg-white border-2 px-3 py-2 text-sm font-semibold text-black shadow-sm hover:bg-gray-100"
        @click="addInput(input)">
        <Icon name="lucide:plus" class="h-5 w-5 text-black" />
        Add {{ input.label }}
      </button>
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
        @click="saveNameFields">
        Save
      </button>
    </div>
  </div>
</template>
