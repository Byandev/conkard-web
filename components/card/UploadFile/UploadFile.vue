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

const img = ref<string | null>(null);
const profileImg = ref<string | null>(null);

const handleChange = (type: 'company' | 'profile', { coordinates, image }: { coordinates: any; image: string }) => {
    emit('update:imageData', { type, image, coordinates });
};

const handleFileChange = (type: 'company' | 'profile', event: Event) => {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
        const reader = new FileReader();
        reader.onload = (e: ProgressEvent<FileReader>) => {
            if (type === 'company') img.value = e.target?.result as string;
            else profileImg.value = e.target?.result as string;
        };
        reader.readAsDataURL(input.files[0]);
    }
};
</script>

<template>
    <AddModal :title="`Add ${props.title} Logo`" :open="props.isOpen">
        <div v-if="props.title === 'Company'">
            <input type="file" @change="handleFileChange('company', $event)" accept="image/*"
                style="margin-bottom: 16px;" />
            <cropper v-if="img" class="cropper" :src="img" :stencil-props="{ aspectRatio: 16 / 9 }"
                image-restriction="stencil" @change="handleChange('company', $event)" />
        </div>

        <div v-if="props.title === 'Profile'">
            <input type="file" @change="handleFileChange('profile', $event)" accept="image/*"
                style="margin-bottom: 16px;" />
            <cropper v-if="profileImg" class="cropper" :src="profileImg" :stencil-props="{ aspectRatio: 1 / 1 }"
                image-restriction="stencil" @change="handleChange('profile', $event)" />
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
