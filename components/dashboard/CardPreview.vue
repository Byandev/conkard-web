<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useNewCardStore } from "~/store/newCardStore";
import draggable from "vuedraggable";
import { Preview } from 'vue-advanced-cropper';
import { useCardStore } from '~/store/cardStore';

const props = defineProps<{
  color: string;
  companyImage?: string;
  companyImageCoordinates?: any
  profilePicture?: string;
  profilePictureCoordinates?: any;
  coverPhoto?: string;
  coverPhotoCoordinates?: any;
}>();

interface ComponentData {
  id: number | null;
  value?: string;
  label?: string;
  name?: string;
  category?: string;
}

const newCard = useNewCardStore();
const cardStore = useCardStore();
const { isLoading } = storeToRefs(cardStore);

const { generalField, messagingField, businessField, nameField, jobField, socialField, departmentField, companyNameField, accreditationField, headlineField } = storeToRefs(newCard);

const cardItem = ref<ComponentData[]>([]);

const updateCardItem = () => {
  cardItem.value = [
    ...generalField.value.map(general => ({ id: general.id ?? null, name: general.name, value: general.value, label: general.label, category: 'General' })),
    ...socialField.value.map(social => ({ id: social.id ?? null, name: social.name, value: social.value, category: 'Social' })),
    ...messagingField.value.map(messaging => ({ id: messaging.id ?? null, name: messaging.name, value: messaging.value, category: 'Messaging' })),
    ...businessField.value.map(business => ({ id: business.id ?? null, name: business.name, value: business.value, label: business.label, category: 'Business' })),
  ];
};

// Watch for changes in newCard fields and update cardItem
watch(
  [generalField, socialField, messagingField, businessField],
  updateCardItem,
  { immediate: true, deep: true }
);

const isFieldEmpty = (field: any, keys: string[]) => computed(() => keys.every(key => !field.value?.[key]));

const isNameFieldEmpty = isFieldEmpty(nameField, ['prefix', 'first_name', 'preferred_name', 'middle_name', 'last_name', 'suffix', 'maiden_name', 'pronoun']);
const isJobFieldEmpty = isFieldEmpty(jobField, ['value']);
const isDepartmentFieldEmpty = isFieldEmpty(departmentField, ['value']);
const isCompanyNameEmpty = isFieldEmpty(companyNameField, ['value']);
const isAccreditationFieldEmpty = computed(() => !accreditationField.value?.length);
const isHeadlineFieldEmpty = isFieldEmpty(headlineField, ['value']);

const emit = defineEmits(["update:title", "update:open", "update:isEdit", "update:id"]);

const updateTitle = (title: string) => {
  emit("update:title", title);
  emit("update:open", true);
};

const updateEdit = (title: string, id: number) => {
  emit("update:id", id);
  emit("update:title", title);
  emit("update:open", true);
  emit("update:isEdit", true);
};

const bgColor = computed(() => props.coverPhoto ? 'white' : props.color);

</script>

<template>
  <div class="grid grid-cols-1 gap-4">
    <div
      class="w-[440px] divide-y divide-gray-200 overflow-hidden rounded-xl bg-white md:min-w-[100px] shadow drop-shadow-xl">
      <div class="px-4 py-5 sm:px-6 flex items-center justify-center"
        :class="props.coverPhoto ? 'h-[248px]' : 'h-[100px]'" :style="{ backgroundColor: bgColor }">
        <div>
          <Preview v-if="props?.coverPhoto" :width="440" :height="248" :image="props?.coverPhoto"
            :coordinates="props?.coverPhotoCoordinates" class="preview" />
        </div>
        <div class="absolute left-0 profile-picture-container" :class="props.coverPhoto ? 'mt-52' : ' mt-24'">
          <Preview v-if="props?.profilePicture" :width="118" :height="118" :image="props?.profilePicture"
            :coordinates="props.profilePictureCoordinates" class="profile-picture" />
        </div>
        <div class="absolute right-5" :class="props.coverPhoto ? 'mt-52' : ' mt-24'">
          <Preview v-if="props?.companyImage" :width="157" :height="88" :image="props?.companyImage"
            :coordinates="props.companyImageCoordinates" class="preview" />
        </div>
      </div>
      <div v-if="isLoading" class="animate-pulse px-5 md:px-10 my-7">
        <div class="h-6 bg-gray-200 rounded w-3/4 mb-4" />
        <div class="h-6 bg-gray-200 rounded w-1/2 mb-4" />
        <div class="h-6 bg-gray-200 rounded w-1/4 mb-4" />
      </div>
      <div v-else class="px-5 md:px-5 pb-5">
        <div v-if="props?.profilePicture || props?.companyImage" class=" mt-16" />
        <FieldSection v-if="!isNameFieldEmpty" :field="nameField"
          :keys="['prefix', 'first_name', 'preferred_name', 'middle_name', 'last_name', 'suffix', 'maiden_name', 'pronoun']"
          :is-name-field="true" @click="updateTitle('Name')" />
        <FieldSection v-else placeholder="Name" @click="updateTitle('Name')" />
        <FieldSection v-if="!isJobFieldEmpty" :field="jobField" :keys="['value']" @click="updateTitle('Job Title')" />
        <FieldSection v-if="!isDepartmentFieldEmpty" :field="departmentField" :keys="['value']"
          @click="updateTitle('Department')" />
        <FieldSection v-if="!isCompanyNameEmpty" :field="companyNameField" :keys="['value']"
          @click="updateTitle('Company Name')" />
        <FieldSection v-if="!isHeadlineFieldEmpty" :is-headline-field="true" :field="headlineField" :keys="['value']"
          @click="updateTitle('Headline')" />
        <FieldSection v-if="!isAccreditationFieldEmpty" :field="accreditationField" is-accreditation
          @click="updateTitle('Accreditation')" />
        <draggable v-model="cardItem" class="flex flex-col gap-3" item-key="id">
          <template #item="{ element }">
            <transition-group name="list" tag="div">
              <div :key="element.id" class="flex flex-row items-center group hover:cursor-pointer -ml-5">
                <Icon name="ph:dots-six-vertical-bold"
                  class="text-black opacity-0 group-hover:opacity-100 text-center h-5 w-5 shrink-0"
                  aria-hidden="true" />
                <ContactPreview :id="element.id" :color="props.color" :title="element.title" :url="element.url"
                  :name="element.name" :value="element.value" :username="element.username" :label="element.label"
                  :category="element.category" :on-update-edit="updateEdit" />
              </div>
            </transition-group>
          </template>
        </draggable>
      </div>
    </div>
  </div>
</template>

<style scoped>
.drag-item {
  background: blue;
  margin: 10px 0;
  padding: 10px;
  color: white;
  border-radius: 4px;
}

.preview {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.profile-picture-container {
  width: 150px;
  /* Set the desired width */
  height: 150px;
  /* Set the desired height */
  overflow: hidden;
  /* Ensure the image does not overflow the container */
  border-radius: 50%;
  /* Make the container circular */
  display: flex;
  align-items: center;
  justify-content: center;
}

.profile-picture {
  width: 100%;
  height: 100%;
  object-fit: cover;
  /* Ensure the image covers the container while maintaining aspect ratio */
  border-radius: 50%;
  /* Make the image circular */
}

.list-enter-active,
.list-leave-active {
  transition: opacity 0.5s ease, transform 0.5s ease;
}

.list-enter,
.list-leave-to {
  opacity: 0;
  transform: translateY(10px);
}

.list-move {
  transition: transform 0.5s ease;
}
</style>