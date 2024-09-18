<script setup lang="ts">
import { ref, onMounted } from 'vue';
import ChooseTheme from '~/components/card/ChooseTheme.vue';
import { useFetchFieldTypes } from '~/composables/useFetchFieldTypes';
import { useNewCardStore } from '~/store/newCardStore';
import { useCurrentCard } from '~/composables/useCurrentCard';
import { useCardStore } from '~/store/cardStore';

definePageMeta({
    layout: 'dashboard-layout',
});

const { addLabel, label } = useNewCardStore();
const { fetchData, fieldTypes } = useFetchFieldTypes();
const { fetchCards } = useCurrentCard();
const { currentCard } = useCardStore();

const isModalOpen = ref(false);
const ModalTitle = ref('Name');
const isEdit = ref(true);
const currentId = ref(0);
const previewColor = ref('#FF5733');

const companyImage = ref<string>('');
const companyImageCoordinates = ref<string>('');

const profilePicture = ref<string>('');
const profilePictureCoordinates = ref<string>('');

const coverPhoto = ref<string>('');
const coverPhotoCoordinates = ref<string>('');

onMounted(async () => {
    await fetchData();
    await fetchCards(currentId.value.toString());
    const card = currentCard.value[0]; // Assuming currentCard is an array and we need the first element
    if (card) {
        companyImage.value = card.companyImage || '';
        companyImageCoordinates.value = card.companyImageCoordinates || '';
        profilePicture.value = card.profilePicture || '';
        profilePictureCoordinates.value = card.profilePictureCoordinates || '';
        coverPhoto.value = card.coverPhoto || '';
        coverPhotoCoordinates.value = card.coverPhotoCoordinates || '';
        previewColor.value = card.color || '#FF5733';
        label.value = card.label || '';
    }
});
</script>

<template>
    <div class="h-full">
        <Tabs class="ml-10" />
        <div class="flex flex-col md:flex-row w-fit h-full gap-5 p-4 md:py-10 md:px-3">
            <div class="flex flex-col gap-7 w-full md:w-1/8">
                <section class="grid grid-cols-1 gap-4">
                    <CardPreview :company-image="companyImage" :company-image-coordinates="companyImageCoordinates"
                        :profile-picture="profilePicture" :profile-picture-coordinates="profilePictureCoordinates"
                        :cover-photo="coverPhoto" :cover-photo-coordinates="coverPhotoCoordinates" :color="previewColor"
                        @update:id="currentId = $event" @update:title="ModalTitle = $event"
                        @update:open="isModalOpen = $event" @update:is-edit="isEdit = $event" />
                    <AddModal :title="ModalTitle" :open="isModalOpen" @update:open="isModalOpen = $event">
                        <ModalContent :id="currentId" :field-types="fieldTypes" :is-edit="isEdit"
                            :modal-title="ModalTitle" @update:open="isModalOpen = false" />
                    </AddModal>
                </section>
            </div>
            <div class="w-full md:max-w-[580px] flex flex-col gap-7">
                <section class="px-5 py-7 w-full bg-white drop-shadow-xl rounded-xl">
                    <TextInput v-model="label" label="Edit Label" input-name="card-label" placeholder="Label this card"
                        input-type="text" @update:model-value="addLabel($event)" />
                </section>
                <section class="px-5 py-7 w-full bg-white drop-shadow-xl rounded-xl">
                    <AddImages @update:company-image="companyImage = $event"
                        @update:company-image-coordinates="companyImageCoordinates = $event"
                        @update:profile-image="profilePicture = $event"
                        @update:profile-image-coordinates="profilePictureCoordinates = $event"
                        @update:cover-image="coverPhoto = $event"
                        @update:cover-image-coordinates="coverPhotoCoordinates = $event" />
                </section>
                <section class="px-5 py-7 w-full bg-white drop-shadow-xl rounded-xl">
                    <ChooseTheme @update:theme="previewColor = $event" />
                </section>
                <section class="px-5 py-7 w-full bg-white drop-shadow-xl rounded-xl">
                    <AddDetails :field-types="fieldTypes" @update:id="currentId = $event"
                        @update:is-edit="isEdit = $event" @update:title="ModalTitle = $event"
                        @update:open="isModalOpen = $event" />
                </section>
            </div>
        </div>
    </div>
</template>

<style scoped="true"></style>