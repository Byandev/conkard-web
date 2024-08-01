<template>
    <div class="min-h-screen flex items-center justify-center bg-gray-100">
        <div class="bg-white p-8 rounded shadow-md w-96 max-w-md">
            <h1 class="text-2xl font-bold mb-6 text-center">Email Verification</h1>
            <form @submit="submitForm" class="space-y-4">
                <div>
                    <label for="email" class="block text-sm font-medium text-gray-700">Email:</label>
                    <input type="email" id="email" v-model="email" required class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                </div>
                <button type="submit" class="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md shadow hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Verify</button>
            </form>
            <div v-if="verificationStatus" class="mt-4">
                <p v-if="verificationStatus === 'success'" class="text-green-600">Email verified successfully!</p>
                <p v-if="verificationStatus === 'error'" class="text-red-600">Email verification failed. Please try again.</p>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    data() {
        return {
            email: '',
            verificationStatus: ''
        };
    },
    methods: {
        submitForm() {
            // Perform email verification logic here
            // You can make an API call to your backend to verify the email
            
            // For demonstration purposes, let's assume the verification is successful
            this.verificationStatus = 'success';
        }
    }
});
</script>

<style scoped>
/* Add your custom styles here */
</style>