<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useNewCardStore } from '~/store/newCardStore';
import { computed } from 'vue';

interface PhoneData {
    id: number;
    value: string;
    label: string;
}

const phoneData = useNewCardStore();
const { phoneField } = storeToRefs(phoneData);

const props = defineProps<{
    id: number;
}>();

const filteredPhone = computed<PhoneData>(() => {
    const phone = phoneField.value.find(phone => phone.id === props.id);
    if (phone && phone.id !== null) {
        return phone as PhoneData;
    }
    return {
        id: -1,
        value: '',
        label: ''
    };
});

</script>

<template>
    <div class="flex flex-row items-center gap-3">
        <div class="flex items-center justify-center w-11 h-11 bg-red-500 rounded-full">
            <Icon
name="ic:baseline-phone" :class="[
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
                    {{ filteredPhone?.value }}
                </h1>
            </div>
            <div>
                <h1 class="text-1xl font-normal text-black">
                    {{ filteredPhone?.label }}
                </h1>
            </div>
        </div>
    </div>
</template>