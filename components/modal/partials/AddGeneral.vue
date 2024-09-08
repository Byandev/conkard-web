<script setup lang="ts">
import { email, numeric, required, url } from '@vuelidate/validators';
import { ref, computed } from 'vue';
import { useNewCardStore } from '~/store/newCardStore';

const { addOrUpdateGeneralField, generalField, deleteField } = useNewCardStore();

const props = defineProps<{
    buttonText?: string[];
    edit_data: boolean;
    id?: number | null;
    type: string
}>();

const currentField = findFieldById(generalField, props.id ?? null);

interface GeneralFormInterface {
    title: string;
    url: string;
    value: string;
    label: string;
}

const GeneralForm = ref<GeneralFormInterface>({
    title: props.edit_data ? currentField?.title ?? '' : '',
    url: props.edit_data ? currentField?.url ?? '' : '',
    value: props.edit_data ? currentField?.value ?? '' : '',
    label: props.edit_data ? currentField?.label ?? '' : ''
});

const GeneralFormRules = computed(() => {
    const rules: any = {
        title: {},
        url: {},
        value: {},
        label: {}
    };

    if (props.type === 'Email') {
        rules.value = { required, email };
        rules.label = { required };
    } else if (props.type === 'Phone' || props.type === 'Address') {
        rules.value = { required };
        rules.label = { required };
    } else if (['url', 'Link', 'Company URL'].includes(props.type)) {
        rules.url = { required, url };
        rules.title = { required };
    }

    return rules;
});

const { v$ } = useValidation(GeneralForm, GeneralFormRules);

const suggestionUpdate = (selected: string) => {
    props.type == 'Company URL' ? GeneralForm.value.title = selected : GeneralForm.value.label = selected;
}

const selectedSuggestion = computed(() => {
    return props.type == 'Company URL' ? GeneralForm.value.title : GeneralForm.value.label;
});

const saveField = () => {
    v$.value.$touch();
    if (v$.value.$invalid) return;

    addOrUpdateGeneralField({
        label: GeneralForm.value.label,
        value: GeneralForm.value.value,
        id: props.id ?? null,
        url: GeneralForm.value.url,
        title: GeneralForm.value.title,
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
    <div>
        <div class="flex flex-col gap-4">
            <FloatingLabelInput v-if="['Email', 'Phone', 'Address'].includes(props.type)" v-model="GeneralForm.value"
                label="Value" input-name="Value" placeholder="Value" input-type="text" class="w-full" />
            <span class="text-red-900 text-sm"
                v-if="v$.value.$error && ['Email', 'Phone', 'Address'].includes(props.type)">
                {{ v$.value.$errors[0].$message }}
            </span>

            <FloatingLabelInput v-if="['Email', 'Phone', 'Address'].includes(props.type)" v-model="GeneralForm.label"
                label="Label (Optional)" input-name="field-label" placeholder="Label (Optional)" input-type="text"
                class="w-full" />
            <span class="text-red-900 text-sm"
                v-if="v$.label.$error && ['Email', 'Phone', 'Address'].includes(props.type)">
                {{ v$.label.$errors[0].$message }}
            </span>

            <FloatingLabelInput v-if="['url', 'Link', 'Company URL'].includes(props.type)" v-model="GeneralForm.url"
                label="URL" input-name="URL" placeholder="URL" input-type="text" class="w-full" />
            <span class="text-red-900 text-sm"
                v-if="v$.url.$error && ['url', 'Link', 'Company URL'].includes(props.type)">
                {{ v$.url.$errors[0].$message }}
            </span>

            <FloatingLabelInput v-if="['Link', 'Company URL'].includes(props.type)" v-model="GeneralForm.title"
                label="Title" input-name="Title" placeholder="Title" input-type="text" class="w-full" />
            <span class="text-red-900 text-sm" v-if="v$.title.$error && ['Link', 'Company URL'].includes(props.type)">
                {{ v$.title.$errors[0].$message }}
            </span>

            <Suggestion v-if="props.buttonText" :current="selectedSuggestion"
                title="Here are some suggestions for your label:" @update:label="suggestionUpdate($event)"
                :buttonText="props.buttonText" />
        </div>
        <ModalFooterButton :-on-cancel="closeModal" :-on-delete="onDeleteField" :edit_data="props.edit_data"
            :disabled="v$.value.$invalid" :-on-save="saveField" />
    </div>
</template>