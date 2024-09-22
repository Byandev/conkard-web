<script setup lang="ts">
import { computed } from "vue";

const props = withDefaults(defineProps<{
    field?: any;
    keys?: string[];
    placeholder?: string;
    isAccreditation?: boolean;
    isNameField?: boolean;
    isHeadlineField?: boolean;
    isView?: boolean;
}>(), {
    isView: true
});

const displayValue = computed(() => {
    if (props.isAccreditation) {
        return props.field?.map((accreditation: any) => accreditation.value.join(", ")).join(", ");
    }
    return props.keys?.map(key => props.field?.[key]).filter(Boolean).join(" ");
});

const nameFields = computed(() => {
    const { prefix, first_name, preferred_name, middle_name, last_name, suffix, maiden_name, pronoun } = props.field || {};
    return { prefix, first_name, preferred_name, middle_name, last_name, suffix, maiden_name, pronoun };
});

const accreditationWords = computed(() => {
    return props.field?.flatMap((accreditation: any) => accreditation.value) || [];
});
</script>

<template>
    <section class="w-full my-2 flex flex-row items-center justify-between group"
        :class="props.isView ? 'hover:cursor-pointer' : ''">
        <div>
            <template v-if="props.isNameField">
                <div class="flex flex-wrap gap-2 text-3xl my-2">
                    <span v-if="nameFields.prefix" class="font-semibold text-black">{{ nameFields.prefix }}</span>
                    <span v-if="nameFields.first_name" class="font-semibold text-black">{{ nameFields.first_name
                        }}</span>
                    <span v-if="nameFields.preferred_name" class="font-semibold text-black">"{{
                        nameFields.preferred_name }}"</span>
                    <span v-if="nameFields.middle_name" class="font-semibold text-black">{{ nameFields.middle_name
                        }}</span>
                    <span v-if="nameFields.last_name" class="font-semibold text-black">{{ nameFields.last_name }}</span>
                    <span v-if="nameFields.suffix" class="font-semibold text-black">{{ nameFields.suffix }}</span>
                    <span v-if="nameFields.maiden_name" class="font-semibold text-black">({{ nameFields.maiden_name
                        }})</span>
                    <span v-if="nameFields.pronoun" class="text-2xl italic font-light text-black">({{ nameFields.pronoun
                        }})</span>
                </div>
            </template>
            <template v-else-if="props.isAccreditation">
                <div class="mb-7 flex flex-wrap gap-2">
                    <span v-for="(word, index) in accreditationWords" :key="index"
                        class="bg-gray-200 rounded-lg px-2 py-1 text-black hover:bg-gray-300">{{ word }}</span>
                </div>
            </template>
            <template v-else-if="props.isHeadlineField">
                <h1 class="mt-5 text-base font-thin text-gray-600">{{ displayValue }}</h1>
            </template>
            <h1 v-else-if="displayValue" class="text-3xl font-normal text-black">{{ displayValue }}</h1>
            <h1 v-else class="text-3xl font-bold text-gray-300">{{ placeholder }}</h1>
        </div>
        <Icon v-if="props.isView" name="lucide:edit" size="20"
            class="text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 absolute right-5" />
    </section>
</template>