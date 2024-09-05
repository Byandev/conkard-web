<script setup lang="ts">
import { defineProps } from 'vue';

const props = defineProps<{
    id: number;
    value?: string;
    label?: string;
    url?: string;
    title?: string;
    group?: string;
    type: 'Email' | 'Phone' | 'Company URL' | 'Link' | 'Address' | 'Twitter' | 'Instagram' | 'Facebook' | 'YouTube' | 'SnapChat' | 'TikTok' | 'Twitch' | 'LinkedIn' | 'WhatsApp' | 'Signal' | 'Discord' | 'Skype' | 'Telegram' | 'GitHub' | 'Calendly' | 'PayPal' | 'Venmo' | 'Cash App' | 'Threads' | 'Yelp';
    OnUpdateEdit: (title: string, id: number) => void;
}>();

const iconName = computed(() => {
    switch (props.type) {
        case 'Email': return 'uiw:mail';
        case 'Phone': return 'ic:baseline-phone';
        case 'Company URL': return 'mdi:web';
        case 'Link': return 'ic:sharp-link';
        case 'Address': return 'mdi:map-marker-outline'
        case 'Twitter': return 'akar-icons:twitter-fill';
        case 'Instagram': return 'akar-icons:instagram-fill';
        case 'Facebook': return 'akar-icons:facebook-fill';
        case 'YouTube': return 'akar-icons:youtube-fill';
        case 'SnapChat': return 'akar-icons:snapchat-fill';
        case 'TikTok': return 'akar-icons:tiktok-fill';
        case 'Twitch': return 'akar-icons:twitch-fill';
        case 'LinkedIn': return 'akar-icons:linkedin-fill';
        case 'WhatsApp': return 'akar-icons:whatsapp-fill';
        case 'Signal': return 'bi:signal';
        case 'Discord': return 'akar-icons:discord-fill';
        case 'Skype': return 'mdi:skype';
        case 'Telegram': return 'akar-icons:telegram-fill';
        case 'GitHub': return 'akar-icons:github-fill';
        case 'Calendly': return 'simple-icons:calendly';
        case 'PayPal': return 'ic:round-paypal';
        case 'Venmo': return 'bxl:venmo';
        case 'Cash App': return 'tabler:brand-cashapp';
        case 'Threads': return 'bi:threads';
        case 'Yelp': return 'bi:yelp'
    }
});
</script>

<template>
    <div class="flex flex-row items-center gap-3" @click="props.OnUpdateEdit(props.type, props.id)">
        <div class="flex items-center justify-center w-11 h-11 bg-red-500 rounded-full">
            <Icon :name="iconName" class="text-white group-hover:text-red text-center h-7 w-7 shrink-0"
                aria-hidden="true" />
        </div>
        <div
            v-if="props.type == 'Company URL' || props.type == 'Link' || props.group == 'Social' || props.group == 'Messaging' || props.group == 'Business' || props.group == 'Payment'">
            <h1 class="text-1xl font-semibold text-black">{{ props.title }}</h1>
        </div>
        <div v-else class="flex flex-col">
            <h1 class="text-1xl font-semibold text-black">{{ props.value }}</h1>
            <h1 class="text-1xl font-normal text-black">{{ props.label }}</h1>
        </div>
    </div>
</template>