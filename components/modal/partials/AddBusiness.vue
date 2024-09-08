<script setup lang="ts">
import { required, url as urlValidator } from '@vuelidate/validators';
import { ref, computed } from 'vue';
import { useNewCardStore } from '~/store/newCardStore';

const { addOrUpdateBusinessField, businessField, deleteField } = useNewCardStore();

const props = defineProps<{
    buttonText?: string[];
    edit_data: boolean;
    id?: number | null;
    type: string
}>();

const currentField = findFieldById(businessField, props.id ?? null);

interface BusinessFormInterface {
    title: string;
    url: string;
    username: string;
}

const BusinessForm = ref<BusinessFormInterface>({
    title: props.edit_data ? currentField?.title ?? '' : '',
    url: props.edit_data ? currentField?.url ?? '' : '',
    username: props.edit_data ? currentField?.username ?? '' : '',
});

const BusinessRules = computed(() => {
    const rules: any = {
        title: {},
        url: {},
        username: {},
    };

    if (['Calendly'].includes(props.type)) {
        rules.url = { required, urlValidator };
        rules.title = { required };
    } else if (['GitHub'].includes(props.type)) {
        rules.username = { required };
        rules.title = { required };
    }

    return rules;
});

const { v$ } = useValidation(BusinessForm, BusinessRules);

const saveField = () => {
    v$.value.$touch();
    if (v$.value.$invalid) return;

    addOrUpdateBusinessField({
        id: props.id ?? null,
        title: BusinessForm.value.title,
        url: BusinessForm.value.url,
        username: BusinessForm.value.username,
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
        <FloatingLabelInput v-if="['Calendly'].includes(props.type)" v-model="BusinessForm.url" label="URL"
            input-name="URL" placeholder="URL" input-type="text" class="w-full" />
        <span class="text-red-900 text-sm" v-if="v$.url.$error && ['Calendly'].includes(props.type)">
            {{ v$.url.$errors[0].$message }}
        </span>

        <FloatingLabelInput v-if="['GitHub'].includes(props.type)" v-model="BusinessForm.username" label="Username"
            input-name="Username" placeholder="Username" input-type="text" class="w-full" />
        <span class="text-red-900 text-sm" v-if="v$.username.$error && ['GitHub'].includes(props.type)">
            {{ v$.username.$errors[0].$message }}
        </span>

        <FloatingLabelInput v-if="['Calendly', 'GitHub'].includes(props.type)" v-model="BusinessForm.title"
            label="Title" input-name="Title" placeholder="Title" input-type="text" class="w-full" />
        <span class="text-red-900 text-sm" v-if="v$.title.$error && ['Calendly', 'GitHub'].includes(props.type)">
            {{ v$.title.$errors[0].$message }}
        </span>

        <Suggestion v-if="props.buttonText" :current="BusinessForm.title"
            title="Here are some suggestions for your title:" @update:label="BusinessForm.title = $event"
            :buttonText="props.buttonText" />
    </div>
    <ModalFooterButton :-on-cancel="closeModal" :-on-delete="onDeleteField" :edit_data="props.edit_data"
        :-on-save="saveField" />
</template>