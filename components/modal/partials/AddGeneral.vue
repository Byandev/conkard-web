<script setup lang="ts">
import { email, required, url } from '@vuelidate/validators';
import { ref, computed } from 'vue';
import { useNewCardStore } from '~/store/newCardStore';

const { addOrUpdateGeneralField, generalField, deleteField } = useNewCardStore();

const props = defineProps<{
    suggestedLabels?: string | null;
    editData: boolean;
    id: number;
    name: string;
}>();

console.log(props.name)

const currentField = findFieldById(generalField, props.id ?? null);

interface GeneralFormInterface {
    value: string;
    label: string;
}

const GeneralForm = ref<GeneralFormInterface>({
    value: props.editData ? currentField?.value ?? '' : '',
    label: props.editData ? currentField?.label ?? '' : ''
});

const GeneralFormRules = computed(() => {
    const rules: any = {
        value: {},
        label: {}
    };

    if (props.name === 'Email') {
        rules.value = { required, email };
        rules.label = { required };
    } else if (props.name === 'Phone' || props.name === 'Address') {
        rules.value = { required };
        rules.label = { required };
    } else if (['url', 'Link', 'Company URL'].includes(props.name)) {
        rules.value = { required, url };
        rules.label = { required };
    }

    return rules;
});

const { v$ } = useValidation(GeneralForm, GeneralFormRules);

const suggestionUpdate = (selected: string) => {
    return GeneralForm.value.label = selected;
}

const selectedSuggestion = computed(() => {
    return GeneralForm.value.label;
});

const saveField = () => {
    v$.value.$touch();
    if (v$.value.$invalid) return;

    addOrUpdateGeneralField({
        label: GeneralForm.value.label,
        value: GeneralForm.value.value,
        id: props.id,
        name: props.name
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
    <div>
        <div class="flex flex-col gap-4">
            <FloatingLabelInput v-if="['Email', 'Phone', 'Address'].includes(props.name)" v-model="GeneralForm.value"
                label="Value" input-name="Value" placeholder="Value" input-type="text" class="w-full" />
            <span v-if="v$.value.$error && ['Email', 'Phone', 'Address'].includes(props.name)"
                class="text-red-900 text-sm">
                {{ v$.value.$errors[0].$message }}
            </span>

            <FloatingLabelInput v-if="['Email', 'Phone', 'Address'].includes(props.name)" v-model="GeneralForm.label"
                label="Label (Optional)" input-name="field-label" placeholder="Label (Optional)" input-type="text"
                class="w-full" />
            <span v-if="v$.label.$error && ['Email', 'Phone', 'Address'].includes(props.name)"
                class="text-red-900 text-sm">
                {{ v$.label.$errors[0].$message }}
            </span>

            <FloatingLabelInput v-if="['url', 'Link', 'Company URL'].includes(props.name)" v-model="GeneralForm.value"
                label="URL" input-name="URL" placeholder="URL" input-type="text" class="w-full" />
            <span v-if="v$.value.$error && ['url', 'Link', 'Company URL'].includes(props.name)"
                class="text-red-900 text-sm">
                {{ v$.value.$errors[0].$message }}
            </span>

            <FloatingLabelInput v-if="['Link', 'Company URL'].includes(props.name)" v-model="GeneralForm.label"
                label="Title" input-name="Title" placeholder="Title" input-type="text" class="w-full" />
            <span v-if="v$.label.$error && ['Link', 'Company URL'].includes(props.name)" class="text-red-900 text-sm">
                {{ v$.label.$errors[0].$message }}
            </span>

            <Suggestion v-if="props.suggestedLabels" :current="selectedSuggestion"
                :title="props.name == 'Company URL' ? 'Here are some suggestions for your title:' : 'Here are some suggestions for your label:'"
                :suggested-labels="props.suggestedLabels" @update:label="suggestionUpdate($event)" />
        </div>
        <ModalFooterButton :on-cancel="closeModal" :on-delete="onDeleteField" :edit_data="props.editData"
            :disabled="v$.value.$invalid" :on-save="saveField" />
    </div>
</template>