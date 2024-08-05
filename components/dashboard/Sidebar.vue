<script setup lang="ts">
import { ref } from 'vue'
import {
    Dialog,
    DialogPanel,
    Menu,
    MenuButton,
    MenuItem,
    MenuItems,
    TransitionChild,
    TransitionRoot,
} from '@headlessui/vue'
import {
    Bars3Icon,
    PencilSquareIcon,
    ChatBubbleBottomCenterIcon,
    Cog6ToothIcon,
    EnvelopeIcon,
    IdentificationIcon,
    PhotoIcon,
    TrashIcon,
    ShareIcon,
    ShoppingBagIcon,
    XMarkIcon,
} from '@heroicons/vue/24/outline'
import { ChevronDownIcon, MagnifyingGlassIcon } from '@heroicons/vue/20/solid'
import { authStore } from '~/store/auth';

const navigation = [
    { name: 'Cards', href: '/dashboard/cards-page', icon: IdentificationIcon },
    { name: 'Email Signature', href: '#', icon: EnvelopeIcon },
    { name: 'Virtual Backgrounds', href: '#', icon: PhotoIcon },
    { name: 'Accessories', href: '#', icon: ShoppingBagIcon },
]

const lowerNavigation = [
    { name: 'Contacts', href: '#', icon: ChatBubbleBottomCenterIcon },
]

const userNavigation = [
    { name: 'Upgrade Conkard plan', href: '#' },
    { name: 'Account', href: '#' },
    { name: 'Log out', href: '#' },
]

const route = useRoute()

const {user} = authStore()

const isActiveRoute = (href: string) => {
    return route.path === href
}

const sidebarOpen = ref(false)
</script>

