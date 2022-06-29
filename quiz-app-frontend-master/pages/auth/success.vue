<template>
  <main class="content">
    <div v-if="!isAuthenticated">
      <h1>You were redirected to this page but are not logged in.</h1>
      <p class="text-sm">Perhaps the login failed or you used the back button.</p>
    </div>
  </main>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'pages-auth-welcome',
  computed: {
    ...mapGetters({
      isAuthenticated: 'isAuthenticated',
    }),
  },
  mounted () {
    if (this.isAuthenticated) {
      this.$router.push(this.localePath({ name: 'index' }));
    }
  }
}
</script>
