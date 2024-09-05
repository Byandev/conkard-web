<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useNewCardStore } from "~/store/newCardStore";
import draggable from "vuedraggable";

defineProps<{ color: string }>();

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
      ...newSocialField.map(social => ({ id: social.id ?? null, title: social.title ?? '', url: social.url ?? '', type: social.type, group: 'Social' })),
      ...newMessagingField.map(messaging => ({ id: messaging.id ?? null, title: messaging.title ?? '', url: messaging.url ?? '', type: messaging.type, value: messaging.value, group: 'Messaging' })),
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
</script>

<template>
  <div class="grid grid-cols-1 gap-4">
    <div
      class="divide-y divide-gray-200 overflow-hidden rounded-xl bg-white w-full md:min-w-[100px] shadow drop-shadow-xl">
      <div class="px-4 py-5 sm:px-6 h-28 flex items-center justify-center" :style="{ backgroundColor: color }">
        <svg class="h-12 w-12 text-white" xmlns="http://conkard-api-dev.byandev.com/storage/images/icons/name.svg"
          viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zm0-2a6 6 0 100-12 6 6 0 000 12zm0-10a2 2 0 100-4 2 2 0 000 4z"
            clip-rule="evenodd" />
        </svg>
      </div>
      <div class="px-5 md:px-5 pb-5">
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
                <ContactPreview :id="element.id" :title="element.title" :url="element.url" :type="element.type"
                  :value="element.value" :label="element.label" :group="element.group" :OnUpdateEdit="updateEdit" />
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