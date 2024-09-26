<script setup lang="ts">
import 'vue-advanced-cropper/dist/style.css';
import { useCardStore } from '~/store/cardStore';

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

const { isModalOpen } = toRefs(useCardStore());

const emit = defineEmits(['update:imageData']);

const companyImg = ref<File | null>(null);
const profileImg = ref<File | null>(null);
const coverImg = ref<File | null>(null);

const closeModal = () => setModalOpen(false);

const deleteImage = (type: 'company' | 'profile' | 'cover') => {
    if (type === 'company') {
        companyImg.value = null;
    } else if (type === 'profile') {
        profileImg.value = null;
    } else if (type === 'cover') {
        coverImg.value = null;
    }
    emit('update:imageData', { type, image: null, coordinates: null });
    setModalOpen(false);

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
    <AddModal :title="`Add ${props.title} ${prefix}`" :open="isModalOpen">
        <div v-if="props.title === 'Company'">
            <ImageUploader
                :on-delete="() => deleteImage('company')" :on-cancel="closeModal" type="company"
                :aspect-ratio="16 / 9" :initial-image="companyImg ?? undefined"
                @update:image="handleImageUpdate('Company', $event)" @change="handleChange('company', $event)" />
        </div>

        <div v-if="props.title === 'Profile'">
            <ImageUploader
                :on-delete="() => deleteImage('profile')" :on-cancel="closeModal" type="profile"
                :aspect-ratio="1 / 1" :initial-image="profileImg ?? undefined"
                @update:image="handleImageUpdate('Profile', $event)" @change="handleChange('profile', $event)" />
        </div>

        <div v-if="props.title === 'Cover'">
            <ImageUploader
                :on-delete="() => deleteImage('cover')" :on-cancel="closeModal" type="cover"
                :aspect-ratio="16 / 9" :initial-image="coverImg ?? undefined"
                @update:image="handleImageUpdate('Cover', $event)" @change="handleChange('cover', $event)" />
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