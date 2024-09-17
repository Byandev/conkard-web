<script setup lang="ts">
import { required } from '@vuelidate/validators';
import { ref, computed } from 'vue';
import { useNewCardStore } from '~/store/newCardStore';

const { addOrUpdateSocialField, socialField, deleteField } = useNewCardStore();

const props = defineProps<{
    suggestedLabels?: string | null;
    editData: boolean;
    id?: number | null;
    name: string
}>();

const currentField = findFieldById(socialField, props.id ?? null);

interface SocialsFormInterface {
    value: string;
    label: string;
}

const SocialsForm = ref<SocialsFormInterface>({
    label: props.editData ? currentField?.label ?? '' : '',
    value: props.editData ? currentField?.value ?? '' : '',
});

const SocialsRules = computed(() => {
    const rules: any = {
        value: {},
        label: {}
    };

    if (['Threads', 'Yelp'].includes(props.name)) {
        rules.value = { required };
        rules.label = { required };
    } else if (['Instagram', 'X', 'LinkedIn', 'Facebook', 'Youtube', 'SnapChat', 'Tiktok', 'Twitch', 'Spotify'].includes(props.name)) {
        rules.value = { required };
        rules.label = { required };
    }

    return rules;
});

const { v$ } = useValidation(SocialsForm, SocialsRules);

const saveField = () => {
    v$.value.$touch();
    if (v$.value.$invalid) return;

    addOrUpdateSocialField({
        id: props.id ?? null,
        value: SocialsForm.value.value,
        label: SocialsForm.value.label,
        name: props.name,
    });
    closeModal();
};

const emit = defineEmits(["update:open"]);

const closeModal = () => {
    emit("update:open", false);
};

const onDeleteField = () => {
    deleteField("socialField", props.id ?? null);
    closeModal();
};
</script>

<template>
    <div class="flex flex-col gap-4">
        <FloatingLabelInput
            v-if="['Threads', 'Yelp', ''].includes(props.name)" v-model="SocialsForm.value" label="URL"
            input-name="URL" placeholder="URL" input-type="text" class="w-full" />
        <span v-if="v$.value.$error && ['Threads', 'Yelp', ''].includes(props.name)" class="text-red-900 text-sm">
            {{ v$.value.$errors[0].$message }}
        </span> 

        <FloatingLabelInput
            v-if="['Instagram', 'X', 'LinkedIn', 'Facebook', 'Youtube', 'SnapChat', 'Tiktok', 'Twitch', 'Spotify'].includes(props.name)"
            v-model="SocialsForm.value" label="Username" input-name="Username" placeholder="Username"
            input-type="text" class="w-full" />
        <span
            v-if="v$.value.$error && ['Instagram', 'X', 'LinkedIn', 'Facebook', 'Youtube', 'SnapChat', 'Tiktok', 'Twitch', 'Spotify'].includes(props.name)"
            class="text-red-900 text-sm">
            {{ v$.value.$errors[0].$message }}
        </span>

        <FloatingLabelInput
            v-if="['X', 'Instagram', 'Threads', 'Yelp', 'LinkedIn', 'Facebook', 'Youtube', 'SnapChat', 'Tiktok', 'Twitch', 'Spotify'].includes(props.name)"
            v-model="SocialsForm.label" label="Title" input-name="Title" placeholder="Title" input-type="text"
            class="w-full" />
        <span
            v-if="v$.label.$error && ['X', 'Instagram', 'Threads', 'Yelp', 'LinkedIn', 'Facebook', 'Youtube', 'SnapChat', 'Tiktok', 'Twitch', 'Spotify'].includes(props.name)"
            class="text-red-900 text-sm">
            {{ v$.label.$errors[0].$message }}
        </span>

        <Suggestion
            v-if="props.suggestedLabels" :current="SocialsForm.label"
            title="Here are some suggestions for your title:" :suggested-labels="props.suggestedLabels"
            @update:label="SocialsForm.label = $event" />
    </div>
    <ModalFooterButton
        :on-cancel="closeModal" :on-delete="onDeleteField" :edit_data="props.editData"
        :on-save="saveField" />
</template>