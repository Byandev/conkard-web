<script setup lang="ts">
import { required, url as urlValidator } from '@vuelidate/validators';
import { ref, computed } from 'vue';
import { useNewCardStore } from '~/store/newCardStore';

const { addOrUpdatePaymentField, paymentField, deleteField } = useNewCardStore();

const props = defineProps<{
    buttonText?: string[];
    edit_data: boolean;
    id?: number | null;
    type: string
}>();

const currentField = findFieldById(paymentField, props.id ?? null);

interface PaymentFormInterface {
    title: string;
    url: string;
    username: string;
}

const PaymentForm = ref<PaymentFormInterface>({
    title: props.edit_data ? currentField?.title ?? '' : '',
    url: props.edit_data ? currentField?.url ?? '' : '',
    username: props.edit_data ? currentField?.username ?? '' : '',
});

const PaymentRules = computed(() => {
    const rules: any = {
        title: {},
        url: {},
        username: {},
    };

    if (['PayPal', 'Venmo'].includes(props.type)) {
        rules.url = { required, urlValidator };
        rules.title = { required };
    } else if (['Cash App'].includes(props.type)) {
        rules.username = { required };
        rules.title = { required };
    }

    return rules;
});

const { v$ } = useValidation(PaymentForm, PaymentRules);

const saveField = () => {
    v$.value.$touch();
    if (v$.value.$invalid) return;

    addOrUpdatePaymentField({
        id: props.id ?? null,
        title: PaymentForm.value.title,
        url: PaymentForm.value.url,
        type: props.type,
        username: PaymentForm.value.username,
    });
    closeModal();
};

const emit = defineEmits(["update:open"]);

const closeModal = () => {
    emit("update:open", false);
};

const onDeleteField = () => {
    deleteField("paymentField", props.id ?? null);
    closeModal();
};
</script>

<template>
    <form @submit.prevent="saveField">
        <div class="flex flex-col gap-4">
            <FloatingLabelInput
v-if="['PayPal', 'Venmo'].includes(props.type)" v-model="PaymentForm.url" label="URL"
                input-name="URL" placeholder="URL" input-type="text" class="w-full" />
            <span v-if="v$.url.$error && ['PayPal', 'Venmo'].includes(props.type)" class="text-red-900 text-sm">
                {{ v$.url.$errors[0].$message }}
            </span>

            <FloatingLabelInput
v-if="['Cash App'].includes(props.type)" v-model="PaymentForm.username" label="Username"
                input-name="Username" placeholder="Username" input-type="text" class="w-full" />
            <span v-if="v$.username.$error && ['Cash App'].includes(props.type)" class="text-red-900 text-sm">
                {{ v$.username.$errors[0].$message }}
            </span>

            <FloatingLabelInput
v-if="['PayPal', 'Venmo', 'Cash App'].includes(props.type)" v-model="PaymentForm.title"
                label="Title" input-name="Title" placeholder="Title" input-type="text" class="w-full" />
            <span
v-if="v$.title.$error && ['PayPal', 'Venmo', 'Cash App'].includes(props.type)"
                class="text-red-900 text-sm">
                {{ v$.title.$errors[0].$message }}
            </span>



            <Suggestion
v-if="props.buttonText" :current="PaymentForm.title"
                title="Here are some suggestions for your title:" :button-text="props.buttonText"
                @update:label="PaymentForm.title = $event" />
        </div>
        <ModalFooterButton
:-on-cancel="closeModal" :-on-delete="onDeleteField" :edit_data="props.edit_data"
            :-on-save="saveField" />
    </form>
</template>