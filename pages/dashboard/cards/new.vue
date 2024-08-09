<script setup lang="ts">
import ChooseTheme from '~/components/card/ChooseTheme.vue';

definePageMeta({
  layout: 'dashboard-layout',
})

var isModalOpen = ref(false)
var ModalTitle = ref('Name')
</script>

<template>
  <div class="h-full">
    <Tabs class="ml-10" />
    <div class="flex flex-col md:flex-row h-full gap-5 p-4 md:p-10">
      <div class="flex flex-col gap-7 w-full md:w-1/3">
        <section class="grid grid-cols-1 gap-4">
          <CardPreview @click="isModalOpen = true" />
          <AddModal :title="ModalTitle" :open="isModalOpen" @update:open="isModalOpen = $event">
            <ModalContent :ModalTitle="ModalTitle" />
          </AddModal>
        </section>
      </div>
      <div class="w-full md:max-w-[580px] flex flex-col gap-7">
        <section class="px-10 py-7 w-full bg-white drop-shadow-xl rounded-xl">
          <TextInput label="Label this card" input-name="card-label" placeholder="Label this card" input-type="text" />
        </section>
        <section class="px-10 py-7 w-full bg-white drop-shadow-xl rounded-xl">
          <AddImages />
        </section>
        <section class="px-10 py-7 w-full bg-white drop-shadow-xl rounded-xl">
          <ChooseTheme />
        </section>
        <section class="px-10 py-7 w-full bg-white drop-shadow-xl rounded-xl">
          <AddDetails @update:title="ModalTitle = $event" @update:open="isModalOpen = $event" />
        </section>
      </div>
    </div>
  </div>
</template>

<style scoped="true"></style>