<script setup lang="ts">
const buttonText = ref<string[]>(['Office Address', 'Work Address', 'Home Address', 'Mailing Address'])
var label = ref<string>('')
var labelValue = ref<string>('')

</script>

<template>
    <div class="flex flex-col gap-4">
        <FloatingLabelTextarea :value="labelValue" label="Value" input-name="email-value" placeholder="Value"
            input-type="text" class="w-full" />
        <FloatingLabelInput @update:value="label = $event" :value="label" label="Label (Optional)"
            input-name="email-value" placeholder="Label (Optional)" input-type="text" class="w-full" />
        <Suggestion :current="label" title="Here are some suggestions for your label:" @update:label="label = $event"
            :buttonText=buttonText />
    </div>
</template>