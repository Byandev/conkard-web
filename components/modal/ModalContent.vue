<template>
    <div>
        <AddName v-if="ModalTitle == 'Name'" />
        <FloatingLabelTextarea v-else-if="ModalTitle == 'Job title'" label="Job title" input-name="job-title"
            placeholder="Job title" input-type="text" class="w-full" />
        <FloatingLabelTextarea v-else-if="ModalTitle == 'Department'" label="Department" input-name="department"
            placeholder="Department" input-type="text" class="w-full" />
        <FloatingLabelTextarea v-else-if="ModalTitle == 'Company name'" label="Company name" input-name="company-name"
            placeholder="Company name" input-type="text" class="w-full" />
        <AddAccreditation v-else-if="ModalTitle == 'Accreditation'" />
        <FloatingLabelTextarea v-else-if="ModalTitle == 'Headline'" label="Headline" input-name="headline"
            placeholder="Headline" input-type="text" class="w-full" />
        <AddEmail v-else-if="ModalTitle == 'Email'" />
        <AddPhone v-else-if="ModalTitle == 'Phone'" />
        <AddCompanyURL v-else-if="ModalTitle == 'Company URL'" />
        <AddLink v-else-if="ModalTitle == 'Link'" />
        <AddAddress v-else-if="ModalTitle == 'Address'" />
        <AddSocials :buttonText="['Follow me on X']" v-else-if="ModalTitle == 'Twitter'" />
        <AddSocials :buttonText="['Follow me on Instagram']" v-else-if="ModalTitle == 'Instagram'" />
        <AddThreads v-else-if="ModalTitle == 'Threads'" />
        <AddLinkedIn v-else-if="ModalTitle == 'LinkedIn'" />
        <AddSocials :buttonText="['Follow me on Facebook']" v-else-if="ModalTitle == 'Facebook'" />
        <AddSocials :buttonText="['Subscribe to my channel on YouTube']" v-else-if="ModalTitle == 'YouTube'" />
        <AddSocials :buttonText="['Add me on SnapChat', 'Send me a snap']" v-else-if="ModalTitle == 'SnapChat'" />
        <AddSocials :buttonText="['Follow me on TikTok']" v-else-if="ModalTitle == 'TikTok'" />
        <AddSocials :buttonText="['Follow me on TikTok']" v-else-if="ModalTitle == 'TikTok'" />
        <AddSocials :buttonText="['Follow me on Twitch']" v-else-if="ModalTitle == 'Twitch'" />
        <AddYelp :buttonText="['View our business on Yelp']" v-else-if="ModalTitle == 'Yelp'" />
        <AddWhatsApp v-else-if="ModalTitle == 'WhatsApp'" />
        <AddSignal v-else-if="ModalTitle == 'Signal'" />
        <AddDiscord :buttonText="['Join our Discord server']" v-else-if="ModalTitle == 'Discord'" />
        <AddSocials :buttonText="['Follow me on Twitch']" v-else-if="ModalTitle == 'Twitch'" />
        <AddSkype :buttonText="['Call me on Skype', 'Skype with me']" v-else-if="ModalTitle == 'Skype'" />
        <AddSocials :buttonText="['Connect with me on Telegram']" v-else-if="ModalTitle == 'Telegram'" />
        <AddSocials :buttonText="['View my work on GitHub', 'View our GitHub repo']"
            v-else-if="ModalTitle == 'GitHub'" />
        <AddSocials :buttonText="['Book a session with me', 'Book a meeting with me']"
            v-else-if="ModalTitle == 'Calendly  '" />
        <AddSocials :buttonText="['Pay via PayPal']" v-else-if="ModalTitle == 'PayPal'" />
        <AddSocials :buttonText="['Pay via Venmo ']" v-else-if="ModalTitle == 'Venmo'" />
        <AddSocials :buttonText="['Pay via Cash App ']" v-else-if="ModalTitle == 'Cash App'" />
    </div>
</template>

<script setup lang="ts">

defineProps<{
    ModalTitle: string;
}>();
</script>