<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useCardStore } from "~/store/cardStore";
import draggable from "vuedraggable";
import { Preview } from 'vue-advanced-cropper';

const props = defineProps<{
  companyImage?: string;
  companyImageCoordinates?: string;
  profilePicture?: string;
  profilePictureCoordinates?: string;
  coverPhoto?: string;
  coverPhotoCoordinates?: string;
}>();

interface ComponentData {
  id: number;
  name: string;
  label: string;
  value: string;
  category: string;
}

const newCard = useCardStore();
const { setEditing, setModalTitle, setCurrentFieldId, setModalOpen, setCurrentCategory } = newCard;
const { isLoading, personalFields, generalFields, messagingFields, businessFields, socialFields, selectedColor } = storeToRefs(newCard);

const cardItem = ref<ComponentData[]>([]);

const updateCardItem = () => {
  console.log('generalFields', generalFields.value);
  cardItem.value = [
    ...generalFields.value.map((general: any) => ({
      id: general.id ?? 0,
      name: general.name ?? '',
      label: general.label ?? '',
      value: general.value ?? '',
      category: 'GENERAL'
    })),
    ...socialFields.value.map((social: any) => ({
      id: social.id ?? 0,
      name: social.name ?? '',
      label: social.label ?? '',
      value: social.value ?? '',
      category: 'SOCIAL'
    })),
    ...messagingFields.value.map((messaging: any) => ({
      id: messaging.id ?? 0,
      name: messaging.name ?? '',
      label: messaging.label ?? '',
      value: messaging.value ?? '',
      category: 'MESSAGING'
    })),
    ...businessFields.value.map((business: any) => ({
      id: business.id ?? 0,
      name: business.name ?? '',
      value: business.value ?? '',
      label: business.label ?? '',
      category: 'BUSINESS'
    })),
  ];
  console.log('cardItem', cardItem.value);
};

watch([generalFields, socialFields, messagingFields, businessFields], updateCardItem, { immediate: true, deep: true });

const getMatchedTypeAndCategory = (name: string) => {
  return computed(() => {
    const result = personalFields.value
      .filter((item: any) => item.name === name)
      .map((item: any) => ({
        id: item.id,
        name: item.name,
        label: item.label,
        value: item.value,
        category: 'PERSONAL'
      }));
    console.log('Result',result[0]);
    return result[0];
  });
};

const updateCurrent = (title: string, category: string, id: number) => {
  setCurrentFieldId(id);
  setModalTitle(title);
  setCurrentCategory(category);
  setModalOpen(true);
  setEditing(true);
};

const bgColor = computed(() => props.coverPhoto ? 'white' : selectedColor.value);

</script>

<template>
  <div class="grid grid-cols-1 gap-4">
    <div
      class="w-[440px] divide-y divide-gray-200 overflow-hidden rounded-xl bg-white md:min-w-[100px] shadow drop-shadow-xl">
      <div
class="flex items-center justify-center" :class="props.coverPhoto ? 'h-[248px]' : 'h-[100px]'"
        :style="{ backgroundColor: bgColor }">
        <Preview
v-if="props.coverPhoto" :width="440" :height="248" :image="props.coverPhoto"
          :coordinates="props.coverPhotoCoordinates" class="preview" />
        <div class="absolute left-0 profile-picture-container" :class="props.coverPhoto ? 'mt-52' : 'mt-24'">
          <Preview
v-if="props.profilePicture" :width="118" :height="118" :image="props.profilePicture"
            :coordinates="props.profilePictureCoordinates" class="profile-picture" />
        </div>
        <div class="absolute right-5" :class="props.coverPhoto ? 'mt-52' : 'mt-24'">
          <Preview
v-if="props.companyImage" :width="157" :height="88" :image="props.companyImage"
            :coordinates="props.companyImageCoordinates" class="preview" />
        </div>
      </div>
      <div v-if="isLoading" class="animate-pulse px-5 md:px-10 my-7">
        <div class="h-6 bg-gray-200 rounded w-3/4 mb-4" />
        <div class="h-6 bg-gray-200 rounded w-1/2 mb-4" />
        <div class="h-6 bg-gray-200 rounded w-1/4 mb-4" />
      </div>
      <div v-else class="px-5 md:px-5 pb-5">
        <div v-if="props.profilePicture || props.companyImage" class="mt-16" />
        <FieldSection
v-if="getMatchedTypeAndCategory('Name').value"
          :field="getMatchedTypeAndCategory('Name').value" :keys="['value']" :is-name-field="true"
          @click="updateCurrent('Name', 'PERSONAL', getMatchedTypeAndCategory('Name').value.id)" />
        <FieldSection v-else :field="{}" :keys="[]" placeholder="Name" @click="updateCurrent('Name', 'PERSONAL', getMatchedTypeAndCategory('Name').value.id)" />
        <FieldSection
v-if="getMatchedTypeAndCategory('Job Title').value"
          :field="getMatchedTypeAndCategory('Job Title').value" :keys="['value']"
          @click="updateCurrent('Job Title', 'PERSONAL', getMatchedTypeAndCategory('Job Title').value.id)" />
        <FieldSection
v-if="getMatchedTypeAndCategory('Department').value"
          :field="getMatchedTypeAndCategory('Department').value" :keys="['value']"
          @click="updateCurrent('Department', 'PERSONAL', getMatchedTypeAndCategory('Department').value.id)" />
        <FieldSection
v-if="getMatchedTypeAndCategory('Company Name').value"
          :field="getMatchedTypeAndCategory('Company Name').value" :keys="['value']"
          @click="updateCurrent('Company Name', 'PERSONAL', getMatchedTypeAndCategory('Company Name').value.id)" />
        <draggable v-model="cardItem" class="flex flex-col gap-3" item-key="id">
          <template #item="{ element }">
            <transition-group name="list" tag="div">
              <div :key="element.id" class="flex flex-row items-center group hover:cursor-pointer -ml-5">
                <Icon
                  name="ph:dots-six-vertical-bold"
                  class="text-black opacity-0 group-hover:opacity-100 text-center h-5 w-5 shrink-0"
                  aria-hidden="true" />
                <ContactPreview
                    v-bind="element" :name="element.name" :color="selectedColor" 
                    @click="() => {updateCurrent(element.name, element.category, element.id);
                  }" />
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
  height: 150px;
  overflow: hidden;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.profile-picture {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
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