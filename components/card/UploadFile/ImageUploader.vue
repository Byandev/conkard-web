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

const handleFileChange = (event: Event) => {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
        const reader = new FileReader();
        reader.onload = (e: ProgressEvent<FileReader>) => {
            image.value = e.target?.result as string;
            emit('update:image', image.value);
        };
        reader.readAsDataURL(input.files[0]);
    }
};

const handleChange = (event: any) => {
    emit('change', event);
};
</script>

<template>
    <div>
        <input type="file" @change="handleFileChange" accept="image/*" class="mb-4" />
        <Cropper v-if="image" class="w-full h-auto" :src="image" :stencil-props="{ aspectRatio: props.aspectRatio }"
            image-restriction="stencil" @change="handleChange" />
    </div>
</template>