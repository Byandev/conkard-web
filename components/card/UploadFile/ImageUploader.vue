<script setup lang="ts">
import { ref } from 'vue';
import { Cropper } from 'vue-advanced-cropper';
import 'vue-advanced-cropper/dist/style.css';

const props = defineProps<{
    type: 'company' | 'profile' | 'cover';
    aspectRatio: number;
    initialImage?: string;
}>();

const emit = defineEmits(['update:image', 'change']);

const image = ref<string | null>(props.initialImage || null);
const isDragging = ref(false);

const handleFileChange = (files: FileList) => {
    if (files && files[0]) {
        const reader = new FileReader();
        reader.onload = (e: ProgressEvent<FileReader>) => {
            image.value = e.target?.result as string;
            emit('update:image', image.value);
        };
        reader.readAsDataURL(files[0]);
    }
};

const handleInputChange = (event: Event) => {
    const input = event.target as HTMLInputElement;
    if (input.files) {
        handleFileChange(input.files);
    }
};

const handleDrop = (event: DragEvent) => {
    event.preventDefault();
    isDragging.value = false;
    if (event.dataTransfer?.files) {
        handleFileChange(event.dataTransfer.files);
    }
};

const handleDragOver = (event: DragEvent) => {
    event.preventDefault();
    isDragging.value = true;
};

const handleDragLeave = () => {
    isDragging.value = false;
};

const handleChange = (event: any) => {
    emit('change', event);
};
</script>

<template>
    <div class="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-6 mb-4 cursor-pointer hover:border-gray-400"
        :class="{ 'border-blue-500': isDragging }" @dragover="handleDragOver" @dragleave="handleDragLeave"
        @drop="handleDrop">
        <input type="file" @change="handleInputChange" accept="image/jpeg, image/png" class="hidden" id="file-input" />
        <label for="file-input" class="px-5 flex flex-col items-center justify-center w-full h-full">
            <span class="text-gray-600 font-semibold">Drop you image here or , <span class="text-red-400">browse</span>
            </span>
            <p class="text-xs text-gray-400">Supports JPG, JPEG, and PNG.</p>
        </label>
    </div>
    <Cropper v-if="image" class="w-full h-auto" :src="image" :stencil-props="{ aspectRatio: props.aspectRatio }"
        image-restriction="stencil" @change="handleChange" />
</template>