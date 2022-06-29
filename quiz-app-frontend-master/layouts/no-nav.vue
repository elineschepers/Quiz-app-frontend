<template>
  <div id="page-wrapper">
    <Nuxt />
  </div>
</template>

<script>
export default {
  name: 'layouts-quiz',
  head () {
    return this.$nuxtI18nHead({ addSeoAttributes: true })
  }
}
</script>
