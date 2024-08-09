<script lang="ts" setup>
import {authStore} from "~/store/auth";

const {user} = authStore()
const {$api} = useNuxtApp();

$api('/v1/cards')
</script>


<template>
  <div class="h-full">
    <h1 class="text-2xl font-bold">Hi {{ user.name }}</h1>
  </div>
</template>
