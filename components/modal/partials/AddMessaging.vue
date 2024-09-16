<script setup lang="ts">
import { required } from '@vuelidate/validators';
import { ref, computed } from 'vue';
import { useNewCardStore } from '~/store/newCardStore';

const { addOrUpdateMessagingField, messagingField, deleteField } = useNewCardStore();

const props = defineProps<{
    suggestedLabels?: string | null;
    editData: boolean;
    id?: number | null;
    name: string
}>();

const currentField = findFieldById(messagingField, props.id ?? null);

interface MessagingFormInterface {
    value: string;
    label: string;
}

const MessagingForm = ref<MessagingFormInterface>({
    value: props.editData ? currentField?.value ?? '' : '',
    label: props.editData ? currentField?.label ?? '' : '',
});

const MessagingRules = computed(() => {
    const rules: any = {
       value:  {},
       label: {},
    };

    if (['Whatsapp', 'Signal'].includes(props.name)) {
        rules.value = { required };
    } else if (props.name === 'Discord') {
        rules.value = { required };
    } else if (['Skype', 'Telegram'].includes(props.name)) {
        rules.value = { required };
    }

    if (['Whatsapp', 'Skype', 'Signal', 'Discord', 'Telegram'].includes(props.name)) {
        rules.label = { required };
    }

    return rules;
});

const { v$ } = useValidation(MessagingForm, MessagingRules);

const saveField = () => {
    console.log(props.name);
    console.log(MessagingForm.value);
    v$.value.$touch();
    if (v$.value.$invalid) return;

    console.log(MessagingForm.value.value);

    addOrUpdateMessagingField({
        id: props.id ?? null,
        name: props.name,
        value: MessagingForm.value.value,
        label: MessagingForm.value.label,
    });
    closeModal();
};

const emit = defineEmits(["update:open"]);

const closeModal = () => {
    emit("update:open", false);
};

const onDeleteField = () => {
    deleteField("messagingField", props.id ?? null);
    closeModal();
};
</script>

<template>
    <div class="flex flex-col gap-4">
        <FloatingLabelInput
            v-if="['Whatsapp', 'Signal'].includes(props.name)" v-model="MessagingForm.value"
            label="Value" input-name="Value" placeholder="Value" input-type="text" class="w-full" />
        <span v-if="v$.value.$error && ['Whatsapp', 'Signal'].includes(props.name)" class="text-red-900 text-sm">
            {{ v$.value.$errors[0].$message }}
        </span>

        <FloatingLabelInput
            v-if="props.name === 'Discord'" v-model="MessagingForm.value" label="URL" input-name="URL"
            placeholder="URL" input-type="text" class="w-full" />
        <span v-if="v$.value.$error && props.name === 'Discord'" class="text-red-900 text-sm">
            {{ v$.value.$errors[0].$message }}
        </span>

        <FloatingLabelInput
            v-if="['Skype', 'Telegram'].includes(props.name)" v-model="MessagingForm.value"
            label="Username" input-name="Username" placeholder="Username" input-type="text" class="w-full" />
        <span v-if="v$.value.$error && ['Skype', 'Telegram'].includes(props.name)" class="text-red-900 text-sm">
            {{ v$.value.$errors[0].$message }}
        </span>

        <FloatingLabelInput
            v-if="['Whatsapp', 'Signal', 'Skype', 'Discord', 'Telegram'].includes(props.name)"
            v-model="MessagingForm.label" label="Title" input-name="Title" placeholder="Title" input-type="text"
            class="w-full" />
        <span
            v-if="v$.label.$error && ['Whatsapp', 'Signal', 'Skype', 'Discord', 'Telegram'].includes(props.name)"
            class="text-red-900 text-sm">
            {{ v$.label.$errors[0].$message }}
        </span>

        <Suggestion
            v-if="props.suggestedLabels" :current="MessagingForm.label"
            title="Here are some suggestions for your title:" :suggested-labels="props.suggestedLabels"
            @update:label="MessagingForm.label = $event" />
    </div>
    <ModalFooterButton
        :on-cancel="closeModal" :on-delete="onDeleteField" :edit_data="props.editData"
        :on-save="saveField" />
</template>