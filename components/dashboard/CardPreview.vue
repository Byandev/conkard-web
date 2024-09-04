<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useNewCardStore } from "~/store/newCardStore";
import { computed } from "vue";
import draggable from "vuedraggable";

defineProps<{ color: string }>();

interface ComponentData {
  email: {
    id: number | null;
    value: string;
    label: string;
  },
  phone: {
    id: number | null;
    value: string;
    label: string;
  }
}

const newCard = useNewCardStore();
const { nameField, jobField, departmentField, companyNameField, accreditationField, headlineField, emailField, phoneField } = storeToRefs(newCard);

const cardItem = computed(() => [...emailField.value, ...phoneField.value]);

const isFieldEmpty = (field: any, keys: string[]) => computed(() => keys.every(key => !field.value?.[key]));

const isNameFieldEmpty = isFieldEmpty(nameField, ['prefix', 'first_name', 'preferred_name', 'middle_name', 'last_name', 'suffix', 'maiden_name', 'pronoun']);
const isJobFieldEmpty = isFieldEmpty(jobField, ['job_title']);
const isDepartmentFieldEmpty = isFieldEmpty(departmentField, ['department_name']);
const isCompanyNameEmpty = isFieldEmpty(companyNameField, ['company_name']);
const isAccreditationFieldEmpty = computed(() => !accreditationField.value?.length);
const isHeadlineFieldEmpty = isFieldEmpty(headlineField, ['headline']);

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

        <FieldSection v-if="!isJobFieldEmpty" @click="updateTitle('Job title')" :field="jobField"
          :keys="['job_title']" />
        <FieldSection v-if="!isDepartmentFieldEmpty" @click="updateTitle('Department')" :field="departmentField"
          :keys="['department_name']" />
        <FieldSection v-if="!isCompanyNameEmpty" @click="updateTitle('Company name')" :field="companyNameField"
          :keys="['company_name']" />
        <FieldSection :is-headline-field="true" v-if="!isHeadlineFieldEmpty" @click="updateTitle('Headline')"
          :field="headlineField" :keys="['headline']" />
        <FieldSection v-if="!isAccreditationFieldEmpty" @click="updateTitle('Accreditation')"
          :field="accreditationField" isAccreditation />

        <draggable @end="console.log('Hello')" v-model="cardItem" class="flex flex-col gap-3" itemKey="id">
          <template #item="{ element }">
            <transition-group name="list" tag="div">
              <div class="flex flex-row items-center group hover:cursor-pointer -ml-5" :key="element.id">
                <Icon name="ph:dots-six-vertical-bold"
                  class="text-black opacity-0 group-hover:opacity-100 text-center h-5 w-5 shrink-0"
                  aria-hidden="true" />
                <EmailPreview v-if="element.value.includes('@')" @click="updateEdit('Email', element.id)"
                  :id="element.id" />
                <PhonePreview v-else @click="updateEdit('Phone', element.id)" :id="element.id" />
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