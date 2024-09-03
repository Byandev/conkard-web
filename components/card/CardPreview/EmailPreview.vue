<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useNewCardStore } from '~/store/newCardStore';

const emailData = useNewCardStore();

const { emailField } = storeToRefs(emailData);

defineProps<{
    id: number;
}>();

</script>

<template>
    <div class="flex flex-row items-center gap-3">
        <div class="flex items-center justify-center w-11 h-11 bg-red-500 rounded-full">
            <Icon name="uiw:mail" :class="[
                `text-white`,
                `group-hover:text-red`,
                'text-center',
                'h-7',
                'w-7',
                'shrink-0'
            ]" aria-hidden="true" />
        </div>
        <div class="flex flex-col">
            <div>
                <h1 class="text-1xl font-semibold text-black">
                    {{ emailField?.[id]?.value }}
                </h1>
            </div>
            <div>
                <h1 class="text-1xl font-normal text-black">
                    {{ emailField?.[id]?.label }}
                </h1>
            </div>
        </div>
    </div>
</template>