<template>

    <div>
        <TransitionRoot as="template" :show="sidebarOpen">
            <Dialog class="relative z-50 lg:hidden" @close="sidebarOpen = false">
                <TransitionChild as="template" enter="transition-opacity ease-linear duration-300"
                    enter-from="opacity-0" enter-to="opacity-100" leave="transition-opacity ease-linear duration-300"
                    leave-from="opacity-100" leave-to="opacity-0">
                    <div class="fixed inset-0 bg-gray-900/80" />
                </TransitionChild>

                <div class="fixed inset-0 flex">
                    <TransitionChild as="template" enter="transition ease-in-out duration-300 transform"
                        enter-from="-translate-x-full" enter-to="translate-x-0"
                        leave="transition ease-in-out duration-300 transform" leave-from="translate-x-0"
                        leave-to="-translate-x-full">
                        <DialogPanel class="relative mr-16 flex w-full max-w-xs flex-1">
                            <TransitionChild as="template" enter="ease-in-out duration-300" enter-from="opacity-0"
                                enter-to="opacity-100" leave="ease-in-out duration-300" leave-from="opacity-100"
                                leave-to="opacity-0">
                                <div class="absolute left-full top-0 flex w-16 justify-center pt-5">
                                    <button type="button" class="-m-2.5 p-2.5" @click="sidebarOpen = false">
                                        <span class="sr-only">Close sidebar</span>
                                        <XMarkIcon class="h-6 w-6 text-white" aria-hidden="true" />
                                    </button>
                                </div>
                            </TransitionChild>
                            <!-- Sidebar component, swap this element with another sidebar if you like -->
                            <div class="flex grow flex-col gap-y-5 overflow-y-auto bg-gray-600 px-6 pb-4">
                                <div class="flex h-16 shrink-0 items-center">
                                    <img class="h-8 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=white"
                                        alt="Your Company" />
                                </div>
                                <nav class="flex flex-1 flex-col">
                                    <ul role="list" class="flex flex-1 flex-col gap-y-7">
                                        <li>
                                            <ul role="list" class="-mx-2 space-y-1">
                                                <li v-for="item in navigation" :key="item.name">
                                                    <a :href="item.href"
                                                        :class="[isActiveRoute(item.href) ? 'bg-gray-700 text-white' : 'text-indigo-200 hover:bg-gray-700 hover:text-white', 'group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6']">
                                                        <component :is="item.icon"
                                                            :class="[isActiveRoute(item.href) ? 'text-white' : 'text-indigo-200 group-hover:text-white', 'h-6 w-6 shrink-0']"
                                                            aria-hidden="true" />
                                                        {{ item.name }}
                                                    </a>
                                                </li>
                                            </ul>
                                        </li>
                                        <li>
                                            <!-- Horizontal Separator -->
                                            <div class="h-px w-full bg-white my-2" aria-hidden="true"></div>
                                            <ul role="list" class="-mx-2 mt-2 space-y-1">
                                                <li v-for="item in lowerNavigation" :key="item.name">
                                                    <NuxtLink :to="item.href"
                                                        :class="[isActiveRoute(item.href) ? 'bg-gray-700 text-gray-600' : 'text-white hover:bg-gray-700 hover:text-white', 'group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6']">
                                                        <component :is="item.icon"
                                                            :class="[isActiveRoute(item.href) ? 'text-white' : 'text-white group-hover:text-white', 'h-6 w-6 shrink-0']"
                                                            aria-hidden="true" />
                                                        {{ item.name }}
                                                    </NuxtLink>
                                                </li>

                                            </ul>
                                        </li>
                                        <li class="mt-auto">
                                            <a href="#"
                                                class="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-indigo-200 hover:bg-indigo-700 hover:text-white">
                                                <Cog6ToothIcon
                                                    class="h-6 w-6 shrink-0 text-indigo-200 group-hover:text-white"
                                                    aria-hidden="true" />
                                                Settings
                                            </a>
                                        </li>
                                    </ul>
                                </nav>
                            </div>
                        </DialogPanel>
                    </TransitionChild>
                </div>
            </Dialog>
        </TransitionRoot>

        <!-- Static sidebar for desktop -->
        <div class="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">

            <!-- Sidebar component, swap this element with another sidebar if you like -->
            <div class="mt-5 flex grow flex-col gap-y-5 overflow-y-auto bg-white px-6 pb-4 drop-shadow">
                <div class="flex gap-2 h-16 shrink-0 items-center">
                    <img class="h-8 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=black"
                        alt="Your Company" />
                    <h1 class=" text-2xl font-bold">Conkard</h1>
                </div>

                <!-- Profile dropdown -->
                <Menu as="div" class="relative items-center">
                    <MenuButton class="flex border-2 rounded-lg w-full items-center p-2.5 justify-between"
                        id="user-menu-button">
                        <span class="sr-only">Open user menu</span>
                        <div class="flex flex-row items-center">
                            <img class="h-8 w-8 rounded-full bg-gray-50"
                                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                alt="" />
                            <span class="ml-4 text-sm font-semibold leading-6 text-gray-900" aria-hidden="true">{{ user.name }}</span>
                        </div>
                        <span class="hidden lg:flex lg:items-between">
                            <ChevronDownIcon class="ml-2 h-5 w-5 text-gray-400" aria-hidden="true" />
                        </span>
                    </MenuButton>
                    <transition enter-active-class="transition ease-out duration-100"
                        enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100"
                        leave-active-class="transition ease-in duration-75"
                        leave-from-class="transform opacity-100 scale-100"
                        leave-to-class="transform opacity-0 scale-95">
                        <MenuItems
                            class="absolute right-0 z-10 mt-2.5 w-full origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
                            <!-- Name Section -->
                            <div class="px-3 py-2 flex flex-row items-center gap-3">

                                <img class="h-8 w-8 rounded-full bg-gray-50"
                                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                    alt="" />

                                <div class="flex items-start flex-col">
                                    <span class="text-sm font-semibold leading-6 text-gray-900" aria-hidden="true">{{ user.name }}</span>
                                    <div>
                                        <span class="text-xs font-semibold leading-6 text-gray-500"
                                            aria-hidden="true">Free Plan</span>

                                        <span class="mx-1 text-xs font-extrabold leading-6 text-gray-500"
                                            aria-hidden="true">&centerdot;</span>

                                        <span class="text-xs font-semibold leading-6 text-gray-500" aria-hidden="true">
                                            2 cards</span>

                                    </div>
                                </div>
                            </div>
                            <!-- Horizontal Separator -->
                            <div class="h-px w-full bg-gray-900/10 my-2" aria-hidden="true"></div>
                            <MenuItem v-for="item in userNavigation" :key="item.name" v-slot="{ active }">
                            <NuxtLink :to="item.href"
                                :class="[active ? 'bg-gray-50' : '', 'block px-3 py-1 text-sm leading-6 text-gray-900']">
                                {{ item.name }}
                            </NuxtLink>
                            </MenuItem>
                        </MenuItems>
                    </transition>
                </Menu>

                <nav class="flex flex-1 flex-col">
                    <ul role="list" class="flex flex-1 flex-col gap-y-7">
                        <li>
                            <ul role="list" class="-mx-2 space-y-1">
                                <li v-for="item in navigation" :key="item.name">
                                    <NuxtLink :to="item.href"
                                        :class="[isActiveRoute(item.href) ? 'bg-gray-200 text-gray-600' : 'text-gray-600 hover:bg-gray-200 hover:text-gray-600', 'group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6']">
                                        <component :is="item.icon"
                                            :class="[isActiveRoute(item.href) ? 'text-gray-600' : 'text-gray-600 group-hover:text-gray-600', 'h-6 w-6 shrink-0']"
                                            aria-hidden="true" />
                                        {{ item.name }}
                                    </NuxtLink>
                                </li>
                            </ul>
                        </li>

                        <!-- Horizontal Separator -->
                        <div class="h-px w-full bg-gray-900/10" aria-hidden="true"></div>

                        <li>
                            <ul role="list" class="-mx-2 space-y-1">
                                <li v-for="item in lowerNavigation" :key="item.name">
                                    <NuxtLink :to="item.href"
                                        :class="[isActiveRoute(item.href) ? 'bg-gray-200 text-gray-600' : 'text-gray-600 hover:bg-gray-200 hover:text-gray-600', 'group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6']">
                                        <component :is="item.icon"
                                            :class="[isActiveRoute(item.href) ? 'text-gray-600' : 'text-gray-600 group-hover:text-gray-600', 'h-6 w-6 shrink-0']"
                                            aria-hidden="true" />
                                        {{ item.name }}
                                    </NuxtLink>
                                </li>
                            </ul>
                        </li>
                        <li class="mt-auto">
                            <a href="#"
                                class="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-indigo-200 hover:bg-indigo-700 hover:text-white">
                                <Cog6ToothIcon class="h-6 w-6 shrink-0 text-indigo-200 group-hover:text-white"
                                    aria-hidden="true" />
                                Settings
                            </a>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>

        <div class="lg:pl-72">
            <div
                class="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
                <button type="button" class="-m-2.5 p-2.5 text-gray-700 lg:hidden" @click="sidebarOpen = true">
                    <span class="sr-only">Open sidebar</span>
                    <Bars3Icon class="h-6 w-6" aria-hidden="true" />
                </button>

                <!-- Separator -->
                <div class="h-6 w-px bg-gray-900/10 lg:hidden" aria-hidden="true" />

                <div class="flex flex-1 gap-x-4 self-stretch lg:gap-x-6 py-2 justify-between">
                    <div class="flex flex-row gap-x-4 self-stretch lg:gap-x-6">
                        <ButtonIcon :icon="PencilSquareIcon" text="Edit" background="gray" foreground="white" />
                        <ButtonIcon :icon="TrashIcon" text="Delete" background="white" foreground="gray" />
                    </div>
                    <ButtonIcon :icon="ShareIcon" text="Share card" background="gray" foreground="white" />
                </div>
            </div>

            <main class="py-2">
                <div class="px-4 sm:px-6 lg:px-8">
                    <slot></slot>
                </div>
            </main>
        </div>
    </div>
</template>