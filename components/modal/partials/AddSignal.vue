<script setup lang="ts">
const buttonText = ref<string[]>(['Add me on Signal', 'Connect with me on Signal'])
var title = ref<string>('')
var number = ref<string>('')

</script>

<template>
    <div class="flex flex-col gap-4">
        <FloatingLabelInput :value="number" label="Phone number" input-name="phone-number" placeholder="Phone number"
            input-type="text" class="w-full" />
        <FloatingLabelInput @update:value="title = $event" :value="title" label="Title" input-name="title"
            placeholder="Title" input-type="text" class="w-full" />
        <Suggestion :current="title" title="Here are some suggestions for your label:" @update:label="title = $event"
            :buttonText=buttonText />
    </div>
</template>