<script setup lang="ts">
import { ref } from 'vue';

interface Input {
    label: string;
    name: string;
    value: string;
}

const dynamicInputs = ref<Input[]>([
    { label: 'Prefix', name: 'prefix', value: '' },
    { label: 'Preferred name', name: 'preferred-name', value: '' },
    { label: 'Middle name', name: 'middle-name', value: '' },
    { label: 'Suffix', name: 'suffix', value: '' },
    { label: 'Pronoun', name: 'pronoun', value: '' }
]);
const addedInputs = ref<Input[]>([]);

const addInput = (input: Input) => {
    if (!addedInputs.value.some(i => i.name === input.name)) {
        addedInputs.value.push({ ...input });
    }
};

const firstName = ref<string>('');
const lastName = ref<string>('');
</script>

<template>
    <div class="flex flex-col gap-5">
        <!-- Content -->
        <FloatingLabelInput :value="firstName" label="First name" input-name="first-name" placeholder="First name"
            input-type="text" />
        <FloatingLabelInput :value="lastName" label="Last name" input-name="last-name" placeholder="Last name"
            input-type="text" />
        <div v-for="(input, index) in addedInputs" :key="index" class="flex items-center w-full">
            <FloatingLabelInput :value="input.value" :label="input.label" :input-name="input.name"
                :placeholder="input.label" input-type="text" class="w-full" />
        </div>
        <div class="flex flex-wrap gap-2">
            <button v-for="(input, index) in dynamicInputs" :key="index" @click="addInput(input)"
                class="gap-2 rounded-xl inline-flex justify-center bg-white border-2 px-3 py-2 text-sm font-semibold text-black shadow-sm hover:bg-gray-100">
                <Icon name="lucide:plus" class="h-5 w-5 text-black" />
                Add {{ input.label }}
            </button>
        </div>
    </div>
</template>