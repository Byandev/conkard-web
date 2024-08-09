<template>
    <h3 class="text-sm font-normal text-gray-900">{{ title }}</h3>
    <div class="flex flex-wrap gap-2">
        <button v-for="(text, index) in buttonText" :key="index" @click="updateLabel(text)"
            :class="currentLabel === text ? 'bg-gray-500 text-white' : 'bg-white text-black'"
            class="whitespace-nowrap text-sm px-4 py-1 border-2 hover:text-black rounded-2xl hover:bg-gray-100 w-fit">
            {{ text }}
        </button>
    </div>
</template>

<script setup lang='ts'>
import { ref, watchEffect } from 'vue';

const props = defineProps<{
    current: string,
    title: string,
    buttonText: string[]
}>();

const emit = defineEmits(['update:label']);

const updateLabel = (label: string) => {
    emit('update:label', label === props.current ? '' : label);
};

const currentLabel = ref(props.current);

// Use watchEffect to reactively track changes in props.current
watchEffect(() => {
    currentLabel.value = props.current;
});
</script>