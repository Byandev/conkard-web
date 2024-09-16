<script setup lang="ts">
import { required, url as urlValidator } from '@vuelidate/validators';
import { ref, computed } from 'vue';
import { useNewCardStore } from '~/store/newCardStore';

const { addOrUpdateBusinessField, businessField, deleteField } = useNewCardStore();

const props = defineProps<{
    suggestedLabels?: string | null;
    editData: boolean;
    id?: number | null;
    name: string
}>();

const currentField = findFieldById(businessField, props.id ?? null);

interface BusinessFormInterface {
    value: string;
    label: string;
}

const BusinessForm = ref<BusinessFormInterface>({
    value: props.editData ? currentField?.value ?? '' : '',
    label: props.editData ? currentField?.label ?? '' : ''
});

const BusinessRules = computed(() => {
    const rules: any = {
        title: {},
        url: {},
        username: {},
    };

    if (['Calendly'].includes(props.name)) {
        rules.value = { required, urlValidator };
        rules.label = { required };
    } else if (['GitHub'].includes(props.name)) {
        rules.value = { required };
        rules.label = { required };
    }

    return rules;
});

const { v$ } = useValidation(BusinessForm, BusinessRules);

const saveField = () => {
    v$.value.$touch();
    if (v$.value.$invalid) return;

    addOrUpdateBusinessField({
        id: props.id ?? null,
        value: BusinessForm.value.value,
        label: BusinessForm.value.label,
        name: props.name,
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
        <FloatingLabelInput
            v-if="['Calendly'].includes(props.name)" v-model="BusinessForm.value" label="URL"
            input-name="URL" placeholder="URL" input-type="text" class="w-full" />
        <span v-if="v$.value.$error && ['Calendly'].includes(props.name)" class="text-red-900 text-sm">
            {{ v$.value.$errors[0].$message }}
        </span>

        <FloatingLabelInput
            v-if="['GitHub'].includes(props.name)" v-model="BusinessForm.value" label="Username"
            input-name="Username" placeholder="Username" input-type="text" class="w-full" />
        <span v-if="v$.value.$error && ['GitHub'].includes(props.name)" class="text-red-900 text-sm">
            {{ v$.value.$errors[0].$message }}
        </span>

        <FloatingLabelInput
            v-if="['Calendly', 'GitHub'].includes(props.name)" v-model="BusinessForm.label"
            label="Title" input-name="Title" placeholder="Title" input-type="text" class="w-full" />
        <span v-if="v$.label.$error && ['Calendly', 'GitHub'].includes(props.name)" class="text-red-900 text-sm">
            {{ v$.label.$errors[0].$message }}
        </span>

        <Suggestion
v-if="props.suggestedLabels" :current="BusinessForm.label"
            title="Here are some suggestions for your title:" :suggested-labels="props.suggestedLabels"
            @update:label="BusinessForm.label = $event" />
    </div>
    <ModalFooterButton
:on-cancel="closeModal" :on-delete="onDeleteField" :edit_data="props.editData"
        :on-save="saveField" />
</template>