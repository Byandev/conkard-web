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


<template>
  <div>
    <AddName v-if="modalTitle == 'Name'" @update:open="closeModal" />
    <AddJobTitle v-else-if="modalTitle == 'Job title'" @update:open="closeModal" />
    <AddDepartment v-else-if="modalTitle == 'Department'" @update:open="closeModal" />
    <AddCompanyName v-else-if="modalTitle == 'Company name'" @update:open="closeModal" />
    <AddAccreditation v-else-if="modalTitle == 'Accreditation'" @update:open="closeModal" />
    <AddHeadline v-else-if="modalTitle == 'Headline'" @update:open="closeModal" />

    <!-- General -->
    <AddGeneral :id="id" :edit_data="isEdit" v-else-if="modalTitle == 'Email'" fieldLabel="Email"
      fieldName="email-value" fieldPlaceholder="Value" fieldType="emailField" :buttonText="['Work', 'Personal']"
      @update:open="closeModal" type="Email" />
    <AddGeneral :id="id" :edit_data="isEdit" v-else-if="modalTitle == 'Phone'" :buttonText="['Mobile', 'Home', 'Work']"
      @update:open="closeModal" type="Phone" />
    <AddGeneral :id="id" :edit_data="isEdit" v-else-if="modalTitle == 'Company URL'"
      :buttonText="['Website', 'LinkedIn']" @update:open="closeModal" type="Company URL" />
    <AddGeneral :id="id" :edit_data="isEdit" v-else-if="modalTitle == 'Link'" @update:open="closeModal" type="Link" />
    <AddGeneral :id="id" :edit_data="isEdit" v-else-if="modalTitle == 'Address'" :buttonText="['Home', 'Work']"
      @update:open="closeModal" type="Address" />

    <!-- Socials -->
    <AddSocials :id=id :edit_data="isEdit" v-else-if="modalTitle == 'Twitter'" :button-text="['Follow me on X']"
      type="Twitter" @update:open="closeModal" />
    <AddSocials :id=id :edit_data="isEdit" v-else-if="modalTitle == 'Instagram'"
      :button-text="['Follow me on Instagram']" type="Instagram" @update:open="closeModal" />
    <AddSocials :id=id :edit_data="isEdit" type="Threads" v-else-if="modalTitle == 'Threads'"
      @update:open="closeModal" />
    <AddSocials :id=id :edit_data="isEdit" type="LinkedIn" v-else-if="modalTitle == 'LinkedIn'"
      @update:open="closeModal" :button-text="['Connect with me on LinkedIn']" />
    <AddSocials :id=id :edit_data="isEdit" v-else-if="modalTitle == 'Facebook'" :button-text="['Follow me on Facebook']"
      type="Facebook" @update:open="closeModal" />
    <AddSocials :id=id :edit_data="isEdit" v-else-if="modalTitle == 'YouTube'"
      :button-text="['Subscribe to my channel on YouTube']" type="YouTube" @update:open="closeModal" />
    <AddSocials :id=id :edit_data="isEdit" v-else-if="modalTitle == 'SnapChat'"
      :button-text="['Add me on SnapChat', 'Send me a snap']" type="SnapChat" @update:open="closeModal" />
    <AddSocials :id=id :edit_data="isEdit" v-else-if="modalTitle == 'TikTok'" :button-text="['Follow me on TikTok']"
      type="TikTok" @update:open="closeModal" />
    <AddSocials :id=id :edit_data="isEdit" v-else-if="modalTitle == 'Twitch'" :button-text="['Follow me on Twitch']"
      type="Twitch" @update:open="closeModal" />
    <AddSocials :id=id :edit_data="isEdit" type="Yelp" v-else-if="modalTitle == 'Yelp'"
      :button-text="['View our business on Yelp']" @update:open="closeModal" />

    <!-- Messaging -->
    <AddMessaging :id=id :edit_data="isEdit" type="WhatsApp"
      :button-text="['Add me on WhatsApp', 'Connect with me on WhatsApp']" v-else-if="modalTitle == 'WhatsApp'"
      @update:open="closeModal" />
    <AddMessaging :id=id :edit_data="isEdit" type="Signal"
      :button-text="['Add me on Signal', 'Connect with me on Signal']" v-else-if="modalTitle == 'Signal'"
      @update:open="closeModal" />
    <AddMessaging :id=id :edit_data="isEdit" type="Discord" :button-text="['Join our Discord server']"
      v-else-if="modalTitle == 'Discord'" @update:open="closeModal" />
    <AddMessaging :id=id :edit_data="isEdit" type="Skype" :button-text="['Call me on Skype', 'Skype with me']"
      v-else-if="modalTitle == 'Skype'" @update:open="closeModal" />
    <AddMessaging :id=id :edit_data="isEdit" v-else-if="modalTitle == 'Telegram'"
      :button-text="['Connect with me on Telegram']" type="Telegram" @update:open="closeModal" />

    <!-- Business -->
    <AddBusiness :id=id :edit_data="isEdit" v-else-if="modalTitle == 'GitHub'"
      :button-text="['View my work on GitHub', 'View our GitHub repo']" type="GitHub" @update:open="closeModal" />
    <AddBusiness :id=id :edit_data="isEdit" v-else-if="modalTitle == 'Calendly'"
      :button-text="['Book a session with me', 'Book a meeting with me']" type="Calendly" @update:open="closeModal" />

    <!-- Payments -->
    <AddPayment :id=id :edit_data="isEdit" v-else-if="modalTitle == 'PayPal'" :button-text="['Pay via PayPal']"
      type="PayPal" @update:open="closeModal" />
    <AddPayment :id=id :edit_data="isEdit" v-else-if="modalTitle == 'Venmo'" :button-text="['Pay via Venmo ']"
      type="Venmo" @update:open="closeModal" />
    <AddPayment :id=id :edit_data="isEdit" v-else-if="modalTitle == 'Cash App'" :button-text="['Pay via Cash App ']"
      type="Cash App" @update:open="closeModal" />
  </div>
</template>