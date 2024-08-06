<script setup lang="ts">
import ChooseTheme from '~/components/card/ChooseTheme.vue';

definePageMeta({
  layout: 'dashboard-layout',
})

</script>

<template>
  <div class="h-full">
    <CardTabs class="ml-10" />
    <div class="flex flex-row h-full gap-2 p-10">
      <div class="flex flex-col gap-7 w-1/3">
        <div class="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-4">
          <CardPreview />
        </div>
      </div>
      <div class="w-[580px] flex flex-col gap-10">
        <div class="p-10 w-full bg-white drop-shadow-xl rounded-xl">
          <TextInput label="Label this card" input-name="card-label" placeholder="Label this card" input-type="text" />
        </div>
        <div class="p-10 w-full bg-white drop-shadow-xl rounded-xl ">
          <AddImages />
        </div>
        <div class="p-10 w-full bg-white drop-shadow-xl rounded-xl ">
          <ChooseTheme />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped="true"></style>