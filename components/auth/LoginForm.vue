<script lang="ts" setup>
import { useRouter } from 'vue-router';
import type { ApiErrorResponse } from "~/types/api/response/error";
import { useSubmit } from "~/composables/useSubmit";
import type { AuthenticationResponse } from "~/types/api/response/auth";
import { required, email } from '@vuelidate/validators';
import { useValidation } from '~/composables/useValidation';

const router = useRouter();
const { sendRequest: signIn } = useSubmit<AuthenticationResponse, ApiErrorResponse>()

interface LoginForm {
  email: string;
  password: string;
}

const LoginForm = ref<LoginForm>({
  email: '',
  password: '',
});

const LoginRules = {
  email: { required, email },
  password: { required },
};

const { formRef, v$ } = useValidation(LoginForm, LoginRules);

const { getSession } = useAuth()
const { setToken } = useAuthState();

const isLoading = ref(false);

const submitForm = async () => {
  v$.value.$touch();
  if (v$.value.$invalid) return;

  try {
    isLoading.value = true;
    const response = await signIn('/v1/auth/login', {
      method: 'POST',
      body: {
        email: LoginForm.value.email,
        password: LoginForm.value.password,
      },
    });

    setToken(response?.data?.access_token as string);

    await getSession();

    await router.push("/cards");
  } catch (error) {
    console.error(error as ApiErrorResponse);
  } finally {
    isLoading.value = false;
  }
};
</script>

<template>
  <!-- The form component -->
  <div class="flex min-h-full flex-1">
    <div class="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
      <div class="mx-auto w-full max-w-sm lg:w-96">
        <div>
          <img src="https://upload.wikimedia.org/wikipedia/commons/d/d5/Tailwind_CSS_Logo.svg" alt="Dummy Logo" width="50" height="50">
          <h2 class="mt-8 text-2xl font-bold leading-9 tracking-tight text-gray-900">Sign in to your account
          </h2>
          <p class="mt-2 text-sm leading-6 text-gray-500">
            Not a member?
            {{ ' ' }}
            <NuxtLink class="font-semibold text-indigo-600 hover:text-indigo-500" to="/register">Create a
              account.
            </NuxtLink>
          </p>
        </div>

        <div class="mt-10">
          <div>
            <form class="space-y-6" method="POST" @submit.prevent="submitForm">
              <div>
                <label class="block text-sm font-medium leading-6 text-gray-900" for="email">Email address</label>
                <div class="mt-2">
                  <input
                    id="email" v-model="formRef.email" autocomplete="email"
                    :class="{ 'ring-red-300': v$.email.$error, 'ring-gray-300': !v$.email.$error }"
                    class="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    type="email">
                  <span v-if="v$.email.$error" class="text-red-900 text-sm">{{ v$.email.$errors[0].$message
                    }}</span>
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

              <div class="flex items-center justify-between">
                <div class="flex items-center">
                  <input
id="remember-me" class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                    name="remember-me" type="checkbox">
                  <label class="ml-3 block text-sm leading-6 text-gray-700" for="remember-me">Remember me</label>
                </div>

                <div class="text-sm leading-6">
                  <a class="font-semibold text-indigo-600 hover:text-indigo-500" href="#">Forgot password?</a>
                </div>
              </div>

              <div>
                <Button
:is-wide="true" :is-loading="isLoading" text="Sign in" background="gray" foreground="white"
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
