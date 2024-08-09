<script setup lang="ts">
const buttonText = ref<string[]>(['Follow me on LinkedIn'])
var userNameURL = ref<string>('')
var title = ref<string>('')

</script>

<template>
    <div class="flex flex-col gap-4">
        <FloatingLabelInput :value="userNameURL" label="Username/URL" input-name="username-url"
            placeholder="Username/URL" input-type="text" class="w-full" />
        <FloatingLabelInput @update:value="title = $event" :value="title" label="Title" input-name="title"
            placeholder="Title" input-type="text" class="w-full" />
        <Suggestion :current="title" title="Here are some suggestions for your title:" @update:label="title = $event"
            :buttonText=buttonText />
    </div>
</template>