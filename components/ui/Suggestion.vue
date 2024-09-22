<template>
  <h3 class="text-sm font-normal text-gray-900">{{ title }}</h3>
  <div class="flex flex-wrap gap-2">
    <button
      v-for="(label, index) in splitLabels"
      :key="index"
      :class="
        currentLabel === label
          ? 'bg-gray-500 text-white'
          : 'bg-white text-black'
      "
      class="whitespace-nowrap text-sm px-4 py-1 border-2 hover:text-black rounded-2xl hover:bg-gray-100 w-fit"
      @click="updateLabel(label)"
    >
      {{ label }}
    </button>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref, watchEffect } from "vue";

const props = defineProps<{
  current: string;
  title: string;
  suggestedLabels: string | null;
}>();

const emit = defineEmits(["update:label"]);

const updateLabel = (label: string) => {
  emit("update:label", label === props.current ? "" : label);
};

const currentLabel = ref(props.current);

// Use watchEffect to reactively track changes in props.current
watchEffect(() => {
  currentLabel.value = props.current;
});

// Computed property to split suggestedLabels by comma
const splitLabels = computed(() => {
  return props.suggestedLabels
    ? props.suggestedLabels.split(",").map((label) => label.trim())
    : [];
});
</script>
