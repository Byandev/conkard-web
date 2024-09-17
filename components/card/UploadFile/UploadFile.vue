<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import 'vue-advanced-cropper/dist/style.css';
import { useSubmit } from "~/composables/useSubmit";
import type { ApiErrorResponse } from '~/types/api/response/error';
import type { ImageDataResponse } from '~/types/api/response/uploadImage';

const props = defineProps<{
    title: string;
    isOpen: boolean;
}>();

const router = useRouter();
const { sendRequest: uploadImage } = useSubmit<ImageDataResponse, ApiErrorResponse>()

const emit = defineEmits(['update:isOpen', 'update:imageData']);

const isLoading = ref(false);

const companyImg = ref<File | null>(null);
const profileImg = ref<File | null>(null);
const coverImg = ref<File | null>(null);


const closeModal = () => emit('update:isOpen', false);

const saveImage = async () => {
    const typeMap: Record<'Company' | 'Profile' | 'Cover', string> = {
        'Company': 'CARD_COMPANY_LOGO',
        'Profile': 'CARD_PROFILE_PICTURE',
        'Cover': 'CARD_COVER_PHOTO'
    };

    const imageMap: Record<'Company' | 'Profile' | 'Cover', File | null> = {
        'Company': companyImg.value,
        'Profile': profileImg.value,
        'Cover': coverImg.value
    };

    const title = props.title as 'Company' | 'Profile' | 'Cover';
    const type = typeMap[title];
    const image = imageMap[title];

    console.log("title", image?.type);

    if (!image) {
        console.error(`${props.title} image is required.`);
        return;
    }

    console.log("type", type);
    console.log("image", image);

    try {
        isLoading.value = true;
        const response = await uploadImage('/v1/cards/1/images', {
            method: 'POST',
            body: {
                type,
                image,
            },
        });

        console.log(response);
        await router.push("/dashboard/cards/personal");
    } catch (error) {
        console.error(error as ApiErrorResponse);
    } finally {
        isLoading.value = false;
        console.log('Form submission attempt finished.');
    }
};

const deleteImage = (type: 'company' | 'profile' | 'cover') => {
    console.log(type)
    if (type === 'company') {
        companyImg.value = null;
    } else if (type === 'profile') {
        profileImg.value = null;
    } else if (type === 'cover') {
        coverImg.value = null;
    }
    emit('update:imageData', { type, image: null, coordinates: null });
    emit('update:isOpen', false)

};

const handleImageUpdate = (type: 'Company' | 'Profile' | 'Cover', image: File) => {
    if (type === 'Company') {
        companyImg.value = image;
    } else if (type === 'Profile') {
        profileImg.value = image;
    } else if (type === 'Cover') {
        coverImg.value = image;
    }
};

interface Coordinates {
    x: number;
    y: number;
    width: number;
    height: number;
}

const handleChange = (type: 'company' | 'profile' | 'cover', { coordinates, image }: { coordinates: Coordinates; image: string }) => {
    emit('update:imageData', { type, image, coordinates });
};

const prefix = computed(() => {
    if (props.title === 'Company') {
        return 'Logo'
    }
    else if (props.title === 'Profile') {
        return 'Picture'
    }
    else {
        return 'Photo'
    }
});

</script>

<template>
    <AddModal :title="`Add ${props.title} ${prefix}`" :open="props.isOpen">
        <div v-if="props.title === 'Company'">
            <ImageUploader type="company" :aspect-ratio="16 / 9" :initial-image="companyImg ?? undefined"
                @update:image="handleImageUpdate('Company', $event)" @change="handleChange('company', $event)" />
        </div>

        <div v-if="props.title === 'Profile'">
            <ImageUploader type="profile" :aspect-ratio="1 / 1" :initial-image="profileImg ?? undefined"
                @update:image="handleImageUpdate('Profile', $event)" @change="handleChange('profile', $event)" />
        </div>

        <div v-if="props.title === 'Cover'">
            <ImageUploader type="cover" :aspect-ratio="16 / 9" :initial-image="coverImg ?? undefined"
                @update:image="handleImageUpdate('Cover', $event)" @change="handleChange('cover', $event)" />
        </div>
        <ModalFooterButton :edit_data="true" :on-save="saveImage"
            :on-delete="() => deleteImage(props.title.toLowerCase() as 'company' | 'profile' | 'cover')"
            :on-cancel="closeModal" />
    </AddModal>
</template>

<style scoped>
.cropper {
    height: 400px;
    width: 400px;
    display: inline-block !important;
}
</style>