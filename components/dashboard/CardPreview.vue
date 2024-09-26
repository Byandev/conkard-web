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
  type: string;
  label: string;
  value: string;
  category: string;
}

const newCard = useCardStore();
const { setEditing, setCurrentCategory, setCurrentFieldId, setModalTitle, setModalOpen } = newCard;
const { isLoading, personalFields, generalFields, messagingFields, businessFields, socialFields, selectedColor } = storeToRefs(newCard);

const cardItem = ref<ComponentData[]>([]);

const mapFields = (fields: any[]) => fields.map((field: any) => ({
  id: field.id,
  type: field.type ?? '',
  label: field.label ?? '',
  value: field.value ?? '',
  category: field.category ?? ''
}));

const updateCardItem = () => {
  cardItem.value = [
    ...mapFields(generalFields.value),
    ...mapFields(socialFields.value),
    ...mapFields(messagingFields.value),
    ...mapFields(businessFields.value),
  ];
};

watch([generalFields, socialFields, messagingFields, businessFields], updateCardItem, { immediate: true, deep: true });

const getMatchedTypeAndCategory = (type: string, category: string) => computed(() => {
  const fieldsMap: Record<string, any[]> = {
    PERSONAL: personalFields.value,
    GENERAL: generalFields.value,
    SOCIAL: socialFields.value,
    MESSAGING: messagingFields.value,
    BUSINESS: businessFields.value,
  };
  return fieldsMap[category]?.find((item: any) => item.type === type && item.category === category) || null;
});

const updateTitle = (title: string) => {
  setModalTitle(title);
  setModalOpen(true);
  setEditing(true);
};

const bgColor = computed(() => props.coverPhoto ? 'white' : selectedColor.value);

</script>

<template>
  <div class="grid grid-cols-1 gap-4">
    <div class="w-[440px] divide-y divide-gray-200 overflow-hidden rounded-xl bg-white md:min-w-[100px] shadow drop-shadow-xl">
      <div class="px-4 py-5 sm:px-6 flex items-center justify-center" :class="props.coverPhoto ? 'h-[248px]' : 'h-[100px]'" :style="{ backgroundColor: bgColor }">
        <Preview v-if="props.coverPhoto" :width="440" :height="248" :image="props.coverPhoto" :coordinates="props.coverPhotoCoordinates" class="preview" />
        <div class="absolute left-0 profile-picture-container" :class="props.coverPhoto ? 'mt-52' : 'mt-24'">
          <Preview v-if="props.profilePicture" :width="118" :height="118" :image="props.profilePicture" :coordinates="props.profilePictureCoordinates" class="profile-picture" />
        </div>
        <div class="absolute right-5" :class="props.coverPhoto ? 'mt-52' : 'mt-24'">
          <Preview v-if="props.companyImage" :width="157" :height="88" :image="props.companyImage" :coordinates="props.companyImageCoordinates" class="preview" />
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
          v-for="field in ['Name', 'Job Title', 'Department', 'Company Name']"
          :key="field"
          :field="getMatchedTypeAndCategory(field, 'PERSONAL').value"
          :keys="['value']"
          :is-name-field="field === 'Name'"
          @click="() => {
            const matchedField = getMatchedTypeAndCategory(field, 'PERSONAL').value;
            if (matchedField) {
              setCurrentFieldId(matchedField.id);
              updateTitle(field);
            } else {
              setModalTitle(field);
              setModalOpen(true);
              setCurrentCategory('PERSONAL');
            }
          }"
        />
        <draggable v-model="cardItem" class="flex flex-col gap-3" item-key="id">
          <template #item="{ element }">
            <transition-group name="list" tag="div">
              <div :key="element.id" class="flex flex-row items-center group hover:cursor-pointer -ml-5">
                <Icon name="ph:dots-six-vertical-bold" class="text-black opacity-0 group-hover:opacity-100 text-center h-5 w-5 shrink-0" aria-hidden="true" />
                <ContactPreview
                  v-bind="element"
                  :name="element.type"
                  :color="selectedColor"
                  @click="() => {
                    setCurrentFieldId(element.id);
                    setEditing(true);
                    setModalOpen(true);
                  }"
                />
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