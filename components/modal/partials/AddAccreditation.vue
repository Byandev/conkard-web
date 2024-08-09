<script lang="ts" setup>
import { reactive } from 'vue';

let idCounter = 0;
const accreditations = reactive([{ id: idCounter++, value: '' }]);

function handleInput(index: number, value: string) {
    accreditations[index].value = value;
    const lastValue = accreditations[accreditations.length - 1].value;
    if (lastValue !== '') {
        accreditations.push({ id: idCounter++, value: '' });
    }
}

function removeInput(index: number) {
    if (accreditations.length > 1) {
        accreditations.splice(index, 1);
    }
}
</script>

<template>
    <div class="flex flex-col gap-4">
        <div v-for="(accreditation, index) in accreditations" :key="accreditation.id" class="flex items-center gap-2">
            <FloatingLabelInput :value="accreditation.value" :label="`Accreditation ${index + 1}`"
                :input-name="`accreditation-${index}`" placeholder="Accreditation" input-type="text" class="w-full"
                :floating-label="accreditation.value !== ''" @input="event => handleInput(index, event.target.value)" />
            <button @click="removeInput(index)" class="text-red-500">X</button>
        </div>
    </div>
</template>