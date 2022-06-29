<template>
  <header>
    <div class="header-container">
      <h1>{{ title }}</h1>
    </div>
  </header>
</template>

<script>
export default {
  name: 'components-layout-header',
  props: {
    title: {
      type: String,
      default: 'Untitled page',
      required: true,
    }
  },
}
</script>

<style lang="scss">
header {
  @apply bg-white shadow-sm;

  .header-container {
    @apply max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8;

    h1 {
      @apply text-lg leading-6 font-semibold text-gray-900;
    }
  }
}
</style>
