<script lang="ts" setup>
import {ref} from 'vue';
import {useSubmit} from "~/composables/useSubmit";
import type {User} from "~/types/models/User";

const router = useRouter();
const {getSession} = useAuth()
const {setToken} = useAuthState()
const {error, sendRequest, data: response} = useSubmit<{ data: { access_token: string, user: User } }>()

const form = ref({
  name: '',
  email: '',
  password: '',
  password_confirmation: '',
});


const submitForm = async () => {
  await sendRequest('/v1/auth/register', {
    method: 'POST',
    body: {
      name: form.value.name,
      email: form.value.email,
      password: form.value.password,
      password_confirmation: form.value.password_confirmation,
    },
  });

  setToken(response.value?.data?.access_token as string)

  await getSession()

  await router.push("/dashboard")
};
</script>

<template>
  <div class="flex min-h-full flex-1">
    <div class="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
      <div class="mx-auto w-full max-w-sm lg:w-96">
        <div>
          <img
              alt="Your Company" class="h-10 w-auto"
              src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600">
          <h2 class="mt-8 text-2xl font-bold leading-9 tracking-tight text-gray-900">Register an account</h2>
          <p class="mt-2 text-sm leading-6 text-gray-500">
            Already a member?
            {{ ' ' }}
            <NuxtLink class="font-semibold text-indigo-600 hover:text-indigo-500" to="/authentication/login">Login to
              your account.
            </NuxtLink>
          </p>
        </div>

        <div class="mt-10">
          <div>
            <form class="space-y-6" method="POST" @submit.prevent="submitForm">
              <div>
                <label class="block text-sm font-medium leading-6 text-gray-900" for="name">Name</label>
                <div class="mt-2">
                  <input
                      id="name" v-model="form.name"
                      class="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      required
                      type="text">
                </div>
              </div>

              <div>
                <label class="block text-sm font-medium leading-6 text-gray-900" for="email">Email address</label>
                <div class="mt-2">
                  <input
                      id="email" v-model="form.email" autocomplete="email"
                      class="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      required
                      type="email">
                </div>
              </div>

              <div>
                <label class="block text-sm font-medium leading-6 text-gray-900" for="password">Password</label>
                <div class="mt-2">
                  <input
                      id="password" v-model="form.password" autocomplete="current-password"
                      class="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      required
                      type="password">
                </div>
              </div>

              <div>
                <label class="block text-sm font-medium leading-6 text-gray-900" for="password_confimation">Password
                  Confimation</label>
                <div class="mt-2">
                  <input
                      id="password_confimation" v-model="form.password_confirmation"
                      class="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      required
                      type="password">
                </div>
              </div>
              <div>
                <button
                    class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    type="submit">
                  Sign up
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    <div class="relative hidden w-0 flex-1 lg:block">
      <img
          alt=""
          class="absolute inset-0 h-full w-full object-cover"
          src="https://images.unsplash.com/photo-1496917756835-20cb06e75b4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1908&q=80">
    </div>
  </div>
</template>
