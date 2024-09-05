<script setup lang="ts">
import { ref } from 'vue';
import { useNewCardStore } from '~/store/newCardStore';

const { addOrUpdateBusinessField, businessField, deleteField } = useNewCardStore();

const props = defineProps<{
    buttonText?: string[];
    edit_data: boolean;
    id?: number | null;
    type: string
}>();

const currentField = findFieldById(businessField, props.id ?? null);

const title = ref<string>(props.edit_data ? currentField?.title ?? '' : '');
const url = ref<string>(props.edit_data ? currentField?.url ?? '' : '');

const saveField = () => {
    addOrUpdateBusinessField({
        id: props.id ?? null,
        title: title.value,
        url: url.value,
        type: props.type,
    });
    closeModal();
};

const emit = defineEmits(["update:open"]);

const closeModal = () => {
    emit("update:open", false);
};

const onDeleteField = () => {
    deleteField("businessField", props.id ?? null);
    closeModal();
};
</script>

<template>
    <div class="flex flex-col gap-4">

        <FloatingLabelInput v-model="url" label="URL" input-name="URL" placeholder="URL" input-type="text"
            class="w-full" />

        <FloatingLabelInput v-model="title" label="Title" input-name="Title" placeholder="Title" input-type="text"
            class="w-full" />

        <Suggestion v-if="props.buttonText" :current="title" title="Here are some suggestions for your title:"
            @update:label="title = $event" :buttonText="props.buttonText" />
    </div>
    <ModalFooterButton :-on-cancel="closeModal" :-on-delete="onDeleteField" :edit_data="props.edit_data"
        :-on-save="saveField" />
</template>
