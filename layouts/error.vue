<template>
  <div class="max-w-md m-auto text-gray-800">
    <div>
      <svg xmlns="http://www.w3.org/2000/svg" class="h-11 w-11 max-w-md m-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>



      <h1 class="text-center text-2xl">{{ $t('error.header') }}</h1>
      <p class="text-center">{{ $t('error.message') }}</p>

      <div class="flex justify-center items-center h-fit">
          <button class="button button-primary mt-2 mb-4">
            <nuxt-link :to="localeRoute({ name: 'index' })">Dashboard</nuxt-link>
          </button>
        </div>
    </div>

  </div>
</template>

<script>
export default {
  name: 'layouts-error',
  head () {
    return this.$nuxtI18nHead({ addSeoAttributes: true })
  },
}
</script>
