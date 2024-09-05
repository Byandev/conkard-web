<script setup lang="ts">
import { ref } from 'vue';
import { useNewCardStore } from '~/store/newCardStore';

const { addOrUpdateGeneralField, generalField, deleteField } = useNewCardStore();

const props = defineProps<{
    buttonText?: string[];
    edit_data: boolean;
    id?: number | null;
    type: string
}>();

const currentField = findFieldById(generalField, props.id ?? null);

const title = ref<string>(props.edit_data ? currentField?.title ?? '' : '');
const url = ref<string>(props.edit_data ? currentField?.url ?? '' : '');
const value = ref<string>(props.edit_data ? currentField?.value ?? '' : '');
const label = ref<string>(props.edit_data ? currentField?.label ?? '' : '');

const suggestionUpdate = (selected: string) => {
    props.type == 'Company URL' ? title.value = selected : label.value = selected;
}

const selectedSuggestion = computed(() => {
    return props.type == 'Company URL' ? title.value : label.value;
})


const saveField = () => {
    addOrUpdateGeneralField({
        label: label.value,
        value: value.value,
        id: props.id ?? null,
        url: url.value,
        title: title.value,
        type: props.type
    });
    closeModal();
};

const emit = defineEmits(["update:open"]);

const closeModal = () => {
    emit("update:open", false);
};

const onDeleteField = () => {
    deleteField("generalField", props.id ?? null);
    closeModal();
};
</script>

<template>
    <div class="flex flex-col gap-4">
        <FloatingLabelInput v-if="props.type == 'Email' || props.type == 'Phone' || props.type == 'Address'"
            v-model="value" label="Value" input-name="Value" placeholder="Value" input-type="text" class="w-full" />

        <FloatingLabelInput v-if="props.type == 'Email' || props.type == 'Phone' || props.type == 'Address'"
            v-model="label" label="Label (Optional)" input-name="field-label" placeholder="Label (Optional)"
            input-type="text" class="w-full" />

        <FloatingLabelInput v-if="props.type == 'url' || props.type == 'Link' || props.type == 'Company URL'"
            v-model="url" label="URL" input-name="URL" placeholder="URL" input-type="text" class="w-full" />

        <FloatingLabelInput v-if="props.type == 'Link' || props.type == 'Company URL'" v-model="title" label="Title"
            input-name="Title" placeholder="Title" input-type="text" class="w-full" />

        <Suggestion v-if="props.buttonText" :current="selectedSuggestion"
            title="Here are some suggestions for your label:" @update:label="suggestionUpdate($event)"
            :buttonText="props.buttonText" />
    </div>
    <ModalFooterButton :-on-cancel="closeModal" :-on-delete="onDeleteField" :edit_data="props.edit_data"
        :-on-save="saveField" />
</template>
