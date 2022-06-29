export default function ({ store, redirect, localePath }) {
  // If the user is not authenticated
  if (!store.getters.isAuthenticated) {
    return redirect(localePath({ name: 'auth-login' }));
  }
}
