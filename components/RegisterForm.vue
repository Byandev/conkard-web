<script setup lang="ts">
import { ref } from 'vue';

const formData = ref({
  name: '',
  email: '',
  password: '',
  password_confirmation: '',
});

const submitForm = async () => {
  const myHeaders = new Headers();
  myHeaders.append("Accept", "application/json");

  const formdata = new FormData();
  formdata.append("name", formData.value.name);
  formdata.append("email", formData.value.email);
  formdata.append("password", formData.value.password);
  formdata.append("password_confirmation", formData.value.password_confirmation);

  console.log(formData.value)

  try {
    const { data: responseData } = await useFetch('http://conkard-api-dev.byandev.com/api/v1/auth/register', {
        method: 'post',
        body: { 
          name: formData.value.name,
          email: formData.value.email,
          password: formData.value.password, 
          password_confirmation: formData.value.password_confirmation
        },
        redirect: 'follow'
    })
    console.log(responseData.value)
  } catch (error) {
    console.error('Error:', error);
  }
};
</script>

<template>
    <div class="flex min-h-full flex-1">
      <div class="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
        <div class="mx-auto w-full max-w-sm lg:w-96">
          <div>
            <img class="h-10 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="Your Company" />
            <h2 class="mt-8 text-2xl font-bold leading-9 tracking-tight text-gray-900">Register an account</h2>
            <p class="mt-2 text-sm leading-6 text-gray-500">
              Already a member?
              {{ ' ' }}
              <NuxtLink to="/login" class="font-semibold text-indigo-600 hover:text-indigo-500">Login to your account.</NuxtLink>
            </p>
          </div>
  
          <div class="mt-10">
            <div>
              <form @submit.prevent="submitForm" method="POST" class="space-y-6">
                <div>
                  <label for="name" class="block text-sm font-medium leading-6 text-gray-900">Name</label>
                  <div class="mt-2">  
                    <input id="name" v-model="formData.name" type="text" required class="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                  </div>
                </div>

                <div>
                  <label for="email" class="block text-sm font-medium leading-6 text-gray-900">Email address</label>
                  <div class="mt-2">
                    <input id="email" v-model="formData.email" type="email" autocomplete="email" required class="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                  </div>
                </div>
  
                <div>
                  <label for="password" class="block text-sm font-medium leading-6 text-gray-900">Password</label>
                  <div class="mt-2">
                    <input id="password" v-model="formData.password" type="password"  autocomplete="current-password" required class="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                  </div>
                </div>

                <div>
                  <label for="password_confimation" class="block text-sm font-medium leading-6 text-gray-900">Password Confimation</label>
                  <div class="mt-2">
                    <input id="password_confimation" v-model="formData.password_confirmation" type="password" required class="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                  </div>
                </div>
  
                <div>
                  <button type="submit" class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sign up</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div class="relative hidden w-0 flex-1 lg:block">
        <img class="absolute inset-0 h-full w-full object-cover" src="https://images.unsplash.com/photo-1496917756835-20cb06e75b4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1908&q=80" alt="" />
      </div>
    </div>
  </template>