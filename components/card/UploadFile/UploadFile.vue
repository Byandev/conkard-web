<script setup lang="ts">
import { ref } from 'vue';
import { Cropper } from 'vue-advanced-cropper';
import 'vue-advanced-cropper/dist/style.css';

const props = defineProps<{
    title: string;
    isOpen: boolean;
}>();

const emit = defineEmits(['update:isOpen', 'update:imageData']);

const closeModal = () => emit('update:isOpen', false);
const saveImage = () => console.log('Save');
const deleteImage = () => console.log('Deleted');

const companyImg = ref<string | null>(null);
const profileImg = ref<string | null>(null);
const coverImg = ref<string | null>(null);

const handleChange = (type: 'company' | 'profile' | 'cover', { coordinates, image }: { coordinates: any; image: string }) => {
    emit('update:imageData', { type, image, coordinates });
};

const handleFileChange = (type: 'company' | 'profile' | 'cover', event: Event) => {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
        const reader = new FileReader();
        reader.onload = (e: ProgressEvent<FileReader>) => {
            if (type === 'company') {
                companyImg.value = e.target?.result as string;
            } else if (type === 'profile') {
                profileImg.value = e.target?.result as string;
            } else if (type === 'cover') {
                coverImg.value = e.target?.result as string;
            }
        };
        reader.readAsDataURL(input.files[0]);
    }
};
</script>

<template>
    <AddModal :title="`Add ${props.title}`" :open="props.isOpen">
        <div v-if="props.title === 'Company'">
            <input type="file" @change="handleFileChange('company', $event)" accept="image/*"
                style="margin-bottom: 16px;" />
            <cropper v-if="companyImg" class="cropper" :src="companyImg" :stencil-props="{ aspectRatio: 16 / 9 }"
                image-restriction="stencil" @change="handleChange('company', $event)" />
        </div>

        <div v-if="props.title === 'Profile'">
            <input type="file" @change="handleFileChange('profile', $event)" accept="image/*"
                style="margin-bottom: 16px;" />
            <cropper v-if="profileImg" class="cropper" :src="profileImg" :stencil-props="{ aspectRatio: 1 / 1 }"
                image-restriction="stencil" @change="handleChange('profile', $event)" />
        </div>

        <div v-if="props.title === 'Cover'">
            <input type="file" @change="handleFileChange('cover', $event)" accept="image/*"
                style="margin-bottom: 16px;" />
            <cropper v-if="coverImg" class="cropper" :src="coverImg" :stencil-props="{ aspectRatio: 16 / 9 }"
                image-restriction="stencil" @change="handleChange('cover', $event)" />
        </div>
        <ModalFooterButton :edit_data="true" :OnSave="saveImage" :OnDelete="deleteImage" :OnCancel="closeModal" />
    </AddModal>
</template>

<style scoped>
.cropper {
    height: 400px;
    width: 400px;
    display: inline-block !important;
}
</style>
