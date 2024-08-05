<script setup lang="ts">
definePageMeta({
  layout: 'dashboard-layout',
})

import { PlusCircleIcon } from '@heroicons/vue/24/outline'
</script>

<template>
  <div class="h-full">
    <div class="flex flex-row h-full gap-3">
      <div class="flex flex-col gap-7">
        <div class="flex flex-row items-center gap-2 mt-10">
          <h1 class="text-3xl font-normal">Cards</h1>
          <PlusCircleIcon class="m-0 p-0 size-6 text-gray-500" />
        </div>
        <div class="flex flex-col gap-3">
          <h2>Work</h2>
          <h2>Card1</h2>
        </div>
      </div>
      <div class="p-10 w-full">
        <CardTabs />
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
            <DashboardCard class="m-6"/>
        </div>
      </div>
      
    </div>
  </div>
</template>

<style scoped="true"></style>