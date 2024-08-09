<script setup lang="ts">
const props = defineProps<{
    buttonText: string[];
}>();

const buttonText = ref<string[]>(props.buttonText);
var URL = ref<string>('');
var title = ref<string>('');
</script>

<template>
    <div class="flex flex-col gap-4">
        <FloatingLabelInput :value="URL" label="URL" input-name="url" placeholder="URL" input-type="text"
            class="w-full" />
        <FloatingLabelInput @update:value="title = $event" :value="title" label="Title" input-name="title"
            placeholder="Title" input-type="text" class="w-full" />
        <Suggestion :current="title" title="Here are some suggestions for your title:" @update:label="title = $event"
            :buttonText="buttonText" />
    </div>
</template>