<script setup lang="ts">
import { ref } from 'vue';
import { PlusIcon } from '@heroicons/vue/24/outline';
import { Preview } from 'vue-advanced-cropper';

const companyImg = ref<string | null>(null);
const companyImageCoordinates = ref<any>(null)

const profileImg = ref<string | null>(null);
const profileImageCoordinates = ref<any>(null)

const coverImg = ref<string | null>(null);
const coverImageCoordinates = ref<any>(null)

const isModalOpen = ref(false);
const modalTitle = ref('');

const updateModalState = (title: string) => {
    modalTitle.value = title;
    isModalOpen.value = true;
}

const emit = defineEmits(['update:companyImage', 'update:companyImageCoordinates', 'update:profileImage', 'update:profileImageCoordinates', 'update:coverImage', 'update:coverImageCoordinates']);

const handleImageData = ({ type, image, coordinates }: { type: string, image: string, coordinates: any }) => {
    if (type === 'company') {
        emit('update:companyImage', image);
        emit('update:companyImageCoordinates', coordinates);
        companyImg.value = image;
        companyImageCoordinates.value = coordinates;
    } else if (type === 'profile') {
        emit('update:profileImage', image);
        emit('update:profileImageCoordinates', coordinates);
        profileImg.value = image;
        profileImageCoordinates.value = coordinates;
    } else if (type === 'cover') {
        emit('update:coverImage', image);
        emit('update:coverImageCoordinates', coordinates);
        coverImg.value = image;
        coverImageCoordinates.value = coordinates;
    }
}
</script>

<template>
    <div class="max-w-screen-lg w-full mx-auto p-4">
        <div class="flex flex-col md:flex-row justify-between h-12 items-center">
            <CardTitle forId="add-images" text="Add Images" />
            <Button text="Change Layout" background="white" foreground="black" class="mt-2 md:mt-0" />
        </div>
        <div class="mt-5 flex flex-col md:flex-row justify-between gap-5">
            <VerticalButtonIcon v-if="!companyImg" @click="updateModalState('Company')" background="gray"
                foreground="gray" :icon="PlusIcon" text="Company Logo" />
            <div v-else class="relative " @click="updateModalState('Company')">
                <Preview :width="160" :height="90" :image="companyImg" :coordinates="companyImageCoordinates"
                    class="preview rounded-lg" />
                <div
                    class="absolute inset-0 text-center rounded-lg flex items-center justify-center bg-black bg-opacity-50 text-white text-sm font-semibold opacity-0 hover:opacity-100 transition-opacity hover:cursor-pointer duration-300">
                    Company Logo
                    <Icon name="tabler:edit" />
                </div>
            </div>

            <VerticalButtonIcon v-if="!profileImg" @click="updateModalState('Profile')" background="gray"
                foreground="gray" :icon="PlusIcon" text="Profile Picture" />
            <div v-else class="relative" @click="updateModalState('Profile')">
                <Preview :width="90" :height="90" :image="profileImg" :coordinates="profileImageCoordinates"
                    class="preview rounded-lg" />
                <div
                    class="absolute inset-0 text-center rounded-lg flex items-center justify-center bg-black bg-opacity-50 text-white text-sm font-semibold opacity-0 hover:opacity-100 transition-opacity hover:cursor-pointer duration-300">
                    Profile Picture
                    <Icon name="tabler:edit" />
                </div>
            </div>

            <VerticalButtonIcon v-if="!coverImg" @click="updateModalState('Cover')" background="gray" foreground="gray"
                :icon="PlusIcon" text="Cover Photo" />
            <div v-else class="relative" @click="updateModalState('Cover')">
                <Preview :width="160" :height="90" :image="coverImg" :coordinates="coverImageCoordinates"
                    class="preview rounded-lg" />
                <div
                    class="absolute inset-0 rounded-lg text-center flex items-center justify-center bg-black bg-opacity-50 text-white text-sm font-semibold opacity-0 hover:opacity-100 transition-opacity hover:cursor-pointer duration-300">
                    Cover Photo
                    <Icon name="tabler:edit" />
                </div>
            </div>

            <UploadFile @update:imageData="handleImageData($event)" :title="modalTitle" :isOpen="isModalOpen"
                @update:isOpen="isModalOpen = $event" />
        </div>
    </div>
</template>