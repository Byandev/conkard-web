<template>
  <div>
    <AddName v-if="modalTitle == 'Name'" @update:open="closeModal" />
    <AddJobTitle v-else-if="modalTitle == 'Job title'" @update:open="closeModal" />
    <AddDepartment v-else-if="modalTitle == 'Department'" @update:open="closeModal" />
    <AddCompanyName v-else-if="modalTitle == 'Company name'" @update:open="closeModal" />
    <AddAccreditation v-else-if="modalTitle == 'Accreditation'" @update:open="closeModal" />
    <AddHeadline v-else-if="modalTitle == 'Headline'" @update:open="closeModal" />
    <AddEmail :id=id :edit_data="isEdit" v-else-if="modalTitle == 'Email'" @update:open="closeModal" />
    <AddPhone :id=id :edit_data="isEdit" v-else-if="modalTitle == 'Phone'" @update:open="closeModal" />
    <AddCompanyURL v-else-if="modalTitle == 'Company URL'" />
    <AddLink v-else-if="modalTitle == 'Link'" />
    <AddAddress v-else-if="modalTitle == 'Address'" />
    <AddSocials v-else-if="modalTitle == 'Twitter'" :button-text="['Follow me on X']" />
    <AddSocials v-else-if="modalTitle == 'Instagram'" :button-text="['Follow me on Instagram']" />
    <AddThreads v-else-if="modalTitle == 'Threads'" />
    <AddLinkedIn v-else-if="modalTitle == 'LinkedIn'" />
    <AddSocials v-else-if="modalTitle == 'Facebook'" :button-text="['Follow me on Facebook']" />
    <AddSocials v-else-if="modalTitle == 'YouTube'" :button-text="['Subscribe to my channel on YouTube']" />
    <AddSocials v-else-if="modalTitle == 'SnapChat'" :button-text="['Add me on SnapChat', 'Send me a snap']" />
    <AddSocials v-else-if="modalTitle == 'TikTok'" :button-text="['Follow me on TikTok']" />
    <AddSocials v-else-if="modalTitle == 'Twitch'" :button-text="['Follow me on Twitch']" />
    <AddYelp v-else-if="modalTitle == 'Yelp'" :button-text="['View our business on Yelp']" />
    <AddWhatsApp v-else-if="modalTitle == 'WhatsApp'" />
    <AddSignal v-else-if="modalTitle == 'Signal'" />
    <AddDiscord v-else-if="modalTitle == 'Discord'" :button-text="['Join our Discord server']" />
    <AddSkype v-else-if="modalTitle == 'Skype'" :button-text="['Call me on Skype', 'Skype with me']" />
    <AddSocials v-else-if="modalTitle == 'Telegram'" :button-text="['Connect with me on Telegram']" />
    <AddSocials v-else-if="modalTitle == 'GitHub'" :button-text="['View my work on GitHub', 'View our GitHub repo']" />
    <AddSocials v-else-if="modalTitle == 'Calendly'"
      :button-text="['Book a session with me', 'Book a meeting with me']" />
    <AddSocials v-else-if="modalTitle == 'PayPal'" :button-text="['Pay via PayPal']" />
    <AddSocials v-else-if="modalTitle == 'Venmo'" :button-text="['Pay via Venmo ']" />
    <AddSocials v-else-if="modalTitle == 'Cash App'" :button-text="['Pay via Cash App ']" />
  </div>
</template>

<script setup lang="ts">
defineProps<{
  modalTitle: string;
  isEdit: boolean;
  id?: number;
}>();

const emit = defineEmits(["update:open"]);

const closeModal = () => {
  emit("update:open", false);
};
</script>
