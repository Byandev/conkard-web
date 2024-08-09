<script setup lang="ts">
interface Input {
    label: string;
    name: string;
}

const dynamicInputs = ref<Input[]>([
    { label: 'Prefix', name: 'prefix' },
    { label: 'Preferred name', name: 'preferred-name' },
    { label: 'Middle name', name: 'middle-name' },
    { label: 'Suffix', name: 'suffix' },
    { label: 'Pronoun', name: 'pronoun' }
])
const addedInputs = ref<Input[]>([])



const addInput = (input: Input) => {
    if (!addedInputs.value.some(i => i.name === input.name)) {
        addedInputs.value.push(input)
    }
}

</script>

<template>
    <!-- Content -->
    <FloatingLabelInput label="First name" input-name="first-name" placeholder="First name" input-type="first-name" />
    <FloatingLabelInput label="Last name" input-name="last-name" placeholder="Last name" input-type="last-name" />
    <div v-for="(input, index) in addedInputs" :key="index" class="flex items-center w-full">
        <FloatingLabelInput :label="input.label" :input-name="input.name" :placeholder="input.label" input-type="text"
            class="w-full" />
    </div>
    <div class="flex flex-wrap gap-2">
        <button v-for="(input, index) in dynamicInputs" :key="index" @click="addInput(input)"
            class="gap-2 rounded-xl inline-flex justify-center bg-white border-2 px-3 py-2 text-sm font-semibold text-black shadow-sm hover:bg-gray-400">
            <Icon name="lucide:plus" class="h-5 w-5 text-black" />
            Add {{ input.label }}
        </button>
    </div>
</template>
