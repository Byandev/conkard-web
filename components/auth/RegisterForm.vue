<script lang="ts" setup>
import { email, minLength, required, sameAs } from "@vuelidate/validators";
import { useSubmit } from "~/composables/useSubmit";
import type { AuthenticationResponse } from "~/types/api/response/auth";
import type { ApiErrorResponse } from "~/types/api/response/error";

const router = useRouter();
const { getSession } = useAuth()
const { setToken } = useAuthState()

const { sendRequest: signUp } = useSubmit<AuthenticationResponse, ApiErrorResponse>()

interface RegisterForm {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}

const RegisterForm = ref<RegisterForm>({
  name: '',
  email: '',
  password: '',
  password_confirmation: '',
});

const RegisterRules = {
  name: { required },
  email: { required, email },
  password: { required, minLength: minLength(6) },
  password_confirmation: { required, sameAsRef: sameAs(computed(() => RegisterForm.value.password)) },
};

const { formRef, v$ } = useValidation(RegisterForm, RegisterRules);

const isLoading = ref(false);

const submitForm = async () => {
  console.log(RegisterForm.value)

  v$.value.$touch();
  if (v$.value.$invalid) return;

  try {
    isLoading.value = true;
    const response = await signUp('/v1/auth/register', {
      method: 'POST',
      body: {
        name: RegisterForm.value.name,
        email: RegisterForm.value.email,
        password: RegisterForm.value.password,
        password_confirmation: RegisterForm.value.password_confirmation,
      },
    });

    setToken(response?.data?.access_token as string)

    await getSession()

    await router.push("/dashboard/cards/personal")
  } catch (error) {
    console.log(error as ApiErrorResponse)
  } finally {
    isLoading.value = false;
    console.log('Form submission attempt finished.')
  }
};
</script>

<template>
  <div class="flex min-h-full flex-1">
    <div class="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
      <div class="mx-auto w-full max-w-sm lg:w-96">
        <div>
          <img
alt="Your Company" class="h-10 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=gray&shade=600">
          <h2 class="mt-8 text-2xl font-bold leading-9 tracking-tight text-gray-900">Register an account</h2>
          <p class="mt-2 text-sm leading-6 text-gray-500">
            Already a member?
            {{ ' ' }}
            <NuxtLink class="font-semibold text-indigo-600 hover:text-indigo-500" to="/login">Login to
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
id="name" v-model="formRef.name"
                    :class="{ 'ring-red-300': v$.name.$error, 'ring-gray-300': !v$.name.$error }"
                    class="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    type="text">
                  <span v-if="v$.name.$error" class="text-red-900 text-sm">{{
                    v$.name.$errors[0].$message }}</span>
                </div>
              </div>

              <div>
                <label class="block text-sm font-medium leading-6 text-gray-900" for="email">Email address</label>
                <div class="mt-2">
                  <input
id="email" v-model="formRef.email" autocomplete="email"
                    :class="{ 'ring-red-300': v$.email.$error, 'ring-gray-300': !v$.email.$error }"
                    class="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    type="email">
                  <span v-if="v$.email.$error" class="text-red-900 text-sm">{{
                    v$.email.$errors[0].$message }}</span>
                </div>
              </div>

              <div>
                <label class="block text-sm font-medium leading-6 text-gray-900" for="password">Password</label>
                <div class="mt-2">
                  <input
id="password" v-model="formRef.password" autocomplete="current-password"
                    :class="{ 'ring-red-300': v$.password.$error, 'ring-gray-300': !v$.password.$error }"
                    class="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    type="password">
                  <span v-if="v$.password.$error" class="text-red-900 text-sm">{{
                    v$.password.$errors[0].$message }}</span>
                </div>
              </div>

              <div>
                <label class="block text-sm font-medium leading-6 text-gray-900" for="password_confimation">Password
                  Confimation</label>
                <div class="mt-2">
                  <input
id="password_confimation" v-model="formRef.password_confirmation"
                    :class="{ 'ring-red-300': v$.password_confirmation.$error, 'ring-gray-300': !v$.password_confirmation.$error }"
                    class="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    type="password">
                  <span v-if="v$.password_confirmation.$error" class="text-red-900 text-sm">{{
                    v$.password_confirmation.$errors[0].$message }}</span>
                </div>
              </div>
              <div>
                <Button
:is-wide="true" :is-loading="isLoading" text="Sign up" background="gray" foreground="white"
                  type="submit" />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    <div class="relative hidden w-0 flex-1 lg:block">
      <img
alt="" class="absolute inset-0 h-full w-full object-cover"
        src="https://images.unsplash.com/photo-1496917756835-20cb06e75b4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1908&q=80">
    </div>
  </div>
</template>
