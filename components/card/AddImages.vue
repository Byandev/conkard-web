<script setup lang="ts">
import { PlusIcon } from '@heroicons/vue/24/outline';

</script>

<template>
    <div>
        <div class="flex flex-row justify-between h-12 items-center">
            <CardLabel forId="add-images" text="Add Images" />
            <Button text="Change Layout" background="white" foreground="black" />
        </div>
        <div class="mt-5 flex flex-row justify-between gap-5">
            <VerticalButtonIcon background="gray" foreground="gray" :icon="PlusIcon" text="Company Logo" />
            <VerticalButtonIcon background="gray" foreground="gray" :icon="PlusIcon" text="Profile Picture" />
            <VerticalButtonIcon background="gray" foreground="gray" :icon="PlusIcon" text="Cover Photo" />
        </div>
    </div>
</template>