<script setup lang="ts">
import { PlusIcon } from '@heroicons/vue/24/outline';
</script>

<template>
    <div class="max-w-screen-lg w-full mx-auto p-4">
        <div class="flex flex-col md:flex-row justify-between h-12 items-center">
            <CardTitle forId="add-images" text="Add Images" />
            <Button text="Change Layout" background="white" foreground="black" class="mt-2 md:mt-0" />
        </div>
        <div class="mt-5 flex flex-col md:flex-row justify-between gap-5">
            <VerticalButtonIcon background="gray" foreground="gray" :icon="PlusIcon" text="Company Logo" />
            <VerticalButtonIcon background="gray" foreground="gray" :icon="PlusIcon" text="Profile Picture" />
            <VerticalButtonIcon background="gray" foreground="gray" :icon="PlusIcon" text="Cover Photo" />
        </div>
    </div>
</template>