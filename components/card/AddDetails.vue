<script setup lang="ts">
import { UserIcon, BriefcaseIcon, UserGroupIcon, BuildingOffice2Icon, ShieldCheckIcon, DocumentCheckIcon, EnvelopeIcon, PhoneIcon, LinkIcon, GlobeAltIcon, MapPinIcon } from '@heroicons/vue/24/solid';
import { useNewCardStore } from '~/store/newCardStore';

const newCardStore = useNewCardStore();

const { nameField, jobField, departmentField, companyNameField, accreditationField, headlineField, emailField } = storeToRefs(newCardStore);

const emit = defineEmits(['update:title', 'update:open', 'update:isEdit', 'update:id']);

const updateTitle = (title: string) => {
    emit('update:title', title);
    emit('update:open', true);
    emit('update:isEdit', false);
    emit('update:id', null);
};
</script>

<template>
    <CardTitle forId="add-details" text="Add your details" />
    <div class="mt-5">
        <CardSubtitle forId="add-details" text="Personal" />
        <div class="mt-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
            <IconTitle class=" disabled:opacity-40 disabled:cursor-not-allowed" @click="updateTitle('Name')"
                foreground="gray" background="gray" :icon="UserIcon" text="Name" :disabled="nameField !== undefined" />
            <IconTitle class=" disabled:opacity-40 disabled:cursor-not-allowed" @click="updateTitle('Job title')"
                foreground="gray" background="gray" :icon="BriefcaseIcon" text="Job title"
                :disabled="jobField !== undefined" />
            <IconTitle class=" disabled:opacity-40 disabled:cursor-not-allowed" @click="updateTitle('Department')"
                foreground="gray" background="gray" :icon="UserGroupIcon" text="Department"
                :disabled="departmentField !== undefined" />
            <IconTitle class=" disabled:opacity-40 disabled:cursor-not-allowed" @click="updateTitle('Company name')"
                foreground="gray" background="gray" :icon="BuildingOffice2Icon" text="Company name"
                :disabled="companyNameField !== undefined" />
            <IconTitle class="disabled:opacity-40 disabled:cursor-not-allowed" @click="updateTitle('Accreditation')"
                foreground="gray" background="gray" :icon="ShieldCheckIcon" text="Accreditation"
                :disabled="accreditationField.length !== 0" />
            <IconTitle class=" disabled:opacity-40 disabled:cursor-not-allowed" @click="updateTitle('Headline')"
                foreground="gray" background="gray" :icon="DocumentCheckIcon" text="Headline"
                :disabled="headlineField !== undefined" />
        </div>
    </div>

    <div class="mt-5">
        <CardSubtitle forId="add-details" text="General" />
        <div class="mt-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
            <IconTitle @click="updateTitle('Email')" foreground="gray" background="gray" :icon="EnvelopeIcon"
                text="Email" />
            <IconTitle @click="updateTitle('Phone')" foreground="gray" background="gray" :icon="PhoneIcon"
                text="Phone" />
            <IconTitle @click="updateTitle('Company URL')" foreground="gray" background="gray" :icon="GlobeAltIcon"
                text="Company URL" />
            <IconTitle @click="updateTitle('Link')" foreground="gray" background="gray" :icon="LinkIcon" text="Link" />
            <IconTitle @click="updateTitle('Address')" foreground="gray" background="gray" :icon="MapPinIcon"
                text="Address" />
        </div>
    </div>

    <div class="mt-5">
        <CardSubtitle forId="add-details" text="Socials" />
        <div class="mt-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
            <IconTitleIconify @click="updateTitle('Twitter')" icon="pajamas:twitter" foreground="gray" background="gray"
                text="Twitter" />
            <IconTitleIconify @click="updateTitle('Instagram')" icon="mdi:instagram" foreground="gray" background="gray"
                text="Instagram" />
            <IconTitleIconify @click="updateTitle('LinkedIn')" icon="ri:linkedin-fill" foreground="gray"
                background="gray" text="LinkedIn" />
            <IconTitleIconify @click="updateTitle('Facebook')" icon="ic:baseline-facebook" foreground="gray"
                background="gray" text="Facebook" />
            <IconTitleIconify @click="updateTitle('Threads')" icon="hugeicons:threads" foreground="gray"
                background="gray" text="Threads" />
            <IconTitleIconify @click="updateTitle('YouTube')" icon="mdi:youtube" foreground="gray" background="gray"
                text="YouTube" />
            <IconTitleIconify @click="updateTitle('SnapChat')" icon="fa-brands:snapchat" foreground="gray"
                background="gray" text="SnapChat" />
            <IconTitleIconify @click="updateTitle('TikTok')" icon="ic:baseline-tiktok" foreground="gray"
                background="gray" text="TikTok" />
            <IconTitleIconify @click="updateTitle('Twitch')" icon="mdi:twitch" foreground="gray" background="gray"
                text="Twitch" />
            <IconTitleIconify @click="updateTitle('Yelp')" icon="bi:yelp" foreground="gray" background="gray"
                text="Yelp" />
        </div>
    </div>

    <div class="mt-5">
        <CardSubtitle forId="add-details" text="Messaging" />
        <div class="mt-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
            <IconTitleIconify @click="updateTitle('WhatsApp')" icon="ic:baseline-whatsapp" foreground="gray"
                background="gray" text="WhatsApp" />
            <IconTitleIconify @click="updateTitle('Signal')" icon="bi:signal" foreground="gray" background="gray"
                text="Signal" />
            <IconTitleIconify @click="updateTitle('Discord')" icon="ant-design:discord-filled" foreground="gray"
                background="gray" text="Discord" />
            <IconTitleIconify @click="updateTitle('Skype')" icon="mdi:skype" foreground="gray" background="gray"
                text="Skype" />
            <IconTitleIconify @click="updateTitle('Telegram')" icon="bxl:telegram" foreground="gray" background="gray"
                text="Telegram" />
        </div>
    </div>

    <div class="mt-5">
        <CardSubtitle forId="add-details" text="Business" />
        <div class="mt-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
            <IconTitleIconify @click="updateTitle('GitHub')" icon="mdi:github" foreground="gray" background="gray"
                text="GitHub" />
            <IconTitleIconify @click="updateTitle('Calendly')" icon="simple-icons:calendly" foreground="gray"
                background="gray" text="Calendly" />
        </div>
    </div>

    <div class="mt-5">
        <CardSubtitle forId="add-details" text="Payment" />
        <div class="mt-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
            <IconTitleIconify @click="updateTitle('PayPal')" icon="ic:baseline-paypal" foreground="gray"
                background="gray" text="PayPal" />
            <IconTitleIconify @click="updateTitle('Venmo')" icon="bxl:venmo" foreground="gray" background="gray"
                text="Venmo" />
            <IconTitleIconify @click="updateTitle('Cash App')" icon="tabler:brand-cashapp" foreground="gray"
                background="gray" text="Cash App" />
        </div>
    </div>
</template>