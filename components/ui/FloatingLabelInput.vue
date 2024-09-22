<script setup lang="ts">
defineProps<{
  modelValue: string;
  label: string;
  inputName: string;
  placeholder: string;
  inputType: string;
}>();
const emit = defineEmits(["update:modelValue"]);
</script>
<template>
  <div class="relative">
    <label
:for="inputName"
      class="absolute -top-2 left-2 inline-block bg-white px-1 text-xs font-medium text-gray-900">{{ label }}</label>
    <input
:id="inputName" :type="inputType" :name="inputName" :value="modelValue"
      class="block w-full rounded-md border-0 py-4 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
      :placeholder="placeholder" @input="(event) => {
        const target = event.target as HTMLInputElement;
        if (target) {
          emit('update:modelValue', target.value);
        }
      }
        " >
  </div>
</template>