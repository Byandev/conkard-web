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

</script>

<template>
    <section
class="w-full my-2 flex flex-row items-center justify-between group"
        :class="props.isView ? 'hover:cursor-pointer' : ''">
        <div>
            <h1 v-if="displayValue" class="text-3xl font-normal text-black">{{ displayValue }}</h1>
            <h1 v-else class="text-3xl font-bold text-gray-300">{{ placeholder }}</h1>
        </div>
        <Icon
v-if="props.isView" name="lucide:edit" size="20"
            class="text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 absolute right-5" />
    </section>
</template>