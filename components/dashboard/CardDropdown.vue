<template>
    <Menu as="div" class="relative inline-block text-left">
        <div class="flex justify-center items-center">
            <MenuButton
                class="inline-flex justify-center items-center gap-x-1.5 rounded-md bg-white text-sm font-semibold text-gray-900 shadow-sm ring-inset ring-gray-300 hover:bg-gray-50 p-2">
                <PlusCircleIcon class="h-7 w-7 text-gray-500" aria-hidden="true" />
            </MenuButton>
        </div>

        <transition enter-active-class="transition ease-out duration-100"
            enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100"
            leave-active-class="transition ease-in duration-75" leave-from-class="transform opacity-100 scale-100"
            leave-to-class="transform opacity-0 scale-95">
            <MenuItems
                class="absolute left-0 z-50 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div class="px-4 py-3">
                    <p class="truncate text-base font-medium text-gray-900">Who is this card for?</p>
                </div>
                <div class="py-1">
                    <MenuItem v-slot="{ active }">
                    <NuxtLink to="/dashboard/cards/new"
                        :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-sm']">
                        Me
                    </NuxtLink>
                    </MenuItem>
                </div>
            </MenuItems>
        </transition>
    </Menu>
</template>

<script setup>
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
import { PlusCircleIcon } from '@heroicons/vue/24/solid';
</script>