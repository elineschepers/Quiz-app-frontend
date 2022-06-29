<template>
  <main>
    <div>
      <div class="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div class="sm:mx-auto sm:w-full sm:max-w-md">
          <img class="mx-auto h-32 w-auto" src="@/assets/images/logo_Quiz.png" alt="Logo">
          <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900" v-t="'login.sign_in_to_account'"/>
          <p class="mt-2 text-center text-sm text-gray-600 max-w">
          </p>
        </div>

        <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md ml-4 mr-4">
          <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <div class="mt-6">
              <div class="relative">
                <div class="absolute inset-0 flex items-center">
                  <div class="w-full border-t border-gray-300"></div>
                </div>
                <div class="relative flex justify-center text-sm">
                  <span class="px-2 bg-white text-gray-500" v-t="'login.sign_in_ucll'"/>
                </div>
              </div>

              <div class="mt-6 grid place-items-center">
                <div>
                  <a href="#" @click="login()" class="m-auto w-32 inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                    <span class="sr-only">Sign in with UCLL</span>
                    <img fill="currentColor" viewBox="0 0 20 20" aria-hidden="true" src="@/assets/images/logo_ucll_rgb.png">
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
export default {
  name: 'auth-sign-in',
  layout: 'no-nav',
  ssr: false,
  head() {
    return {
      title: this.$t("auth.signin"),
    }
  },
  methods: {
    login () {
      if (process.server) return;

      window.location.href = window.location.origin + '/api/auth/login';
    }
  }
}
</script>
