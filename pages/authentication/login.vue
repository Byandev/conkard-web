<script lang="ts" setup>
definePageMeta({
  auth: {
    unauthenticatedOnly: false,
    navigateAuthenticatedTo: '/',
  },
});
</script>

<template>
  <div class="h-full">
    <LoginForm/>
  </div>
</template>
