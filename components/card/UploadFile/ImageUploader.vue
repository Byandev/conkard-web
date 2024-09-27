<script setup lang="ts">
import { ref, computed } from 'vue';
import { Cropper } from 'vue-advanced-cropper';
import 'vue-advanced-cropper/dist/style.css';
import { useCardStore } from '~/store/cardStore';

const props = defineProps<{
    type: 'company' | 'profile' | 'cover';
    aspectRatio: number;
    initialImage?: File;
    onDelete: (type: 'company' | 'profile' | 'cover') => void;
    onCancel: () => void;
}>();

const emit = defineEmits(['update:image', 'change']);

const { addField } = useCardStore();

const image = ref<File | null>(props.initialImage || null);
const isDragging = ref(false);
const cropperRef = ref<InstanceType<typeof Cropper> | null>(null);

const handleFileChange = (file: File) => {
    if (file) {
        image.value = file;
        emit('update:image', image.value);
    }
};

const handleInputChange = (event: Event) => {
    const input = event.target as HTMLInputElement;
    if (input.files) {
        handleFileChange(input.files[0]);
    }
};

const handleDrop = (event: DragEvent) => {
    event.preventDefault();
    isDragging.value = false;
    if (event.dataTransfer?.files) {
        handleFileChange(event.dataTransfer.files[0]);
    }
};

const handleDragOver = (event: DragEvent) => {
    event.preventDefault();
    isDragging.value = true;
};

const handleDragLeave = () => {
    isDragging.value = false;
};

const handleChange = (event: Event) => {
    emit('change', event);
};

const imageUrl = computed(() => {
    return image.value ? URL.createObjectURL(image.value) : '';
});

const saveCroppedImage = async () => {
    const typeImage = ref<string>('');
    if (props.type === 'company') {
        typeImage.value = 'CARD_COMPANY_LOGO';
    }
    else if (props.type === 'profile') {
        typeImage.value = 'CARD_PROFILE_PICTURE';
    }
    else {
        typeImage.value = 'CARD_COVER_PHOTO';
    }

    if (cropperRef.value) {
        const canvas = cropperRef.value.getResult().canvas;
        if (canvas) {
            canvas.toBlob((blob: Blob | null) => {
                if (blob) {
                    const croppedFile = new File([blob], 'cropped-image.png', { type: 'image/png' });
                    console.log(croppedFile);
                    addField("imageFields",{
                        type: typeImage.value,
                        image: croppedFile,
                    })
                    props.onCancel();
                }
            }, 'image/png');
        }
    }
};
</script>

<template>
    <div
        class="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-6 mb-4 cursor-pointer hover:border-gray-400 mx-5"
        :class="{ 'border-blue-500': isDragging }" @dragover="handleDragOver" @dragleave="handleDragLeave"
        @drop="handleDrop">
        <input id="file-input" type="file" accept="image/jpeg, image/png" class="hidden" @change="handleInputChange">
        <label for="file-input" class="px-5 flex flex-col items-center justify-center w-full h-full">
            <span class="text-gray-600 font-semibold">
                Drop your image here or, <span class="text-red-400">browse</span>
            </span>
            <p class="text-xs text-gray-400">Supports JPG, JPEG, and PNG.</p>
        </label>
    </div>
    <Cropper
        v-if="image" ref="cropperRef" class="w-full h-auto" :src="imageUrl"
        :stencil-props="{ aspectRatio: props.aspectRatio }" image-restriction="stencil" @change="handleChange" />

    <ModalFooterButton
        class="mx-5"
        :edit_data="true" :on-save="saveCroppedImage" :on-delete="() => props.onDelete(props.type)"
        :on-cancel="props.onCancel" />
</template>

<style scoped="true"></style>