<script lang="ts" setup>
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
  ChatBubbleBottomCenterIcon,
  Cog6ToothIcon,
  IdentificationIcon,
  XMarkIcon,
} from '@heroicons/vue/24/solid';
import { ChevronDownIcon } from '@heroicons/vue/20/solid';
import { authStore } from '~/store/auth';
import { useCardStore } from '~/store/cardStore';

interface NavigationItem {
  name: string;
  href: string;
  active: string[];
  icon: any;
}

interface UserNavigationItem {
  name: string;
  href: string;
}

const route = useRoute();
const { cardId } = storeToRefs(useCardStore());
const { user } = authStore();
const sidebarOpen = ref(false);

const navigation: NavigationItem[] = [
  { name: 'Cards', href: '/dashboard', active: ['/dashboard', '/cards/create', `/cards/${cardId.value}/edit`], icon: IdentificationIcon },
];

const lowerNavigation: NavigationItem[] = [
  { name: 'Contacts', href: '#', active: [], icon: ChatBubbleBottomCenterIcon },
];

const userNavigation: UserNavigationItem[] = [
  { name: 'Account', href: '#' },
  { name: 'Log out', href: '#' },
];


const isActiveRoute = (active: string[]) => {
  return active.includes(route.path);
};
</script>

<template>
  <div class="app h-screen">
    <div>
      <TransitionRoot as="template" :show="sidebarOpen">
        <Dialog class="relative z-50 2xl:hidden" @close="sidebarOpen = false">
          <TransitionChild
as="template" enter="transition-opacity ease-linear duration-300" enter-from="opacity-0"
            enter-to="opacity-100" leave="transition-opacity ease-linear duration-300" leave-from="opacity-100"
            leave-to="opacity-0">
            <div class="fixed inset-0 bg-gray-900/80" />
          </TransitionChild>

          <div class="fixed inset-0 flex">
            <TransitionChild
as="template" enter="transition ease-in-out duration-300 transform"
              enter-from="-translate-x-full" enter-to="translate-x-0"
              leave="transition ease-in-out duration-300 transform" leave-from="translate-x-0"
              leave-to="-translate-x-full">
              <DialogPanel class="relative mr-16 flex w-full max-w-xs flex-1">
                <TransitionChild
as="template" enter="ease-in-out duration-300" enter-from="opacity-0"
                  enter-to="opacity-100" leave="ease-in-out duration-300" leave-from="opacity-100" leave-to="opacity-0">
                  <div class="absolute left-full top-0 flex w-16 justify-center pt-5">
                    <button type="button" class="-m-2.5 p-2.5" @click="sidebarOpen = false">
                      <span class="sr-only">Close sidebar</span>
                      <XMarkIcon class="h-6 w-6 text-white" aria-hidden="true" />
                    </button>
                  </div>
                </TransitionChild>
                <!-- Sidebar component, swap this element with another sidebar if you like -->

                <div class="flex grow flex-col gap-y-5 bg-gray-600 px-6 py-4">
                  <div class="flex flex-col h-16 gap-5 shrink-0 items-center">
                    <div class="flex flex-col items-center">
                      <img
                        src="https://upload.wikimedia.org/wikipedia/commons/d/d5/Tailwind_CSS_Logo.svg"
                        alt="Dummy Logo" width="40" height="40">
                      <h1 class="text-white text-lg font-bold">Conkard</h1>
                    </div>

                    <nav class="flex flex-1 flex-col w-full">
                      <ul role="list" class="flex flex-1 flex-col gap-y-3">

                        <li>
                          <ul role="list" class="-mx-2 space-y-1">
                            <li v-for="item in navigation" :key="item.name">
                              <a
                                :href="item.href"
                                :class="[isActiveRoute(item.active) ? 'bg-gray-700 text-white' : 'text-white hover:bg-gray-700 hover:text-white', 'group flex gap-x-3 rounded-md p-2 text-xs font-semibold leading-6']">
                                <component
                                  :is="item.icon"
                                  :class="[isActiveRoute(item.active) ? 'text-white' : 'text-white group-hover:text-white', 'h-5 w-5 shrink-0']"
                                  aria-hidden="true" />
                                {{ item.name }}
                              </a>
                            </li>
                          </ul>
                        </li>

                        <li>
                          <ul role="list" class="-mx-2 mt-2 space-y-1">
                            <li v-for="item in lowerNavigation" :key="item.name">
                              <NuxtLink
                                :to="item.href"
                                :class="[isActiveRoute(item.active) ? 'bg-gray-700 text-gray-600' : 'text-white hover:bg-gray-700 hover:text-white', 'group flex gap-x-3 rounded-md p-2 text-xs font-normal leading-6']">
                                <component
                                  :is="item.icon"
                                  :class="[isActiveRoute(item.active) ? 'text-white' : 'text-white group-hover:text-white', 'h-5 w-5 shrink-0']"
                                  aria-hidden="true" />
                                {{ item.name }}
                              </NuxtLink>
                            </li>
                          </ul>
                        </li>

                        <li
                          class="mt-auto border border-gray-400 px-5 rounded-md hover:border-gray-700 hover:bg-gray-100 group">
                          <a
                            href="#"
                            class="-mx-2 flex items-center gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-gray-400 hover:text-red-400 whitespace-nowrap">
                            <Cog6ToothIcon
                              class="h-5 w-5 shrink-0 text-gray-400 group-hover:text-red-300"
                              aria-hidden="true" />
                            Upgrade account
                          </a>
                        </li>
                      </ul>
                    </nav>
                  </div>
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
          <div class="flex gap-2 h-14 shrink-0 items-center flex-col">
            <img
