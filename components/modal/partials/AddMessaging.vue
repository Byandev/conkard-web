<script setup lang="ts">
import { required } from '@vuelidate/validators';
import { ref, computed } from 'vue';
import { useNewCardStore } from '~/store/newCardStore';

const { addOrUpdateMessagingField, messagingField, deleteField } = useNewCardStore();

const props = defineProps<{
    buttonText?: string[];
    edit_data: boolean;
    id?: number | null;
    type: string
}>();

const currentField = findFieldById(messagingField, props.id ?? null);

interface MessagingFormInterface {
    title: string;
    url: string;
    username: string;
    value: string;
}

const MessagingForm = ref<MessagingFormInterface>({
    title: props.edit_data ? currentField?.title ?? '' : '',
    url: props.edit_data ? currentField?.url ?? '' : '',
    username: props.edit_data ? currentField?.username ?? '' : '',
    value: props.edit_data ? currentField?.value ?? '' : '',
});

const MessagingRules = computed(() => {
    const rules: any = {
        title: {},
        url: {},
        username: {},
        value: {},
    };

    if (['WhatsApp', 'Signal'].includes(props.type)) {
        rules.value = { required };
    } else if (props.type === 'Discord') {
        rules.url = { required };
    } else if (['Skype', 'Telegram'].includes(props.type)) {
        rules.username = { required };
    }

    if (['WhatsApp', 'Skype', 'Signal', 'Discord', 'Telegram'].includes(props.type)) {
        rules.title = { required };
    }

    return rules;
});

const { v$ } = useValidation(MessagingForm, MessagingRules);

const saveField = () => {
    console.log(props.type);
    v$.value.$touch();
    if (v$.value.$invalid) return;

    addOrUpdateMessagingField({
        id: props.id ?? null,
        title: MessagingForm.value.title,
        url: MessagingForm.value.url,
        username: MessagingForm.value.username,
        type: props.type,
        value: MessagingForm.value.value,
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
        <FloatingLabelInput v-if="['WhatsApp', 'Signal'].includes(props.type)" v-model="MessagingForm.value"
            label="Value" input-name="Value" placeholder="Value" input-type="text" class="w-full" />
        <span class="text-red-900 text-sm" v-if="v$.value.$error && ['WhatsApp', 'Signal'].includes(props.type)">
            {{ v$.value.$errors[0].$message }}
        </span>

        <FloatingLabelInput v-if="props.type === 'Discord'" v-model="MessagingForm.url" label="URL" input-name="URL"
            placeholder="URL" input-type="text" class="w-full" />
        <span class="text-red-900 text-sm" v-if="v$.url.$error && props.type === 'Discord'">
            {{ v$.url.$errors[0].$message }}
        </span>

        <FloatingLabelInput v-if="['Skype', 'Telegram'].includes(props.type)" v-model="MessagingForm.username"
            label="Username" input-name="Username" placeholder="Username" input-type="text" class="w-full" />
        <span class="text-red-900 text-sm" v-if="v$.username.$error && ['Skype', 'Telegram'].includes(props.type)">
            {{ v$.username.$errors[0].$message }}
        </span>

        <FloatingLabelInput v-if="['WhatsApp', 'Signal', 'Skype', 'Discord', 'Telegram'].includes(props.type)"
            v-model="MessagingForm.title" label="Title" input-name="Title" placeholder="Title" input-type="text"
            class="w-full" />
        <span class="text-red-900 text-sm"
            v-if="v$.title.$error && ['WhatsApp', 'Signal', 'Skype', 'Discord', 'Telegram'].includes(props.type)">
            {{ v$.title.$errors[0].$message }}
        </span>

        <Suggestion v-if="props.buttonText" :current="MessagingForm.title"
            title="Here are some suggestions for your title:" @update:label="MessagingForm.title = $event"
            :buttonText="props.buttonText" />
    </div>
    <ModalFooterButton :-on-cancel="closeModal" :-on-delete="onDeleteField" :edit_data="props.edit_data"
        :-on-save="saveField" />
</template>