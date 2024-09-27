<script setup lang="ts">
import ChooseTheme from '~/components/card/ChooseTheme.vue';
import { useCardFieldTypes } from '~/composables/useCardFieldTypes';
import { useCardStore } from '~/store/cardStore';
import { useFieldTypeStore } from '~/store/fieldTypeStore';

definePageMeta({
  layout: 'dashboard-layout',
});

const { label, isModalOpen, currentCategory } = storeToRefs(useCardStore());
const { setLoading, addField, resetFields } = useCardStore();
const { fieldTypes } = storeToRefs(useFieldTypeStore());
const { fetchFieldTypesData } = useCardFieldTypes();

const companyImage = ref<string>('');
const companyImageCoordinates = ref<string>('');

const profilePicture = ref<string>('');
const profilePictureCoordinates = ref<string>('');

const coverPhoto = ref<string>('');
const coverPhotoCoordinates = ref<string>('');

onMounted( async () => {
  try {
    setLoading(true);
    resetFields();
    fetchFieldTypesData();
  } catch (error) {
    console.log('Error', error);
  } finally {
    setLoading(false);
  }
});
</script>

<template>
  <div class="h-full animate-fade-in">
    <Tabs class="ml-10" />
    <div class="flex flex-col lg:flex-row w-full lg:w-fit h-full gap-5 p-4 md:py-10 md:px-3">
      <div class="flex flex-col gap-7 w-full md:w-1/8">
        <section class="grid grid-cols-1 gap-4">
          <CardPreview
            :company-image="companyImage" :company-image-coordinates="companyImageCoordinates"
            :profile-picture="profilePicture" :profile-picture-coordinates="profilePictureCoordinates"
            :cover-photo="coverPhoto" :cover-photo-coordinates="coverPhotoCoordinates" />
          <AddModal :open="isModalOpen && currentCategory != 'IMAGE'">
            <ModalContent />
          </AddModal>
        </section>
      </div>
      <div class="w-full md:max-w-[580px] flex flex-col gap-7 transition-all duration-300">
        <section class="px-5 py-7 w-full bg-white drop-shadow-xl rounded-xl transition-all duration-300">
          <TextInput
            v-model="label" label="Add Label" input-name="card-label" placeholder="Label this card"
            input-type="text" @update:model-value="addField('label', $event)" />
        </section>
        <section class="px-5 py-7 w-full bg-white drop-shadow-xl rounded-xl transition-all duration-300">
          <AddImages
            @update:company-image="companyImage = $event"
            @update:company-image-coordinates="companyImageCoordinates = $event"
            @update:profile-image="profilePicture = $event"
            @update:profile-image-coordinates="profilePictureCoordinates = $event"
            @update:cover-image="coverPhoto = $event"
            @update:cover-image-coordinates="coverPhotoCoordinates = $event" />
        </section>
        <section class="px-5 py-7 w-full bg-white drop-shadow-xl rounded-xl transition-all duration-300">
          <ChooseTheme />
        </section>
        <section class="px-5 py-7 w-full bg-white drop-shadow-xl rounded-xl transition-all duration-300">
          <AddDetails :field-types="fieldTypes" />
        </section>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import 'tailwindcss/utilities';

@layer utilities {
  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  .animate-fade-in {
    animation: fadeIn 0.5s forwards;
  }
}
</style>