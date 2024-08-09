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
        <CardTitle forId="props.inputName" :text="props.label" />
        <div>
            <input :type="props.inputType" :name="props.inputName" :id="props.inputName"
                class="mt-5 block w-full rounded-md border-0 py-1.5 h-14 text-gray-900 shadow-sm ring-2 ring-inset ring-gray-100 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6"
                :placeholder="props.placeholder" />
        </div>
    </div>
</template>