<script setup lang="ts">
import { defineProps, defineEmits, withDefaults } from 'vue';

const props = withDefaults(
    defineProps<{
        editData: boolean;
        hasSave?: boolean;
    }>(),
    {
        hasSave: true,
    }
);

const _emit = defineEmits(['cancel', 'delete', 'save']);
</script>

<template>
    <div
        class="flex flex-row items-center mt-10 border-t-2"
        :class="props.editData ? 'justify-between' : 'justify-end'">
        <Icon
            v-if="props.editData" name="mdi:delete-outline" class="text-black group-hover:text-red text-center h-7 w-7 shrink-0 hover:cursor-pointer"
            aria-hidden="true"
            @click="_emit('delete')" />

        <div class="bg-gray-50 px-4 py-3 sm:flex sm:flex-row justify-end">
            <button
                ref="cancelButtonRef" type="button"
                class="mt-3 p-4 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                @click="_emit('cancel')">
                {{ !props.hasSave ? 'Close' : 'Cancel' }}
            </button>
            <button
                v-if="props.hasSave" type="submit"
                class="inline-flex w-full justify-center rounded-md bg-gray-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-500 sm:ml-3 sm:w-auto"
                @click="_emit('save')">
                Save
            </button>
        </div>
    </div>
</template>