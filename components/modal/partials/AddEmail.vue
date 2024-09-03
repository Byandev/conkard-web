<script setup lang="ts">
import { useNewCardStore } from '~/store/newCardStore';
import { ref } from 'vue';

const { addOrUpdateEmailField, emailField } = useNewCardStore();

const props = defineProps<{
    edit_data: boolean;
    id?: number | null;
}>();

console.log(props);

const buttonText = ref<string[]>(['Work', 'Personal']);
const label = ref<string>(props.edit_data ? emailField?.[props.id ?? 0]?.label : '');
const labelValue = ref<string>(props.edit_data ? emailField?.[props.id ?? 0]?.value : '');

const saveEmailField = () => {
    addOrUpdateEmailField({
        label: label.value,
        value: labelValue.value,
        id: props.id ?? null,
    });
    closeModal();
};

const emit = defineEmits(["update:open"]);

const closeModal = () => {
    emit("update:open", false);
};
</script>

<template>
    <div class="flex flex-col gap-4">
        <FloatingLabelInput v-model="labelValue" label="Value" input-name="email-value" placeholder="Value"
            input-type="text" class="w-full" />
        <FloatingLabelInput v-model="label" label="Label (Optional)" input-name="email-label"
            placeholder="Label (Optional)" input-type="text" class="w-full" />
        <Suggestion :current="label" title="Here are some suggestions for your label:" @update:label="label = $event"
            :buttonText="buttonText" />
    </div>
    <div class="bg-gray-50 px-4 py-3 sm:flex sm:flex-row justify-end">
        <button ref="cancelButtonRef" type="button"
            class="mt-3 p-4 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
            @click="closeModal">
            Cancel
        </button>
        <button type="button"
            class="inline-flex w-full justify-center rounded-md bg-gray-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-500 sm:ml-3 sm:w-auto"
            @click="saveEmailField">
            Save
        </button>
    </div>
</template>