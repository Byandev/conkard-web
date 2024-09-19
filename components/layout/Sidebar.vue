<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import {
    Dialog,
    DialogPanel,
    Menu,
    MenuButton,
    MenuItem,
    MenuItems,
    TransitionChild,
    TransitionRoot,
} from '@headlessui/vue';
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
    Cog8ToothIcon
} from '@heroicons/vue/24/solid';
import { ChevronDownIcon } from '@heroicons/vue/20/solid';
import { authStore } from '~/store/auth';
import type { ApiErrorResponse } from '~/types/api/response/error';
import type { SaveCardResponse } from '~/types/api/response/saveCard';
import { useCardData } from '~/composables/useCardData';
import { useCardStore } from '~/store/cardStore';
import { useNewCardStore } from '~/store/newCardStore';
import type { ImageDataResponse } from '~/types/api/response/uploadImage';

interface NavigationItem {
    name: string;
    href: string;
    icon: any;
}

interface UserNavigationItem {
    name: string;
    href: string;
}

const navigation: NavigationItem[] = [
    { name: 'Cards', href: '/dashboard/cards/personal', icon: IdentificationIcon },
    { name: 'Email Signature', href: '#', icon: EnvelopeIcon },
    { name: 'Virtual Backgrounds', href: '#', icon: PhotoIcon },
    { name: 'Accessories', href: '#', icon: ShoppingBagIcon },
];

const lowerNavigation: NavigationItem[] = [
    { name: 'Contacts', href: '#', icon: ChatBubbleBottomCenterIcon },
];

const userNavigation: UserNavigationItem[] = [
    { name: 'Upgrade Conkard plan', href: '#' },
    { name: 'Account', href: '#' },
    { name: 'Log out', href: '#' },
];

const route = useRoute();
const router = useRouter();

const { imageField } = storeToRefs(useNewCardStore());

const isDashboardCardsEdit = computed(() => route.path === '/dashboard/cards/edit');
const isDashboardCardsNew = computed(() => route.path === '/dashboard/cards/new');
const isDashboardCardsPersonal = computed(() => route.path === '/dashboard/cards/personal');

const { user } = authStore();

const isActiveRoute = (href: string) => {
    return route.path === href;
};

const sidebarOpen = ref(false);

const { sendRequest: saveCard } = useSubmit<SaveCardResponse, ApiErrorResponse>()
const { sendRequest: uploadImage } = useSubmit<ImageDataResponse, ApiErrorResponse>()

const { cardData } = useCardData();

const handleSaveCard = async () => {
    console.log(cardData.value);

    const cardStore = useCardStore();
    const { currentId } = storeToRefs(cardStore);
    const isNewCard = isDashboardCardsNew.value;
    const url = isNewCard ? '/v1/cards' : `/v1/cards/${currentId.value}`;
    const method = isNewCard ? 'POST' : 'PUT';

    console.log(imageField);

    try {
        const response = await saveCard(url, {
            method,
            body: {
                label: cardData.value.label,
                fields: cardData.value.fields,
            },
        });

        if (isNewCard) {
            const cardId = response.data.id;
            await Promise.all(imageField.value.map(async (item) => {
                console.log(item.image);
                try {
                    const formData = new FormData();
                    formData.append('type', item.type);
                    formData.append('image', item.image);

                    const imageResponse = await uploadImage(`/v1/cards/${cardId}/images`, {
                        method: 'POST',
                        body: formData,
                    });
                    console.log(imageResponse);
                } catch (uploadError) {
                    console.error('Error uploading image:', uploadError);
                }
            }));
        } else {
            console.log(response);
        }
    } catch (error) {
        console.error(error as ApiErrorResponse);
    } finally {
        navigateDashboard();
    }
};

const navigateDashboard = () => {
    router.push('/dashboard/cards/personal');
}; 
</script>

