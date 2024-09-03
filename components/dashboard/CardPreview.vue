<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useNewCardStore } from "~/store/newCardStore";
import { ref, computed } from "vue";
import draggable from "vuedraggable";

defineProps<{
  color: string;
}>();

interface ComponentData {
  id: number;
}

const newCard = useNewCardStore();

const {
  nameField,
  jobField,
  departmentField,
  companyNameField,
  accreditationField,
  headlineField,
  emailField,
} = storeToRefs(newCard);

const cardItem = ref<ComponentData[]>(emailField.value);

const isNameFieldEmpty = computed(() => {
  const field = nameField.value;
  return (
    !field?.prefix &&
    !field?.first_name &&
    !field?.preferred_name &&
    !field?.middle_name &&
    !field?.last_name &&
    !field?.suffix &&
    !field?.maiden_name &&
    !field?.pronoun
  );
});

const isJobFieldEmpty = computed(() => {
  const field = jobField.value;
  return !field?.job_title;
});

const isDepartmentFieldEmpty = computed(() => {
  const field = departmentField.value;
  return !field?.department_name;
});

const isCompanyNameEmpty = computed(() => {
  const field = companyNameField.value;
  return !field?.company_name;
});

const isAccreditationFieldEmpty = computed(() => {
  const field = accreditationField.value;
  return !field?.length;
});

const isHeadlineFieldEmpty = computed(() => {
  const field = headlineField.value;
  return !field?.headline;
});

const emit = defineEmits(["update:title", "update:open"]);

const updateTitle = (title: string) => {
  emit("update:title", title);
  emit("update:open", true);
};

</script>

<template>

  <div class="grid grid-cols-1 gap-4">
    <div
      class="divide-y divide-gray-200 overflow-hidden rounded-xl bg-white w-full md:max-w-[440px] shadow drop-shadow-xl">
      <div class="px-4 py-5 sm:px-6 h-28 flex items-center justify-center" :style="{ backgroundColor: color }">
        <svg class="h-12 w-12 text-white" xmlns="http://conkard-api-dev.byandev.com/storage/images/icons/name.svg"
          viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zm0-2a6 6 0 100-12 6 6 0 000 12zm0-10a2 2 0 100-4 2 2 0 000 4z"
            clip-rule="evenodd" />
        </svg>
      </div>
      <div class="px-5 md:px-5 pb-7">
        <section v-if="!isNameFieldEmpty"
          class="hover:cursor-pointer w-full my-7 flex flex-row items-center justify-between group"
          @click="updateTitle('Name')">
          <div>
            <h1 class="text-3xl font-semibold text-black">
              {{ nameField?.prefix }} {{ nameField?.first_name }}
              <span v-if="nameField?.preferred_name">{{
                nameField?.preferred_name
              }}</span>
              {{ nameField?.middle_name }} {{ nameField?.last_name }}
              {{ nameField?.suffix }}
              <span v-if="nameField?.maiden_name">({{ nameField?.maiden_name }})</span>
              <small v-if="nameField?.pronoun" class="font-normal text-lg italic">({{ nameField?.pronoun }})</small>
            </h1>
          </div>
          <Icon name="lucide:edit" size="24"
            class="text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </section>
        <section v-else class="hover:cursor-pointer w-full my-7 flex flex-row items-center justify-between group"
          @click="updateTitle('Name')">
          <h1 class="text-3xl font-bold text-gray-300">Name</h1>
          <Icon name="lucide:edit" size="24"
            class="text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </section>

        <section v-if="!isJobFieldEmpty"
          class="hover:cursor-pointer w-full my-7 flex flex-row items-center justify-between group"
          @click="updateTitle('Job title')">
          <div>
            <h1 class="text-1xl font-semibold text-black">
              {{ jobField?.job_title }}
            </h1>
          </div>
          <Icon name="lucide:edit" size="24"
            class="text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </section>

        <section v-if="!isDepartmentFieldEmpty"
          class="hover:cursor-pointer w-full my-7 flex flex-row items-center justify-between group"
          @click="updateTitle('Department')">
          <div>
            <h1 class="text-1xl font-semibold text-black">
              {{ departmentField?.department_name }}
            </h1>
          </div>
          <Icon name="lucide:edit" size="24"
            class="text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </section>

        <section v-if="!isCompanyNameEmpty"
          class="hover:cursor-pointer w-full my-7 flex flex-row items-center justify-between group"
          @click="updateTitle('Company name')">
          <div>
            <h1 class="text-1xl font-semibold text-black">
              {{ companyNameField?.company_name }}
            </h1>
          </div>
          <Icon name="lucide:edit" size="24"
            class="text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </section>

        <section v-if="!isAccreditationFieldEmpty"
          class="hover:cursor-pointer w-full my-7 flex flex-row items-center justify-between group"
          @click="updateTitle('Accreditation')">
          <div>
            <h1 class="text-1xl font-semibold text-black">
              <span v-for="(accreditation, index) in accreditationField" :key="index"
                class="p-2 bg-gray-100 rounded-lg ml-5">
                {{ accreditation.value.join(", ") }}
              </span>
            </h1>
          </div>
          <Icon name="lucide:edit" size="24"
            class="text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </section>


        <section v-if="!isHeadlineFieldEmpty"
          class="hover:cursor-pointer w-full my-7 flex flex-row items-center justify-between group"
          @click="updateTitle('Headline')">
          <div>
            <h1 class="text-1xl font-semibold text-black">
              {{ headlineField?.headline }}
            </h1>
          </div>
          <Icon name="lucide:edit" size="24"
            class="text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </section>

        <draggable v-model="cardItem" class="flex flex-col gap-3">
          <template #item="{ element }">
            <transition-group name="list" tag="div">
              <div class="flex flex-row items-center group hover:cursor-pointer" :key="element.id">
                <Icon name="ph:dots-six-vertical-bold" :class="[
                  `text-red-400`,
                  ` opacity-0`,
                  `group-hover:opacity-100`,
                  'text-center',
                  'h-7',
                  'w-7',
                  'shrink-0'
                ]" aria-hidden="true" />
                <EmailPreview :id="element.id" />
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
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.list-enter,
.list-leave-to {
  opacity: 0;
  transform: translateY(10px);
}

.list-move {
  transition: transform 0.2s ease;
}
</style>