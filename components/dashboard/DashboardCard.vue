<script setup lang="ts">
import {
    EnvelopeIcon,
} from '@heroicons/vue/24/solid'

</script>

<template>
    <div class="divide-y divide-gray-200 overflow-hidden rounded-xl bg-white shadow max-w-md drop-shadow-xl">
        <div class="px-4 py-5 sm:px-6 h-28 bg-orange-400 flex items-center justify-center">
            <EnvelopeIcon class="text-white h-20 w-20"/>
        </div>
        <div class="px-4 py-5 sm:p-6">
            <div class="text-3xl my-7 font-semibold">Kyle Anthony F. Nierras</div>
            <div class="flex flex-row items-center gap-5">
                <div class="bg-gray-500 rounded-full p-2 inline-flex items-center justify-center">
                    <EnvelopeIcon class="text-white h-6 w-6"/>
                </div>
                <div>
                    kyleanthony47@gmail.com
                </div>
            </div>
        </div>
    </div>
</template>