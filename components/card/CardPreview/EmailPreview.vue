<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useNewCardStore } from '~/store/newCardStore';
import { computed } from 'vue';

interface EmailData {
    id: number;
    value: string;
    label: string;
}

const emailData = useNewCardStore();
const { emailField } = storeToRefs(emailData);

const props = defineProps<{
    id: number;
}>();

const filteredEmail = computed<EmailData>(() => {
    const email = emailField.value.find(email => email.id === props.id);
    if (email && email.id !== null) {
        return email as EmailData;
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
                    {{ filteredEmail.value }}
                </h1>
            </div>
            <div>
                <h1 class="text-1xl font-normal text-black">
                    {{ filteredEmail.label }}
                </h1>
            </div>
        </div>
    </div>
</template>