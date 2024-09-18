<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import type { Field } from '~/types/models/Card';

const props = defineProps<{
    currentCard: Field[] | null;
}>();

const cardItem = ref<Field[]>([]);

const getField = (name: string) => computed(() => props.currentCard?.find(field => field.type.name === name) || null);
const getFieldsByCategory = (category: string) => computed(() => props.currentCard?.filter(field => field.type.category === category) || null);
const isFieldEmpty = (field: ComputedRef<Field | null>, keys: (keyof Field)[]) => computed(() => keys.every(key => !field.value?.[key]));

const nameField = getField("Name");
const jobField = getField("Job Title");
const departmentField = getField("Department");
const companyNameField = getField("Company Name");

const generalField = getFieldsByCategory("GENERAL");
const socialField = getFieldsByCategory("SOCIAL");
const messagingField = getFieldsByCategory("MESSAGING");
const businessField = getFieldsByCategory("BUSINESS");

const isJobFieldEmpty = isFieldEmpty(jobField, ['value']);
const isDepartmentFieldEmpty = isFieldEmpty(departmentField, ['value']);
const isCompanyNameEmpty = isFieldEmpty(companyNameField, ['value']);

watch(
    [generalField, socialField, messagingField, businessField],
    ([newGeneralField, newSocialField, newMessagingField, newBusinessField]) => {
        console.log('General', newGeneralField);
        cardItem.value = [
            ...newGeneralField?.map(field => ({ ...field, category: 'General' })) ?? [],
            ...newSocialField?.map(field => ({ ...field, category: 'Social' })) ?? [],
            ...newMessagingField?.map(field => ({ ...field, category: 'Messaging' })) ?? [],
            ...newBusinessField?.map(field => ({ ...field, category: 'Business' })) ?? []
        ];
    },
    { immediate: true, deep: true }
);
</script>

<template>
    <div class="grid grid-cols-1 gap-4">
        <div
            class="divide-y divide-gray-200 overflow-hidden rounded-xl bg-white w-full md:w-[440px] shadow drop-shadow-xl">
            <div class="px-4 py-5 sm:px-6 h-28 bg-orange-400 flex items-center justify-center">
                <svg class="h-12 w-12 text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
                    fill="currentColor">
                    <path fill-rule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm0-2a6 6 0 100-12 6 6 0 000 12zm0-10a2 2 0 100-4 2 2 0 000 4z"
                        clip-rule="evenodd" />
                </svg>
            </div>
            <div class="px-5 md:px-10 pb-7">
                <div class="text-2xl md:text-3xl mt-7 mb-3 font-semibold">
                    <div>{{ nameField?.value }}</div>
                </div>
                <FieldSection v-if="!isJobFieldEmpty" :field="jobField" :keys="['value']" />
                <FieldSection v-if="!isDepartmentFieldEmpty" :field="departmentField" :keys="['value']" />
                <FieldSection v-if="!isCompanyNameEmpty" :field="companyNameField" :keys="['value']" />
                <div v-for="(item, index) in cardItem" :key="index">
                    <ContactPreview :id="item.id ?? 0" :is-clickable="true" class="mt-5" :color="'#FFA500'"
                        :value="item.value ?? ''" :label="item.label ?? ''" :category="item.type.category ?? ''"
                        :name="item.type.name ?? ''" />
                </div>
            </div>
        </div>
    </div>
</template>