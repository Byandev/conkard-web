<script setup lang="ts">
import { ref, computed } from 'vue';
import { Cropper } from 'vue-advanced-cropper';
import 'vue-advanced-cropper/dist/style.css';

const props = defineProps<{
    type: 'company' | 'profile' | 'cover';
    aspectRatio: number;
    initialImage?: File;
}>();

const emit = defineEmits(['update:image', 'change']);

const image = ref<File | null>(props.initialImage || null);
const isDragging = ref(false);

const handleFileChange = (file: File) => {
    if (file) {
        image.value = file;
        emit('update:image', image.value);
    }
};

const handleInputChange = (event: Event) => {
    const input = event.target as HTMLInputElement;
    console.log(input.type);

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
</script>

<template>
    <div 
        class="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-6 mb-4 cursor-pointer hover:border-gray-400"
        :class="{ 'border-blue-500': isDragging }" 
        @dragover="handleDragOver" 
        @dragleave="handleDragLeave"
        @drop="handleDrop"
    >
        <input 
            id="file-input" 
            type="file" 
            accept="image/jpeg, image/png" 
            class="hidden" 
            @change="handleInputChange"
        >
        <label 
            for="file-input" 
            class="px-5 flex flex-col items-center justify-center w-full h-full"
        >
            <span class="text-gray-600 font-semibold">
                Drop your image here or, <span class="text-red-400">browse</span>
            </span>
            <p class="text-xs text-gray-400">Supports JPG, JPEG, and PNG.</p>
        </label>
    </div>
    <Cropper 
        v-if="image" 
        class="w-full h-auto" 
        :src="imageUrl" 
        :stencil-props="{ aspectRatio: props.aspectRatio }"
        image-restriction="stencil" 
        @change="handleChange" 
    />
</template>