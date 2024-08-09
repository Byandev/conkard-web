<script setup lang="ts">
const buttonText = ref<string[]>(['Cell', 'Mobile', 'Work', 'Home'])
var label = ref<string>('');
var number = ref<string>('');

</script>

<template>
    <div class="flex flex-col gap-4">
        <FloatingLabelInput :value="number" label="Phone number" input-name="phone-number" placeholder="Phone number"
            input-type="text" class="w-full" />
        <FloatingLabelInput @update:value="label = $event" :value="label" label="Label (Optional)" input-name="label"
            placeholder="Label (Optional)" input-type="text" class="w-full" />
        <Suggestion :current="label" title="Here are some suggestions for your label:" @update:label="label = $event"
            :buttonText=buttonText />
    </div>
</template>