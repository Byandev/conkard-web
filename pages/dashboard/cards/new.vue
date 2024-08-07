<script setup lang="ts">
import ChooseTheme from '~/components/card/ChooseTheme.vue';

definePageMeta({
  layout: 'dashboard-layout',
})
</script>

<template>
  <div class="h-full">
    <CardTabs class="ml-10" />
    <div class="flex flex-col md:flex-row h-full gap-5 p-4 md:p-10">
      <div class="flex flex-col gap-7 w-full md:w-1/3">
        <div class="grid grid-cols-1 gap-4">
          <CardPreview />
        </div>
      </div>
      <div class="w-full md:max-w-[580px] flex flex-col gap-7">
        <div class="px-10 py-7 w-full bg-white drop-shadow-xl rounded-xl">
          <TextInput label="Label this card" input-name="card-label" placeholder="Label this card" input-type="text" />
        </div>
        <div class="px-10 py-7 w-full bg-white drop-shadow-xl rounded-xl">
          <AddImages />
        </div>
        <div class="px-10 py-7 w-full bg-white drop-shadow-xl rounded-xl">
          <ChooseTheme />
        </div>
        <div class="px-10 py-7 w-full bg-white drop-shadow-xl rounded-xl">
          <AddDetails />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped="true"></style>