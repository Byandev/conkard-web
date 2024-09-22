<script lang="ts" setup>
const props = defineProps<{
  label: string;
  inputName: string;
  placeholder: string;
  inputType: string;
  modelValue: string | null;
}>();

const emit = defineEmits(["update:modelValue"]);
</script>

<template>
  <div>
    <CardTitle :text="props.label" for-id="props.inputName" />
    <div>
      <input
        :id="props.inputName"
        :name="props.inputName"
        :placeholder="props.placeholder"
        :type="props.inputType"
        :value="props.modelValue"
        class="mt-5 block w-full rounded-md border-0 py-1.5 h-14 text-gray-900 shadow-sm ring-2 ring-inset ring-gray-100 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6"
        @input="
          (event) => {
            const target = event.target as HTMLInputElement;
            if (target) {
              emit('update:modelValue', target.value);
            }
          }
        "
      />
    </div>
  </div>
</template>
