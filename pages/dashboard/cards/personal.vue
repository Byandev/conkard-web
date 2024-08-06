<script setup lang="ts">
definePageMeta({
  layout: 'dashboard-layout',
})

const { $api } = useNuxtApp();
import { PlusCircleIcon } from '@heroicons/vue/24/solid'

const fetchData = async () => {
  try {
    const response = await $api('v1/cards');
    console.log(response);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

onMounted(() => {
  fetchData();
});
</script>

<template>
  <div class="h-full">
    <div class="flex flex-row h-full gap-3">
      <div class="flex flex-col gap-7">
        <div class="flex flex-row items-center justify-center gap-2 mt-10">
          <h1 class="text-3xl font-normal">Cards</h1>
          <PlusCircleIcon class="mt-2 p-0 size-6 text-gray-900" />
        </div>
        <div class="flex flex-col gap-3">
          <h2>Work</h2>
          <h2>Card1</h2>
        </div>
      </div>
      <div class="p-10 w-full">
        <CardTabs />
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
          <DashboardCard class="m-6 w-96" />
        </div>
      </div>

    </div>
  </div>
</template>

<style scoped="true"></style>