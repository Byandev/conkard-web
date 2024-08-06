<script setup lang="ts">
const props = defineProps<{
    label: string;
    inputName: string;
    placeholder: string;
    inputType: string;
}>();
</script>

<template>
    <div>
        <label :for="props.inputName" class="block text-xl mb-10 font-medium leading-6 text-gray-900">{{ props.label
            }}</label>
        <div>
            <input :type="props.inputType" :name="props.inputName" :id="props.inputName"
                class="block w-full rounded-md border-0 py-1.5 h-14 text-gray-900 shadow-sm ring-2 ring-inset ring-gray-400 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6"
                :placeholder="props.placeholder" />
        </div>
    </div>
</template>