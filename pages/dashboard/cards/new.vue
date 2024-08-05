<script setup lang="ts">
definePageMeta({
  layout: 'dashboard-layout',
})

</script>

<template>
  <div class="h-full">
    <CardTabs />
        <div class="flex flex-row h-full gap-3">
      <div class="flex flex-col gap-7 w-1/3">
        <div class="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-4">
          <DashboardCard class="m-6"/>
        </div>
      </div>
      <div class="p-10 w-2/3">
        <label> Label this card</label>
      </div>
    </div>
  </div>
</template>

<style scoped="true"></style>