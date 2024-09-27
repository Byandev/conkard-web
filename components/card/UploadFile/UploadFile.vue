<script setup lang="ts">
import 'vue-advanced-cropper/dist/style.css';
import { useCardStore } from '~/store/cardStore';
import { ImageType } from '~/types/enums/ImageType';

const props = defineProps<{
    title: string;
}>();

interface Coordinates {
    x: number;
    y: number;
    width: number;
    height: number;
}

const { setModalOpen } = useCardStore();
const { isModalOpen, currentCategory } = toRefs(useCardStore());
const emit = defineEmits(['update:imageData']);

const companyImg = ref<File | null>(null);
const profileImg = ref<File | null>(null);
const coverImg = ref<File | null>(null);

const closeModal = () => setModalOpen(false);

const deleteImage = (type: ImageType) => {
    if (type === ImageType.Company) {
        companyImg.value = null;
    } else if (type === ImageType.Profile) {
        profileImg.value = null;
    } else if (type === ImageType.Cover) {
        coverImg.value = null;
    }
    emit('update:imageData', { type, image: null, coordinates: null });
    setModalOpen(false);
};

const handleImageUpdate = (type: ImageType, image: File) => {
    if (type === ImageType.Company) {
        companyImg.value = image;
    } else if (type === ImageType.Profile) {
        profileImg.value = image;
    } else if (type === ImageType.Cover) {
        coverImg.value = image;
    }
};

const handleChange = (type: ImageType, { coordinates, image }: { coordinates: Coordinates; image: string }) => {
    emit('update:imageData', { type, image, coordinates });
};

const prefix = computed(() => {
    if (props.title === 'Company') {
        return 'Logo';
    } else if (props.title === 'Profile') {
        return 'Picture';
    } else {
        return 'Photo';
    }
});
</script>

<template>
    <AddModal :title="`Add ${props.title} ${prefix}`" :open="isModalOpen && currentCategory == 'IMAGE'">
        <div v-if="props.title === 'Company'">
            <ImageUploader
                :on-delete="() => deleteImage(ImageType.Company)"
                :on-cancel="closeModal" type="company" :aspect-ratio="16 / 9"
                :initial-image="companyImg ?? undefined"
                @update:image="handleImageUpdate(ImageType.Company, $event)" @change="handleChange(ImageType.Company, $event)" />
        </div>

        <div v-if="props.title === 'Profile'">
            <ImageUploader
                :on-delete="() => deleteImage(ImageType.Profile)" :on-cancel="closeModal" type="profile"
                :aspect-ratio="1 / 1" :initial-image="profileImg ?? undefined"
                @update:image="handleImageUpdate(ImageType.Profile, $event)" @change="handleChange(ImageType.Profile, $event)" />
        </div>

        <div v-if="props.title === 'Cover'">
            <ImageUploader
                :on-delete="() => deleteImage(ImageType.Cover)" :on-cancel="closeModal" type="cover"
                :aspect-ratio="16 / 9" :initial-image="coverImg ?? undefined"
                @update:image="handleImageUpdate(ImageType.Cover, $event)" @change="handleChange(ImageType.Cover, $event)" />
        </div>
    </AddModal>
</template>

<style scoped>
.cropper {
    height: 400px;
    width: 400px;
    display: inline-block !important;
}
</style>