<template>
    <div>
        <TransitionRoot as="template" :show="sidebarOpen">
            <Dialog class="relative z-50 2xl:hidden" @close="sidebarOpen = false">
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
                                        alt="Your Company">
                                </div>
                                <nav class="flex flex-1 flex-col">
                                    <ul role="list" class="flex flex-1 flex-col gap-y-3">
                                        <li>
                                            <ul role="list" class="-mx-2 space-y-1">
                                                <li v-for="item in navigation" :key="item.name">
                                                    <a :href="item.href"
                                                        :class="[isActiveRoute(item.href) ? 'bg-gray-700 text-white' : 'text-white hover:bg-gray-700 hover:text-white', 'group flex gap-x-3 rounded-md p-2 text-xs font-semibold leading-6']">
                                                        <component :is="item.icon"
                                                            :class="[isActiveRoute(item.href) ? 'text-white' : 'text-white group-hover:text-white', 'h-5 w-5 shrink-0']"
                                                            aria-hidden="true" />
                                                        {{ item.name }}
                                                    </a>
                                                </li>
                                            </ul>
                                        </li>
                                        <li>
                                            <!-- Horizontal Separator -->
                                            <div class="h-px w-full bg-white my-2" aria-hidden="true" />
                                            <ul role="list" class="-mx-2 mt-2 space-y-1">
                                                <li v-for="item in lowerNavigation" :key="item.name">
                                                    <NuxtLink :to="item.href"
                                                        :class="[isActiveRoute(item.href) ? 'bg-gray-700 text-gray-600' : 'text-white hover:bg-gray-700 hover:text-white', 'group flex gap-x-3 rounded-md p-2 text-xs font-semibold leading-6']">
                                                        <component :is="item.icon"
                                                            :class="[isActiveRoute(item.href) ? 'text-white' : 'text-white group-hover:text-white', 'h-5 w-5 shrink-0']"
                                                            aria-hidden="true" />
                                                        {{ item.name }}
                                                    </NuxtLink>
                                                </li>

                                            </ul>
                                            <div class="h-px w-full bg-white my-2" aria-hidden="true" />
                                        </li>
                                        <li class="mt-auto border border-gray-400 px-5 rounded-md">
                                            <a href="#"
                                                class="group -mx-2 flex items-center gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-gray-400 hover:bg-gray-700 hover:text-white">
                                                <Cog6ToothIcon
                                                    class="h-6 w-6 shrink-0 text-gray-400 group-hover:text-white"
                                                    aria-hidden="true" />
                                                Upgrade Plan
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
        <div class="hidden 2xl:fixed 2xl:inset-y-0 2xl:z-50 2xl:flex 2xl:w-56 2xl:flex-col">

            <!-- Sidebar component, swap this element with another sidebar if you like -->
            <div class="pt-5 flex grow flex-col gap-y-5 overflow-y-auto bg-white pl-5 pr-5 pb-4 drop-shadow">
                <div class="flex gap-2 h-14 shrink-0 items-center">
                    <img class="h-6 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=black"
                        alt="Your Company">
                    <h1 class=" text-xl font-bold">Conkard</h1>
                </div>

                <!-- Profile dropdown -->
                <Menu as="div" class="relative items-center">
                    <MenuButton id="user-menu-button"
                        class="flex border-2 rounded-md w-full items-center px-2 py-2 justify-between">
                        <span class="sr-only">Open user menu</span>
                        <div class="flex flex-row items-center">
                            <img class="h-7 w-7 rounded-full bg-gray-50"
                                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                alt="">
                            <span class="ml-4 text-sm font-semibold leading-6 text-gray-900" aria-hidden="true">{{
                                user.name }}</span>
                        </div>
                        <span class="hidden 2xl:flex 2xl:items-between">
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
                                    alt="">

                                <div class="flex items-start flex-col">
                                    <span class="text-sm font-semibold leading-6 text-gray-900" aria-hidden="true">{{
                                        user.name }}</span>
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
                            <div class="h-px w-full bg-gray-900/10 my-2" aria-hidden="true" />
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
                    <ul role="list" class="flex flex-1 flex-col gap-y-3">
                        <li>
                            <ul role="list" class="-mx-2 space-y-1">
                                <li v-for="item in navigation" :key="item.name">
                                    <NuxtLink :to="item.href"
                                        :class="[isActiveRoute(item.href) ? 'bg-gray-200 text-gray-600' : 'text-gray-600 hover:bg-gray-200 hover:text-gray-600', 'group flex items-center gap-x-3 rounded-md p-2 text-xs font-medium leading-6']">
                                        <component :is="item.icon"
                                            :class="[isActiveRoute(item.href) ? 'text-gray-600' : 'text-gray-600 group-hover:text-gray-600', 'h-5 w-5 shrink-0']"
                                            aria-hidden="true" />
                                        {{ item.name }}
                                    </NuxtLink>
                                </li>
                            </ul>
                        </li>

                        <!-- Horizontal Separator -->
                        <div class="h-px w-full bg-gray-900/10" aria-hidden="true" />

                        <li>
                            <ul role="list" class="-mx-2 space-y-1">
                                <li v-for="item in lowerNavigation" :key="item.name">
                                    <NuxtLink :to="item.href"
                                        :class="[isActiveRoute(item.href) ? 'bg-gray-200 text-gray-600' : 'text-gray-600 hover:bg-gray-200 hover:text-gray-600', 'group flex items-center gap-x-3 rounded-md p-2 text-xs font-semibold leading-6']">
                                        <component :is="item.icon"
                                            :class="[isActiveRoute(item.href) ? 'text-gray-600' : 'text-gray-600 group-hover:text-gray-600', 'h-5 w-5 shrink-0']"
                                            aria-hidden="true" />
                                        {{ item.name }}
                                    </NuxtLink>
                                </li>
                            </ul>
                        </li>

                        <!-- Horizontal Separator -->
                        <div class="h-px w-full bg-gray-900/10" aria-hidden="true" />

                        <li class="mt-auto border border-gray-400 px-5 rounded-md">
                            <a href="#"
                                class="group -mx-2 flex items-center gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-gray-400 hover:bg-gray-700 hover:text-white">
                                <Cog6ToothIcon class="h-6 w-6 shrink-0 text-gray-400 group-hover:text-white"
                                    aria-hidden="true" />
                                Upgrade Plan
                            </a>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>

        <div class="2xl:pl-56">
            <div
                class="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 2xl:px-8">
                <button type="button" class="-m-2.5 p-2.5 text-gray-700 2xl:hidden" @click="sidebarOpen = true">
                    <span class="sr-only">Open sidebar</span>
                    <Bars3Icon class="h-6 w-6" aria-hidden="true" />
                </button>

                <!-- Separator -->
                <div class="h-6 w-px bg-gray-900/10 2xl:hidden" aria-hidden="true" />

                <!-- Home Dashboard Option -->
                <div v-if="isDashboardCardsPersonal"
                    class="flex flex-1 gap-x-4 self-stretch 2xl:gap-x-6 py-2 justify-between">
                    <div class="flex flex-row gap-x-4 self-stretch 2xl:gap-x-6">
                        <NuxtLink to="/dashboard/cards/edit" class="p-0">
                            <ButtonIcon class="h-full" :icon="PencilSquareIcon" text="Edit" background="gray"
                                foreground="white" />
                        </NuxtLink>
                        <ButtonIcon :icon="TrashIcon" text="Delete" background="white" foreground="gray" />
                    </div>
                    <ButtonIcon :icon="ShareIcon" text="Share card" background="gray" foreground="white" />
                </div>

                <!-- New Card Options -->
                <div v-if="isDashboardCardsNew || isDashboardCardsEdit"
                    class="flex flex-1 gap-x-4 self-stretch 2xl:gap-x-6 py-2 justify-between overflow-x-auto">
                    <div class="flex flex-row gap-x-4 self-stretch 2xl:gap-x-6">
                        <ButtonIcon :icon="Cog8ToothIcon" text="Settings" background="white" foreground="gray" />
                        <ButtonIcon :icon="TrashIcon" text="Delete" background="white" foreground="gray" />
                    </div>
                    <div class="flex flex-row gap-x-4">
                        <Button text="Cancel" background="white" foreground="gray" @click="navigateDashboard" />
                        <ButtonIconIconify icon="material-symbols:save-outline"
                            :text="isDashboardCardsNew ? 'Create' : 'Save'" background="gray" foreground="white"
                            @click="handleSaveCard" />
                    </div>
                </div>
            </div>

            <main class="py-2">
                <div class="px-4 sm:px-6 2xl:px-8">
                    <slot />
                </div>
            </main>
        </div>
    </div>
</template>