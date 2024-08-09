<script lang="ts" setup></script>

<template>
  <div class="app h-screen">
    <NuxtLoadingIndicator :throttle=0 />
    <Sidebar>
      <slot></slot>
    </Sidebar>
  </div>
</template>
<style scoped></style>