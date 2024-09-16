<script setup lang="ts">

import EmailIcon from '@/assets/icons/email.svg';
import PhoneIcon from '@/assets/icons/phone.svg';
import CompanyUrlIcon from '@/assets/icons/company-url.svg';
import LinkIcon from '@/assets/icons/link.svg';
import AddressIcon from '@/assets/icons/address.svg';
import TwitterIcon from '@/assets/icons/twitter.svg';
import InstagramIcon from '@/assets/icons/instagram.svg';
import FacebookIcon from '@/assets/icons/facebook.svg';
import YouTubeIcon from '@/assets/icons/youtube.svg';
import SnapChatIcon from '@/assets/icons/snapchat.svg';
import TikTokIcon from '@/assets/icons/tiktok.svg';
import TwitchIcon from '@/assets/icons/twitch.svg';
import LinkedInIcon from '@/assets/icons/linkedin.svg';
import WhatsappIcon from '@/assets/icons/whatsapp.svg';
import SignalIcon from '@/assets/icons/signal.svg';
import DiscordIcon from '@/assets/icons/discord.svg';
import SkypeIcon from '@/assets/icons/skype.svg';
import TelegramIcon from '@/assets/icons/telegram.svg';
import GitHubIcon from '@/assets/icons/github.svg';
import CalendlyIcon from '@/assets/icons/calendly.svg';
import PayPalIcon from '@/assets/icons/paypal.svg';
import VenmoIcon from '@/assets/icons/venmo.svg';   
import CashAppIcon from '@/assets/icons/cashapp.svg';
import ThreadsIcon from '@/assets/icons/threads.svg';
import YelpIcon from '@/assets/icons/yelp.svg';
import SpotifyIcon from '@/assets/icons/spotify.svg'; // Import Spotify icon
import DefaultIcon from '@/assets/icons/default.svg';

const props = defineProps<{
    id: number;
    color: string,
    value?: string;
    label?: string;
    category?: string;
    name: 'Email' | 'Phone' | 'Company URL' | 'Link' | 'Address' | 'X' | 'Instagram' | 'Facebook' | 'YouTube' | 'SnapChat' | 'TikTok' | 'Twitch' | 'LinkedIn' | 'Whatsapp' | 'Signal' | 'Discord' | 'Skype' | 'Telegram' | 'GitHub' | 'Calendly' | 'PayPal' | 'Venmo' | 'Cash App' | 'Threads' | 'Yelp' | 'Spotify' | string;
    onUpdateEdit?: (title: string, id: number) => void;
}>();

const iconName = computed(() => {
    switch (props.name) {
        case 'Email': return EmailIcon;
        case 'Phone': return PhoneIcon;
        case 'Company URL': return CompanyUrlIcon;
        case 'Link': return LinkIcon;
        case 'Address': return AddressIcon;
        case 'X': return TwitterIcon;
        case 'Instagram': return InstagramIcon;
        case 'Facebook': return FacebookIcon;
        case 'Youtube': return YouTubeIcon;
        case 'SnapChat': return SnapChatIcon;
        case 'Tiktok': return TikTokIcon;
        case 'Twitch': return TwitchIcon;
        case 'LinkedIn': return LinkedInIcon;
        case 'Whatsapp': return WhatsappIcon;
        case 'Signal': return SignalIcon;
        case 'Discord': return DiscordIcon;
        case 'Skype': return SkypeIcon;
        case 'Telegram': return TelegramIcon;
        case 'GitHub': return GitHubIcon;
        case 'Calendly': return CalendlyIcon;
        case 'PayPal': return PayPalIcon;
        case 'Venmo': return VenmoIcon;
        case 'Cash App': return CashAppIcon;
        case 'Threads': return ThreadsIcon;
        case 'Yelp': return YelpIcon;
        case 'Spotify': return SpotifyIcon; // Add Spotify case
        default: return DefaultIcon; // Default icon
    }
});
</script>

<template>
    <div
        class="flex flex-row items-center gap-3"
        @click="props.onUpdateEdit && props.onUpdateEdit(props.name, props.id)">
        <div class="flex items-center justify-center w-11 h-11 rounded-full" :style="{ backgroundColor: props.color }">
            <component
                :is="iconName" class="text-white group-hover:text-red text-center h-7 w-7 shrink-0"
                aria-hidden="true" />
        </div>
        <div v-if="['Company URL', 'Link' , 'Calendly'].includes(props.name)" class="flex flex-col">
            <h1 class="text-1xl font-normal text-black">{{ props.label }}</h1>
        </div>
        <div v-else class="flex flex-col">
            <h1 class="text-1xl font-semibold text-black">{{ props.value }}</h1>
            <h1 class="text-1xl font-normal text-black">{{ props.label }}</h1>
        </div>
    </div>
</template>