<script lang="ts" setup>
definePageMeta({
  auth: {
    unauthenticatedOnly: true,
    navigateAuthenticatedTo: '/cards',
  },
});
</script>

<template>
  <div class="h-full">
    <RegisterForm />
  </div>
</template>
