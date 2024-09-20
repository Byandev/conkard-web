<script setup lang="ts">
import ChooseTheme from '~/components/card/ChooseTheme.vue';
import { useFetchFieldTypes } from '~/composables/useFetchFieldTypes';
import { useNewCardStore } from '~/store/newCardStore';
import { useCardStore } from '~/store/cardStore';
import { useCurrentCard } from '~/composables/useCurrentCard';

definePageMeta({ layout: 'dashboard-layout' });

interface Card {
    id: number;
    type: { name: string; category: string };
    value: string;
    label?: string | null;
}

const newCardStore = useNewCardStore();
const { addLabel, addJobField, addDepartmentField, addCompanyNameField, addOrUpdateGeneralField, addOrUpdateSocialField, addOrUpdateBusinessField, addOrUpdateMessagingField } = newCardStore;
const { label } = storeToRefs(newCardStore);
const { fetchData, fieldTypes } = useFetchFieldTypes();
const { currentCard, currentId, currentLabel, setLoading, isLoading } = useCardStore();
const { fetchCards } = useCurrentCard();

const isModalOpen = ref(false);
const ModalTitle = ref('Name');
const isEdit = ref(true);
const previewColor = ref('#FF5733');

const companyImage = ref<string>('');
const companyImageCoordinates = ref<string>('');
const profilePicture = ref<string>('');
const profilePictureCoordinates = ref<string>('');
const coverPhoto = ref<string>('');
const coverPhotoCoordinates = ref<string>('');

const getJobEdit = computed(() => currentCard?.find(card => card.type.name === "Job Title"));
const getDepartment = computed(() => currentCard?.find(card => card.type.name === "Department"));
const getCompanyName = computed(() => currentCard?.find(card => card.type.name === "Company Name"));

const getFieldsByCategory = (category: string) => computed(() => currentCard?.filter(card => card.type.category === category) || []);

const getGeneral = getFieldsByCategory("GENERAL");
const getSocial = getFieldsByCategory("SOCIAL");
const getMessaging = getFieldsByCategory("MESSAGING");
const getBusiness = getFieldsByCategory("BUSINESS");

const mapAndAddFields = (fields: ReturnType<typeof getFieldsByCategory>, addFieldFunction: (field: { id: number; name: string; value: string; label: string }) => void) => {
    fields.value?.map((field: Card) => ({
        id: field.id,
        name: field.type.name,
        value: field.value,
        label: field.label || ''
    })).forEach(addFieldFunction);
};

const router = useRouter();

onMounted(async () => {
    if (currentId) {
        try {
            setLoading(true);
            fetchData();
            await fetchCards(currentId);
        } catch (error) {
            console.log('Error', error);
        } finally {
            setLoading(false);
        }
    }

    // Navigate to /dashboard/cards/personal on page reload when card is empty
    if (currentCard.length === 0 && currentId == null)
        router.push('/dashboard/cards/personal');

    addLabel(currentLabel);
    if (getJobEdit.value) addJobField({ value: getJobEdit.value.value || '' });
    if (getDepartment.value) addDepartmentField({ value: getDepartment.value.value || " " });
    if (getCompanyName.value) addCompanyNameField({ value: getCompanyName.value.value || " " });

    if (getGeneral.value?.length) mapAndAddFields(getGeneral, addOrUpdateGeneralField);
    if (getSocial.value?.length) mapAndAddFields(getSocial, addOrUpdateSocialField);
    if (getMessaging.value?.length) mapAndAddFields(getMessaging, addOrUpdateMessagingField);
    if (getBusiness.value?.length) mapAndAddFields(getBusiness, addOrUpdateBusinessField);
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
            <div v-if="isLoading" class="animate-pulse px-5 md:px-10 my-7">
                <div class="h-6 bg-gray-200 rounded w-3/4 mb-4" />
                <div class="h-6 bg-gray-200 rounded w-1/2 mb-4" />
                <div class="h-6 bg-gray-200 rounded w-1/4 mb-4" />
            </div>
            <div v-else class="w-full md:max-w-[580px] flex flex-col gap-7">
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