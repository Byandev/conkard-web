<script setup lang="ts">
import { useFieldTypeStore } from '~/store/fieldTypeStore';
import { useCardStore } from '~/store/cardStore';

definePageMeta({
  layout: 'dashboard-layout',
});

const { setLoading } = useCardStore();
const { loading } = storeToRefs(useCardStore());
const { fetchFieldTypes } = useFieldTypeStore();

onMounted(async () => {
  try {
    setLoading(true);
    await fetchFieldTypes();
  } catch (error) {
    console.error('Error', error);
  } finally {
    setLoading(false);
  }
});
</script>

<template>
  <div class="h-full animate-fade-in">
    <h1 class="my-5 mx-3 text-2xl font-semibold">Create Card</h1>
    <div class="mr-0 lg:mr-52">
      <div class="w-full flex justify-end">
        <Button
          :is-wide="false" :is-loading="loading" text="Create" background="gray" foreground="white"
          type="submit" />
      </div>

      <div class="flex flex-col lg:flex-row w-full h-full gap-5 p-4 md:py-5 md:px-3">
        <div class="flex flex-col gap-7 w-full lg:w-2/5">
          <div class="grid grid-cols-1 gap-4">
            <CardEditPreview />
            <AddModal>
              <AddField />
            </AddModal>
          </div>
        </div>

        <div class="w-full lg:w-3/5 flex flex-col gap-7 transition-all duration-300">
          <div class="px-5 py-7 w-full bg-white drop-shadow-xl rounded-xl transition-all duration-300">
            <h2 class="mb-5 font-semibold">Card Label</h2>
            <input class="w-full mt-2 p-2 border border-gray-300 rounded-md">
          </div>

          <div class="px-5 py-7 w-full bg-white drop-shadow-xl rounded-xl transition-all duration-300">
            <h2 class="mb-5 font-semibold">Images</h2>
          </div>

          <div class="px-5 py-7 w-full bg-white drop-shadow-xl rounded-xl transition-all duration-300">
            <h2 class="mb-5 font-semibold">Add your Details</h2>
            <FieldCategoryList />
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import 'tailwindcss/utilities';
</style>