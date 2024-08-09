<script setup lang="ts">
import { UserIcon, BriefcaseIcon, UserGroupIcon, BuildingOffice2Icon, ShieldCheckIcon, DocumentCheckIcon, EnvelopeIcon, PhoneIcon, LinkIcon, GlobeAltIcon, MapPinIcon } from '@heroicons/vue/24/solid';

</script>

<template>
    <CardTitle forId="add-details" text="Add your details" />
    <div class="mt-5">
        <CardSubtitle forId="add-details" text="Personal" />
        <div class="mt-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
            <IconTitle foreground="gray" background="gray" :icon="UserIcon" text="Name" />
            <IconTitle foreground="gray" background="gray" :icon="BriefcaseIcon" text="Job title" />
            <IconTitle foreground="gray" background="gray" :icon="UserGroupIcon" text="Department" />
            <IconTitle foreground="gray" background="gray" :icon="BuildingOffice2Icon" text="Company Name" />
            <IconTitle foreground="gray" background="gray" :icon="ShieldCheckIcon" text="Accreditation" />
            <IconTitle foreground="gray" background="gray" :icon="DocumentCheckIcon" text="Headline" />
        </div>
    </div>

    <div class="mt-5">
        <CardSubtitle forId="add-details" text="General" />
        <div class="mt-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
            <IconTitle foreground="gray" background="gray" :icon="EnvelopeIcon" text="Email" />
            <IconTitle foreground="gray" background="gray" :icon="PhoneIcon" text="Phone" />
            <IconTitle foreground="gray" background="gray" :icon="GlobeAltIcon" text="Company URL" />
            <IconTitle foreground="gray" background="gray" :icon="LinkIcon" text="Link" />
            <IconTitle foreground="gray" background="gray" :icon="MapPinIcon" text="Address" />

        </div>
    </div>

    <div class="mt-5">
        <CardSubtitle forId="add-details" text="Socials" />
        <div class="mt-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
            <IconTitleIconify icon="pajamas:twitter" foreground="gray" background="gray" text="Twitter" />
            <IconTitleIconify icon="mdi:instagram" foreground="gray" background="gray" text="Instagram" />
            <IconTitleIconify icon="ri:linkedin-fill" foreground="gray" background="gray" text="LinkedIn" />
            <IconTitleIconify icon="ic:baseline-facebook" foreground="gray" background="gray" text="Facebook" />
            <IconTitleIconify icon="hugeicons:threads" foreground="gray" background="gray" text="Instagram" />
            <IconTitleIconify icon="mdi:youtube" foreground="gray" background="gray" text="Youtube" />
            <IconTitleIconify icon="fa-brands:snapchat" foreground="gray" background="gray" text="Snapchat" />
            <IconTitleIconify icon="ic:baseline-tiktok" foreground="gray" background="gray" text="Tiktok" />
            <IconTitleIconify icon="mdi:twitch" foreground="gray" background="gray" text="Twitch" />
            <IconTitleIconify icon="bi:yelp" foreground="gray" background="gray" text="Yelp" />

        </div>
    </div>

    <div class="mt-5">
        <CardSubtitle forId="add-details" text="Messaging" />
        <div class="mt-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
            <IconTitleIconify icon="ic:baseline-whatsapp" foreground="gray" background="gray" text="Whatsup" />
            <IconTitleIconify icon="bi:signal" foreground="gray" background="gray" text="Signal" />
            <IconTitleIconify icon="ant-design:discord-filled" foreground="gray" background="gray" text="Discord" />
            <IconTitleIconify icon="mdi:skype" foreground="gray" background="gray" text="Skype" />
            <IconTitleIconify icon="bxl:telegram" foreground="gray" background="gray" text="Telegram" />
        </div>
    </div>

    <div class="mt-5">
        <CardSubtitle forId="add-details" text="Business" />
        <div class="mt-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
            <IconTitleIconify icon="mdi:github" foreground="gray" background="gray" text="Github" />
            <IconTitleIconify icon="simple-icons:calendly" foreground="gray" background="gray" text="Calendly" />
        </div>
    </div>

    <div class="mt-5">
        <CardSubtitle forId="add-details" text="Payment" />
        <div class="mt-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
            <IconTitleIconify icon="ic:baseline-paypal" foreground="gray" background="gray" text="Paypal" />
            <IconTitleIconify icon="bxl:venmo" foreground="gray" background="gray" text="Venmo" />
            <IconTitleIconify icon="tabler:brand-cashapp" foreground="gray" background="gray" text="Cash App" />
        </div>
    </div>
</template>