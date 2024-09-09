<script setup lang="ts">
import { ref } from 'vue';
import { PlusIcon } from '@heroicons/vue/24/outline';

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
    } else if (type === 'profile') {
        emit('update:profileImage', image);
        emit('update:profileImageCoordinates', coordinates);
    } else if (type === 'cover') {
        emit('update:coverImage', image);
        emit('update:coverImageCoordinates', coordinates);
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
            <VerticalButtonIcon @click="updateModalState('Company')" background="gray" foreground="gray"
                :icon="PlusIcon" text="Company Logo" />
            <VerticalButtonIcon @click="updateModalState('Profile')" background="gray" foreground="gray"
                :icon="PlusIcon" text="Profile Picture" />
            <VerticalButtonIcon @click="updateModalState('Cover')" background="gray" foreground="gray" :icon="PlusIcon"
                text="Cover Photo" />
            <UploadFile @update:imageData="handleImageData($event)" :title="modalTitle" :isOpen="isModalOpen"
                @update:isOpen="isModalOpen = $event" />
        </div>
    </div>
</template>