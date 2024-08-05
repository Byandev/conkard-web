<script lang="ts" setup>
defineProps({
  message: String,
  error: Boolean,
});
</script>

<template>
  <span 
    v-if="error" 
    class="text-red-900"
  >
    {{ message }}
  </span>
</template>