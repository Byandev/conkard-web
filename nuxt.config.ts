// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true
   },
  css: ["~/assets/css/main.css"],

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  runtimeConfig: {
    public: {
      apiURL: process.env.API_URL,
    },
  },

  components: [
    {
      path: "~/components",
      pathPrefix: false,
    },
  ],

  modules: [
    "@nuxtjs/tailwindcss",
    "@sidebase/nuxt-auth",
    "@nuxt/eslint",
    "@pinia/nuxt",
    "@nuxt/icon",
    "@vueform/nuxt",
    "nuxt-svgo",
  ],

  auth: {
    baseURL: process.env.API_URL,
    provider: {
      type: "local",
      pages: {
        login: "/",
      },
      endpoints: {
        signIn: { path: "v1/auth/login", method: "post" },
        signOut: { path: "v1/auth/logout", method: "post" },
        signUp: { path: "v1/auth/register", method: "post" },
        getSession: { path: "v1/auth/me", method: "get" },
      },
      token: {
        signInResponseTokenPointer: "/data/access_token",
        cookieName: process.env.AUTH_COOKIE_NAME || "accessToken",
        maxAgeInSeconds: 1800,
      },
    },
    globalAppMiddleware: true,
  },
});