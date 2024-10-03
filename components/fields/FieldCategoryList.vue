<script setup lang="ts">
import { useFieldTypeStore } from '~/store/fieldTypeStore';
import { useCardStore } from '~/store/cardStore';
import type { CardFieldType } from '~/types/models/CardFieldType';

const { groupedFieldsByCategory } = storeToRefs(useFieldTypeStore());

const { setModalTitle, setSuggestedLabels, setModalOpen, setTypeId } = useCardStore();

const handleAddField = (field: CardFieldType) => {
    setTypeId(field.id);
    setModalTitle(field.name);
    if(field.suggested_labels) {
        setSuggestedLabels(field.suggested_labels);
    }
    setModalOpen(true);
};

</script>

<template>
    <div class="flex flex-col group">
        <div v-for="(fields, category) in groupedFieldsByCategory" :key="category" class="mb-5">
            <h2 class="mb-2 text-lg">
                {{ useCapitalize(category) }}
            </h2>
            <div
                class="grid grid-cols-3 md:grid-cols-5 xl:grid-cols-6 gap-3 group-hover: cursor-pointer">
                <div v-for="field in fields" :key="field.id" class="flex flex-col items-center p-2" @click="handleAddField(field)">
                    <img :src="field?.icon_url || ''" class="w-12 h-12 border-2 p-2 rounded-lg" alt="Category Icon">
                    <span class="text-center">{{ field?.name }}</span>
                </div>
            </div>
        </div>
    </div>
</template>