<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useCardStore } from "~/store/cardStore";
import draggable from "vuedraggable";
import { Preview } from 'vue-advanced-cropper';

const props = defineProps<{
  color: string;
  companyImage?: string;
  companyImageCoordinates?: string;
  profilePicture?: string;
  profilePictureCoordinates?: string;
  coverPhoto?: string;
  coverPhotoCoordinates?: string;
}>();

interface ComponentData {
  type: string;
  label: string;
  value: string;
  category: string;
}

const newCard = useCardStore();
const cardStore = useCardStore();
const { isLoading } = storeToRefs(cardStore);

const {personalFields, generalFields, messagingFields, businessFields, socialFields } = storeToRefs(newCard);

const cardItem = ref<ComponentData[]>([]);

const updateCardItem = () => {
  cardItem.value = [
    ...generalFields.value.map((general: any) => ({
      type: general.type ?? '',
      label: general.label ?? '',
      value: general.value ?? '',
      category: general.category ?? ''
    })),
    ...socialFields.value.map((social: any) => ({
      type: social.type ?? '',
      label: social.label ?? '',
      value: social.value ?? '',
      category: social.category ?? ''
    })),
    ...messagingFields.value.map((messaging: any) => ({
      type: messaging.type ?? '',
      label: messaging.label ?? '',
      value: messaging.value ?? '',
      category: messaging.category ?? ''
    })),
    ...businessFields.value.map((business: any) => ({
      type: business.type ?? '',
      value: business.value ?? '',
      label: business.label ?? '',
      category: business.category ?? ''
    })),
  ];
};

// Watch for changes in newCard fields and update cardItem
watch(
  [generalFields, socialFields, messagingFields, businessFields],
  updateCardItem,
  { immediate: true, deep: true }
);

const getMatchedTypeAndCategory = (type: string, category: string) => {
  return computed(() => {
    const result = personalFields.value
      .filter((item: any) => item.type === type && item.category === category)
      .map((item: any) => ({
        type: item.type,
        label: item.label,
        value: item.value,
        category: item.category
      }));
    console.log(result[0]);
    return result[0];
  });
};

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
      <div
        class="px-4 py-5 sm:px-6 flex items-center justify-center"
        :class="props.coverPhoto ? 'h-[248px]' : 'h-[100px]'" :style="{ backgroundColor: bgColor }">
        <div>
          <Preview
            v-if="props?.coverPhoto" :width="440" :height="248" :image="props?.coverPhoto"
            :coordinates="props?.coverPhotoCoordinates" class="preview" />
        </div>
        <div class="absolute left-0 profile-picture-container" :class="props.coverPhoto ? 'mt-52' : ' mt-24'">
          <Preview
            v-if="props?.profilePicture" :width="118" :height="118" :image="props?.profilePicture"
            :coordinates="props.profilePictureCoordinates" class="profile-picture" />
        </div>
        <div class="absolute right-5" :class="props.coverPhoto ? 'mt-52' : ' mt-24'">
          <Preview
            v-if="props?.companyImage" :width="157" :height="88" :image="props?.companyImage"
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
        <FieldSection
           v-if="getMatchedTypeAndCategory('Name', 'PERSONAL').value"
           :field="getMatchedTypeAndCategory('Name','PERSONAL').value"
          :keys="['value']"
          :is-name-field="true" @click="updateTitle('Name')" />
        <FieldSection v-else placeholder="Name" @click="updateTitle('Name')" />
        <FieldSection 
          v-if = "getMatchedTypeAndCategory('Job Title', 'PERSONAL').value"
          :field="getMatchedTypeAndCategory('Job Title', 'PERSONAL').value" :keys="['value']" @click="updateTitle('Job Title')" />
        <FieldSection
          v-if="getMatchedTypeAndCategory('Department', 'PERSONAL').value"
          :field="getMatchedTypeAndCategory('Department', 'PERSONAL').value" :keys="['value']"
          @click="updateTitle('Department')" />
        <FieldSection
          v-if="getMatchedTypeAndCategory('Company Name', 'PERSONAL').value"
          :field="getMatchedTypeAndCategory('Company Name', 'PERSONAL').value" :keys="['value']"
          @click="updateTitle('Company Name')" />
        <draggable v-model="cardItem" class="flex flex-col gap-3" item-key="index">
          <template #item="{ element, index }">
            <transition-group name="list" tag="div">
              <div :key="index" class="flex flex-row items-center group hover:cursor-pointer -ml-5">
                <Icon
                  name="ph:dots-six-vertical-bold"
                  class="text-black opacity-0 group-hover:opacity-100 text-center h-5 w-5 shrink-0"
                  aria-hidden="true" />
                <ContactPreview
                  :id="index" :color="props.color" :title="element.title" :url="element.url"
                  :type="element.type" :value="element.value" :username="element.username" :label="element.label"
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