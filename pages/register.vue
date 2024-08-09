<script lang="ts" setup>
definePageMeta({
  auth: {
    unauthenticatedOnly: true,
    navigateAuthenticatedTo: '/dashboard',
  },
});
</script>

<template>
  <div class="h-full">
    <RegisterForm />
  </div>
</template>
