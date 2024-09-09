<script setup lang="ts">
import ChooseTheme from '~/components/card/ChooseTheme.vue';

definePageMeta({
  layout: 'dashboard-layout',
})

const isModalOpen = ref(false)
const ModalTitle = ref('Name')
const isEdit = ref(false)
const currentId = ref(0);
const previewColor = ref('#FF5733')


const companyImage = ref<string>('')
const companyImageCoordinates = ref<string>('');

const profilePicture = ref<string>('')
const profilePictureCoordinates = ref<string>('')

</script>

<template>
  <div class="h-full">
    <Tabs class="ml-10" />
    <div class="flex flex-col md:flex-row h-full gap-5 p-4 md:p-10">
      <div class="flex flex-col gap-7 w-full md:w-1/3">
        <section class="grid grid-cols-1 gap-4">
          <CardPreview :company-image="companyImage" :company-image-coordinates="companyImageCoordinates"
            :profile-picture="profilePicture" :profile-picture-coordinates="profilePictureCoordinates"
            @update:id="currentId = $event" @update:title="ModalTitle = $event" :color="previewColor"
            @update:open="isModalOpen = $event" @update:is-edit="isEdit = $event" />
          <AddModal :title="ModalTitle" :open="isModalOpen" @update:open="isModalOpen = $event">
            <ModalContent :id="currentId" :is-edit="isEdit" @update:open="isModalOpen = false"
              :modal-title="ModalTitle" />
          </AddModal>
        </section>
      </div>
      <div class="w-full md:max-w-[580px] flex flex-col gap-7">
        <section class="px-10 py-7 w-full bg-white drop-shadow-xl rounded-xl">
          <TextInput label="Label this card" input-name="card-label" placeholder="Label this card" input-type="text" />
        </section>
        <section class="px-10 py-7 w-full bg-white drop-shadow-xl rounded-xl">
          <AddImages @update:company-image="companyImage = $event"
            @update:company-image-coordinates="companyImageCoordinates = $event"
            @update:profile-image="profilePicture = $event"
            @update:profile-image-coordinates="profilePictureCoordinates = $event" />
        </section>
        <section class="px-10 py-7 w-full bg-white drop-shadow-xl rounded-xl">
          <ChooseTheme @update:theme="previewColor = $event" />
        </section>
        <section class="px-10 py-7 w-full bg-white drop-shadow-xl rounded-xl">
          <AddDetails @update:id="currentId = $event" @update:is-edit="isEdit = $event"
            @update:title="ModalTitle = $event" @update:open="isModalOpen = $event" />
        </section>
      </div>
    </div>
  </div>
</template>

<style scoped="true"></style>