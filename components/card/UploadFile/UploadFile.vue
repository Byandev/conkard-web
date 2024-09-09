<script setup lang="ts">
import { ref } from 'vue';
import 'vue-advanced-cropper/dist/style.css';

const props = defineProps<{
    title: string;
    isOpen: boolean;
}>();

const emit = defineEmits(['update:isOpen', 'update:imageData']);

const closeModal = () => emit('update:isOpen', false);
const saveImage = () => {
    // Save image logic here
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

const companyImg = ref<string | null>(null);
const profileImg = ref<string | null>(null);
const coverImg = ref<string | null>(null);

const handleImageUpdate = (type: 'Company' | 'Profile' | 'Cover', image: string) => {
    if (type === 'Company') {
        companyImg.value = image;
    } else if (type === 'Profile') {
        profileImg.value = image;
    } else if (type === 'Cover') {
        coverImg.value = image;
    }
};

const handleChange = (type: 'company' | 'profile' | 'cover', { coordinates, image }: { coordinates: any; image: string }) => {
    emit('update:imageData', { type, image, coordinates });
};

const prefix = computed(() => {
    if (props.title === 'Company') {
        return 'Logo'
    }
    else if (props.title === 'Profile') {
        return 'Picture'
    }
    else if (props.title == 'Cover') {
        return 'Photo'
    }
});

</script>

<template>
    <AddModal :title="`Add ${props.title} ${prefix}`" :open="props.isOpen">
        <div v-if="props.title === 'Company'">
            <ImageUploader type="company" :aspectRatio="16 / 9" :initialImage="companyImg ?? undefined"
                @update:image="handleImageUpdate('Company', $event)" @change="handleChange('company', $event)" />
        </div>

        <div v-if="props.title === 'Profile'">
            <ImageUploader type="profile" :aspectRatio="1 / 1" :initialImage="profileImg ?? undefined"
                @update:image="handleImageUpdate('Profile', $event)" @change="handleChange('profile', $event)" />
        </div>

        <div v-if="props.title === 'Cover'">
            <ImageUploader type="cover" :aspectRatio="16 / 9" :initialImage="coverImg ?? undefined"
                @update:image="handleImageUpdate('Cover', $event)" @change="handleChange('cover', $event)" />
        </div>
        <ModalFooterButton :has-save="false" :edit_data="true" :OnSave="saveImage"
            :OnDelete="() => deleteImage(props.title.toLowerCase() as 'company' | 'profile' | 'cover')"
            :OnCancel="closeModal" />
    </AddModal>
</template>

<style scoped>
.cropper {
    height: 400px;
    width: 400px;
    display: inline-block !important;
}
</style>