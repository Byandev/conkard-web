<script setup lang="ts">
import _ from 'lodash';
import CancelIcon from '~/assets/icons/cancel.svg';

const props = defineProps<{
    placeholder: string;
}>();

const _emit = defineEmits(['onUpload', 'onRemove']);

//Used to store the image source and the selected file
const imageSrc = ref<string | null>(null);
const selectedFile = ref<File | null>(null);

const handelFileUpload = (e: any) => {
    const file = e.target.files[0];
    if (!file) return;

    selectedFile.value = file;
    imageSrc.value = URL.createObjectURL(file);

    _emit('onUpload', file);
};

const removeItem = () => {
    imageSrc.value = null;
    selectedFile.value = null;


    _emit('onRemove');
};
</script>

<template>
    <div>
        <div>
            <div class="relative cursor-pointer">
                <div>
                    <form
                        class="relative w-full h-24 border-2 border-dashed border-gray-400 rounded-md flex justify-center items-center">
                        <input
                            id="media" type="file" accept="image/*"
                            class="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                            @change="(event) => handelFileUpload(event)">
                        <div v-if="imageSrc" class="absolute inset-0 flex justify-center items-center">
                            <div class="relative p-1 border border-gray-400 rounded-md w-full h-full">
                                <img id="output" :src="imageSrc" class="w-full h-full object-cover rounded-md">
                                <div class="absolute top-0 right-0 cursor-pointer">
                                    <CancelIcon @click="removeItem" />
                                </div>
                            </div>
                        </div>  
                        <div v-else class="text-center">
                            {{ props.placeholder}}
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>