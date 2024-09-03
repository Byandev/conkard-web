<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { Dialog, DialogPanel, TransitionChild, TransitionRoot } from '@headlessui/vue'

var openState = ref(false)

onMounted(() => {
    openState.value = props.open
})

var props = defineProps<{
    open: boolean;
    title: string;
}>()

const emit = defineEmits(['update:open', 'update:submit'])

const closeModal = () => {
    openState.value = false
    emit('update:open', false)
}

</script>

<template>
    <TransitionRoot as="template" :show="open">
        <Dialog class="relative z-50" @close="openState = false">
            <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0" enter-to="opacity-100"
                leave="ease-in duration-200" leave-from="opacity-100" leave-to="opacity-0">
                <div class="fixed inset-0 bg-gray-50 bg-opacity-75 transition-opacity" />
            </TransitionChild>

            <div class="fixed inset-0 z-10 w-screen overflow-y-auto">
                <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                    <TransitionChild as="template" enter="ease-out duration-300"
                        enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        enter-to="opacity-100 translate-y-0 sm:scale-100" leave="ease-in duration-200"
                        leave-from="opacity-100 translate-y-0 sm:scale-100"
                        leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
                        <DialogPanel
                            class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-md">
                            <header class="bg-white text-gray-700 px-4 py-4 rounded-t-lg border-b-2 border-gray-200">
                                <h2 class="text-lg font-semibold">{{ props.title }}</h2>
                            </header>
                            <div class="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4 gap-5 flex flex-col">
                                <slot></slot>
                            </div>
                            <!-- <div class="bg-gray-50 px-4 py-3 sm:flex sm:flex-row justify-end sm:px-6">
                                <button type="button"
                                    class="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                                    @click="closeModal" ref="cancelButtonRef">Cancel</button>
                                <button type="button"
                                    class="inline-flex w-full justify-center rounded-md bg-gray-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-500 sm:ml-3 sm:w-auto">Save</button>
                            </div> -->
                        </DialogPanel>
                    </TransitionChild>
                </div>
            </div>
        </Dialog>
    </TransitionRoot>
</template>