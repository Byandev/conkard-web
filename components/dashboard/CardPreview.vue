<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useNewCardStore } from "~/store/newCardStore";
import draggable from "vuedraggable";
import { Preview } from 'vue-advanced-cropper';

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
  type?: string;
  title?: string;
  url?: string;
  group?: string;
}

const newCard = useNewCardStore();
const { generalField, messagingField, businessField, paymentField, nameField, jobField, socialField, departmentField, companyNameField, accreditationField, headlineField } = storeToRefs(newCard);

const cardItem = ref<ComponentData[]>([]);

watch(
  [generalField, socialField, messagingField, businessField, paymentField],
  ([newGeneralField, newSocialField, newMessagingField, newBusinessField, newPaymentField]) => {
    cardItem.value = [
      ...newGeneralField.map(general => ({ id: general.id ?? null, title: general.title ?? '', url: general.url ?? '', type: general.type, value: general.value, label: general.label, group: 'General' })),
      ...newSocialField.map(social => ({ id: social.id ?? null, title: social.title ?? '', url: social.url ?? '', username: social.username, type: social.type, group: 'Social' })),
      ...newMessagingField.map(messaging => ({ id: messaging.id ?? null, title: messaging.title ?? '', url: messaging.url ?? '', username: messaging.username, type: messaging.type, value: messaging.value, group: 'Messaging' })),
      ...newBusinessField.map(business => ({ id: business.id ?? null, title: business.title ?? '', url: business.url ?? '', type: business.type, group: 'Business' })),
      ...newPaymentField.map(payment => ({ id: payment.id ?? null, title: payment.title ?? '', url: payment.url ?? '', type: payment.type, group: 'Payment' })),
    ];
  },
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

const bgColor = computed(() => props.companyImage ? 'white' : props.color);
</script>

<template>
  <div class="grid grid-cols-1 gap-4">
    <div
      class="divide-y divide-gray-200 overflow-hidden rounded-xl bg-white w-full md:min-w-[100px] shadow drop-shadow-xl">
      <div class="px-4 py-5 sm:px-6 h-[180px] flex items-center justify-center" :style="{ backgroundColor: bgColor }">
        <div>
          <Preview v-if="props?.companyImage" :width="320" :height="180" :image="props?.companyImage"
            :coordinates="props.companyImageCoordinates" class="preview" />
        </div>
        <div class="absolute left-0 mt-52 profile-picture-container">
          <Preview v-if="props?.profilePicture" :width="120" :height="120" :image="props?.profilePicture"
            :coordinates="props.profilePictureCoordinates" class="profile-picture" />
        </div>
        <div class="absolute right-5 mt-52">
          <Preview v-if="props?.coverPhoto" :width="192" :height="108" :image="props?.coverPhoto"
            :coordinates="props.coverPhotoCoordinates" class="preview" />
        </div>
      </div>
      <div class="px-5 md:px-5 pb-5">
        <div class=" mt-28" v-if="props?.profilePicture || props?.coverPhoto"></div>
        <FieldSection v-if="!isNameFieldEmpty" @click="updateTitle('Name')" :field="nameField"
          :keys="['prefix', 'first_name', 'preferred_name', 'middle_name', 'last_name', 'suffix', 'maiden_name', 'pronoun']"
          :isNameField="true" />
        <FieldSection v-else @click="updateTitle('Name')" placeholder="Name" />
        <FieldSection v-if="!isJobFieldEmpty" @click="updateTitle('Job title')" :field="jobField" :keys="['value']" />
        <FieldSection v-if="!isDepartmentFieldEmpty" @click="updateTitle('Department')" :field="departmentField"
          :keys="['value']" />
        <FieldSection v-if="!isCompanyNameEmpty" @click="updateTitle('Company name')" :field="companyNameField"
          :keys="['value']" />
        <FieldSection :is-headline-field="true" v-if="!isHeadlineFieldEmpty" @click="updateTitle('Headline')"
          :field="headlineField" :keys="['value']" />
        <FieldSection v-if="!isAccreditationFieldEmpty" @click="updateTitle('Accreditation')"
          :field="accreditationField" isAccreditation />
        <draggable v-model="cardItem" class="flex flex-col gap-3" item-key="id">
          <template #item="{ element }">
            <transition-group name="list" tag="div">
              <div class="flex flex-row items-center group hover:cursor-pointer -ml-5" :key="element.id">
                <Icon name="ph:dots-six-vertical-bold"
                  class="text-black opacity-0 group-hover:opacity-100 text-center h-5 w-5 shrink-0"
                  aria-hidden="true" />
                <ContactPreview :color="props.color" :id="element.id" :title="element.title" :url="element.url"
                  :type="element.type" :value="element.value" :username="element.username" :label="element.label"
                  :group="element.group" :OnUpdateEdit="updateEdit" />
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
  /* Ensure the image fits inside the div while maintaining aspect ratio */
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