src="https://upload.wikimedia.org/wikipedia/commons/d/d5/Tailwind_CSS_Logo.svg" alt="Dummy Logo"
              width="40" height="40">
            <h1 class=" text-lg font-bold">Conkard</h1>
          </div>

          <!-- Profile dropdown -->
          <Menu as="div" class="relative items-center">
            <MenuButton
id="user-menu-button"
              class="flex border-2 rounded-md w-full items-center px-2 py-2 justify-between">
              <span class="sr-only">Open user menu</span>
              <div class="flex flex-row items-center">
                <img
class="h-7 w-7 rounded-full bg-gray-50"
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  alt="">
                <span class="ml-4 text-sm text-start font-semibold leading-6 text-gray-900" aria-hidden="true">{{
                  user.name }}</span>
              </div>
              <span class="hidden 2xl:flex 2xl:items-between">
                <ChevronDownIcon class="ml-2 h-5 w-5 text-gray-400" aria-hidden="true" />
              </span>
            </MenuButton>
            <transition
enter-active-class="transition ease-out duration-100"
              enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100"
              leave-active-class="transition ease-in duration-75" leave-from-class="transform opacity-100 scale-100"
              leave-to-class="transform opacity-0 scale-95">
              <MenuItems
                class="absolute right-0 z-10 mt-2.5 w-full origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
                <!-- Name Section -->
                <div class="px-3 py-2 flex flex-row items-center gap-3">

                  <img
class="h-8 w-8 rounded-full bg-gray-50"
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    alt="">

                  <div class="flex items-start flex-col">
                    <span class="text-sm font-semibold leading-6 text-gray-900" aria-hidden="true">{{
                      user.name }}</span>
                    <div>
                      <span class="text-xs font-semibold leading-6 text-gray-500" aria-hidden="true">Free Plan</span>

                      <span
class="mx-1 text-xs font-extrabold leading-6 text-gray-500"
                        aria-hidden="true">&centerdot;</span>

                      <span class="text-xs font-semibold leading-6 text-gray-500" aria-hidden="true">
                        2 cards</span>

                    </div>
                  </div>
                </div>
                <MenuItem v-for="item in userNavigation" :key="item.name" v-slot="{ active }">
                <NuxtLink
:to="item.href"
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
                    <NuxtLink
                      :to="item.href"
                      :class="[isActiveRoute(item.active) ? 'bg-gray-200 text-gray-600' : 'text-gray-600 hover:bg-gray-200 hover:text-gray-600', 'group flex items-center gap-x-3 rounded-md p-2 text-xs font-medium leading-6']">
                      <component
                        :is="item.icon"
                        :class="[isActiveRoute(item.active) ? 'text-gray-600' : 'text-gray-600 group-hover:text-gray-600', 'h-5 w-5 shrink-0']"
                        aria-hidden="true" />
                      {{ item.name }}
                    </NuxtLink>
                  </li>
                </ul>
              </li>

              <li>
                <ul role="list" class="-mx-2 space-y-1">
                  <li v-for="item in lowerNavigation" :key="item.name">
                    <NuxtLink
                      :to="item.href"
                      :class="[isActiveRoute(item.active) ? 'bg-gray-200 text-gray-600' : 'text-gray-600 hover:bg-gray-200 hover:text-gray-600', 'group flex items-center gap-x-3 rounded-md p-2 text-xs font-medium leading-6']">
                      <component
                        :is="item.icon"
                        :class="[isActiveRoute(item.active) ? 'text-gray-600' : 'text-gray-600 group-hover:text-gray-600', 'h-5 w-5 shrink-0']"
                        aria-hidden="true" />
                      {{ item.name }}
                    </NuxtLink>
                  </li>
                </ul>
              </li>

              <li class="mt-auto border border-gray-400 px-5 rounded-md hover:border-gray-700 hover:bg-gray-100 group">
                <a
                  href="#"
                  class="-mx-2 flex items-center gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-gray-400 hover:text-red-400 whitespace-nowrap">
                  <Cog6ToothIcon class="h-5 w-5 shrink-0 text-gray-400 group-hover:text-red-300" aria-hidden="true" />
                  Upgrade account
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

        </div>

        <main class="py-2">
          <div class="px-4 sm:px-6 2xl:px-8">
            <slot />
          </div>
        </main>
      </div>
    </div>
  </div>
</template>