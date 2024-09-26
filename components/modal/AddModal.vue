<script setup lang="ts">
import { Dialog, DialogPanel, TransitionChild, TransitionRoot } from '@headlessui/vue';
import { useCardStore } from '~/store/cardStore';

const { setModalOpen } = useCardStore();
const { modalTitle, isModalOpen } = storeToRefs(useCardStore());
console.log(modalTitle);
console.log(isModalOpen);

</script>

<template>
    <TransitionRoot as="template" :show="isModalOpen">
        <Dialog class="relative z-50" @close="setModalOpen(false)">
            <TransitionChild
as="template" enter="ease-out duration-300" enter-from="opacity-0" enter-to="opacity-100"
                leave="ease-in duration-200" leave-from="opacity-100" leave-to="opacity-0">
                <div class="fixed inset-0 bg-gray-50 bg-opacity-75 transition-opacity" />
            </TransitionChild>

            <div class="fixed inset-0 z-10 w-screen overflow-y-auto">
                <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                    <TransitionChild
as="template" enter="ease-out duration-300"
                        enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        enter-to="opacity-100 translate-y-0 sm:scale-100" leave="ease-in duration-200"
                        leave-from="opacity-100 translate-y-0 sm:scale-100"
                        leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
                        <DialogPanel
                            class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-md">
                            <header class="bg-white text-gray-700 px-4 py-4 rounded-t-lg border-b-2 border-gray-200">
                                <h2 class="text-lg font-semibold">{{ modalTitle }}</h2>
                            </header>
                            <div class="bg-white pb-4 pt-5 sm:pb-4 gap-5 flex flex-col">
                                <slot/>
                            </div>
                        </DialogPanel>
                    </TransitionChild>
                </div>
            </div>
        </Dialog>
    </TransitionRoot>
</template>