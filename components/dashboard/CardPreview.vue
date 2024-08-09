<script setup lang="ts">
defineProps<{
    color: string;
}>();
</script>

<template>
    <div class="grid grid-cols-1 gap-4">
        <div
            class="divide-y divide-gray-200 overflow-hidden rounded-xl bg-white w-full md:max-w-[440px] shadow drop-shadow-xl">
            <div class="px-4 py-5 sm:px-6 h-28 flex items-center justify-center" :style="{ backgroundColor: color }">
                <svg class="h-12 w-12 text-white"
                    xmlns="http://conkard-api-dev.byandev.com/storage/images/icons/name.svg" viewBox="0 0 20 20"
                    fill="currentColor">
                    <path fill-rule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm0-2a6 6 0 100-12 6 6 0 000 12zm0-10a2 2 0 100-4 2 2 0 000 4z"
                        clip-rule="evenodd" />
                </svg>
            </div>
            <div class="px-5 md:px-10 pb-7">
                <section class="hover:cursor-pointer w-full my-7 flex flex-row items-center justify-between group">
                    <h1 class="text-3xl font-bold text-gray-300">Name</h1>
                    <Icon name="lucide:edit"
                        class="text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </section>

                <!-- <div class="flex gap-5 flex-col">
                    <div class="flex flex-row items-center gap-5">
                        <div class="bg-gray-500 rounded-full p-2 inline-flex items-center justify-center">
                            <EnvelopeIcon class="text-white h-6 w-6" />
                        </div>
                        <div>
                            <div class="text-sm md:text-base">
                                <div>
                                    field
                                </div>
                            </div>
                        </div>
                    </div>
                </div> -->
            </div>
        </div>
    </div>
</template>