<script lang="ts" setup>

</script>

<template>
  <div class="app h-screen">
    <div class="flex flex-col items-center justify-center h-full text-center p-4 bg-gray-100 lg:hidden">
      <h1 class="text-2xl font-bold mb-4">The Conkard dashboard isn't currently optimised for mobile.</h1>
      <p class="text-lg mb-4">For the best mobile experience, download the Conkard app using the following link:</p>
      <a href="https://www.blinq.me" class="text-blue-500 underline">Download the App</a>
    </div>
    <Sidebar class="hidden lg:block">
      <slot></slot>
    </Sidebar>
  </div>
</template>