<script setup lang="ts">
import { required } from '@vuelidate/validators';
import { ref, computed } from 'vue';
import { useNewCardStore } from '~/store/newCardStore';

const { addOrUpdateSocialField, socialField, deleteField } = useNewCardStore();

const props = defineProps<{
    buttonText?: string[];
    edit_data: boolean;
    id?: number | null;
    type: string
}>();

const currentField = findFieldById(socialField, props.id ?? null);

interface SocialsFormInterface {
    title: string;
    url: string;
    username: string;
}

const SocialsForm = ref<SocialsFormInterface>({
    title: props.edit_data ? currentField?.title ?? '' : '',
    url: props.edit_data ? currentField?.url ?? '' : '',
    username: props.edit_data ? currentField?.username ?? '' : '',
});

const SocialsRules = computed(() => {
    const rules: any = {
        title: {},
        url: {},
        username: {},
    };

    if (['Threads', 'Yelp'].includes(props.type)) {
        rules.url = { required };
        rules.title = { required };
    } else if (['Instagram', 'Twitter', 'LinkedIn', 'Facebook', 'YouTube', 'SnapChat', 'TikTok', 'Twitch'].includes(props.type)) {
        rules.username = { required };
        rules.title = { required };
    }

    return rules;
});

const { v$ } = useValidation(SocialsForm, SocialsRules);

const saveField = () => {
    v$.value.$touch();
    if (v$.value.$invalid) return;

    addOrUpdateSocialField({
        id: props.id ?? null,
        title: SocialsForm.value.title,
        url: SocialsForm.value.url,
        username: SocialsForm.value.username,
        type: props.type,
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
        <FloatingLabelInput v-if="['Threads', 'Yelp', ''].includes(props.type)" v-model="SocialsForm.url" label="URL"
            input-name="URL" placeholder="URL" input-type="text" class="w-full" />
        <span class="text-red-900 text-sm" v-if="v$.url.$error && ['Threads', 'Yelp', ''].includes(props.type)">
            {{ v$.url.$errors[0].$message }}
        </span>

        <FloatingLabelInput
            v-if="['Instagram', 'Twitter', 'LinkedIn', 'Facebook', 'YouTube', 'SnapChat', 'TikTok', 'Twitch'].includes(props.type)"
            v-model="SocialsForm.username" label="Username" input-name="Username" placeholder="Username"
            input-type="text" class="w-full" />
        <span class="text-red-900 text-sm"
            v-if="v$.username.$error && ['Instagram', 'Twitter', 'LinkedIn', 'Facebook', 'YouTube', 'SnapChat', 'TikTok', 'Twitch'].includes(props.type)">
            {{ v$.username.$errors[0].$message }}
        </span>

        <FloatingLabelInput
            v-if="['Twitter', 'Instagram', 'Threads', 'Yelp', 'LinkedIn', 'Facebook', 'YouTube', 'SnapChat', 'TikTok', 'Twitch'].includes(props.type)"
            v-model="SocialsForm.title" label="Title" input-name="Title" placeholder="Title" input-type="text"
            class="w-full" />
        <span class="text-red-900 text-sm"
            v-if="v$.title.$error && ['Twitter', 'Instagram', 'Threads', 'Yelp', 'LinkedIn', 'Facebook', 'YouTube', 'SnapChat', 'TikTok', 'Twitch'].includes(props.type)">
            {{ v$.title.$errors[0].$message }}
        </span>

        <Suggestion v-if="props.buttonText" :current="SocialsForm.title"
            title="Here are some suggestions for your title:" @update:label="SocialsForm.title = $event"
            :buttonText="props.buttonText" />
    </div>
    <ModalFooterButton :-on-cancel="closeModal" :-on-delete="onDeleteField" :edit_data="props.edit_data"
        :-on-save="saveField" />
</template>