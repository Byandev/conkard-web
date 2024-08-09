<script setup lang="ts">
var title = ref<string>('')
var URL = ref<string>('')

</script>

<template>
    <div class="flex flex-col gap-4">
        <FloatingLabelInput :value="URL" label="URL" input-name="url" placeholder="URL" input-type="text"
            class="w-full" />
        <FloatingLabelInput :value="title" label="Title" input-name="title" placeholder="Title" input-type="text"
            class="w-full" />
    </div>
</template>