<script setup lang="ts">
import { ref } from 'vue';
import { useNewCardStore } from '~/store/newCardStore';

const { addOrUpdateMessagingField, messagingField, deleteField } = useNewCardStore();

const props = defineProps<{
    buttonText?: string[];
    edit_data: boolean;
    id?: number | null;
    type: string
}>();

const currentField = findFieldById(messagingField, props.id ?? null);

const title = ref<string>(props.edit_data ? currentField?.title ?? '' : '');
const url = ref<string>(props.edit_data ? currentField?.url ?? '' : '');
const username = ref<string>(props.edit_data ? currentField?.username ?? '' : '');
const value = ref<string>(props.edit_data ? currentField?.value ?? '' : '');

const saveField = () => {
    addOrUpdateMessagingField({
        id: props.id ?? null,
        title: title.value,
        url: url.value,
        username: username.value,
        type: props.type,
        value: value.value,

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
        <FloatingLabelInput v-if="props.type == 'WhatsApp' || props.type == 'Signal'" v-model="value" label="Value"
            input-name="Value" placeholder="Value" input-type="text" class="w-full" />

        <FloatingLabelInput v-if="props.type == 'Discord'" v-model="url" label="URL" input-name="URL" placeholder="URL"
            input-type="text" class="w-full" />

        <FloatingLabelInput v-if="props.type == 'Skype' || props.type == 'Telegram'" v-model="username" label="Username"
            input-name="Username" placeholder="Username" input-type="text" class="w-full" />

        <FloatingLabelInput
            v-if="props.type == 'WhatsApp' || props.type == 'Signal' || props.type == 'Discord' || props.type == 'Telegram'"
            v-model="title" label="Title" input-name="Title" placeholder="Title" input-type="text" class="w-full" />

        <Suggestion v-if="props.buttonText" :current="title" title="Here are some suggestions for your title:"
            @update:label="title = $event" :buttonText="props.buttonText" />
    </div>
    <ModalFooterButton :-on-cancel="closeModal" :-on-delete="onDeleteField" :edit_data="props.edit_data"
        :-on-save="saveField" />
</template>
