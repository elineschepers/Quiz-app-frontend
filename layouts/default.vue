<template>
  <div id="page-wrapper">
    <layout-navigation />

    <Nuxt />

    <layout-footer />
  </div>
</template>

<script>
export default {
  name: 'layouts-default',
  head () {
    return this.$nuxtI18nHead({ addSeoAttributes: true })
  }
}
</script>
