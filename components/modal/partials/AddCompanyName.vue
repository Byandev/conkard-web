<script setup lang="ts">
import { ref } from 'vue';
import { useNewCardStore } from "~/store/newCardStore";

const { addCompanyNameField, companyNameField } = useNewCardStore();

let companyName = ref(companyNameField?.company_name || '');

const saveCompanyNameFields = () => {
    const newCompanyNameField = {
        company_name: companyName.value,
    };
    addCompanyNameField(newCompanyNameField);
    closeModal();
};

const emit = defineEmits(['update:open']);

const closeModal = () => {
    emit('update:open', false);
};
</script>

<template>
    <FloatingLabelTextarea v-model="companyName" label="Company Name" input-name="companyName"
        placeholder="Company Name" input-type="text" class="w-full" />
    <div class="bg-gray-50 px-4 py-3 sm:flex sm:flex-row justify-end">
        <button type="button"
            class="mt-3 p-4 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
            @click="closeModal" ref="cancelButtonRef">Cancel</button>
        <button type="button"
            class="inline-flex  w-full justify-center rounded-md bg-gray-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-500 sm:ml-3 sm:w-auto"
            @click="saveCompanyNameFields">Save</button>
    </div>
</template>