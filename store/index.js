// State
export const state = () => ({
    quizUuid: '',
    lastnameActive: false,
    autoNextActive: false,
    autoNextTimer: 5,
    user: {},
    authenticated: false,
});

// Mutations
export const mutations = {
  SET_QUIZ_UUID(state, uuid) {
    state.quizUuid = uuid;
  },
  SET_AUTONEXT_ACTIVE(state, active) {
    state.autoNextActive = active;
  },
  SET_AUTONEXT_TIMER(state, autoNextTimer) {
    state.autoNextTimer = autoNextTimer;
  },
  SET_LASTNAME_ACTIVE(state, active) {
    state.lastnameActive = active;
  },
  SET_USER(state, user) {
    state.user = user;
  },
  SET_AUTENTICATED(state, authenticated) {
    state.authenticated = authenticated;
  }
}

// Actions
export const actions = {
  async nuxtServerInit({ dispatch }, { req }) {
    await dispatch('login', req);
  },
  async login({ commit }, req) {
    let options = {
      maxRedirects: 0,
    };

    // Check if is on server
    if (process.server) {
      try {
        // Get cookie from server
        const cookies = (require('cookieparser')).parse(req.headers.cookie);

        // Add jsessionid to options
        options.headers = {
          'Cookie': `JSESSIONID=${cookies.JSESSIONID}`
        };
      } catch (error) {}
    }

    // Check if the user is authenticated by calling the API using the JSESSIONID cookie
    try {
      const data = await this.$axios.$get('/api/auth/user', options);

      commit('SET_USER', data.data);
      commit('SET_AUTENTICATED', true);
    } catch (error) {
      commit('SET_USER', {});
      commit('SET_AUTENTICATED', false);
    }
  }
};

// Getters
export const getters = {
  getQuizUuid: ({ quizUuid }) => (key) => {
    return quizUuid;
  },
  lastnameActive: ({ lastnameActive }) => (key) => {
    return lastnameActive;
  },
  autoNextActive ({ autoNextActive }) {
    return autoNextActive;
  },
  autoNextTimer ({ autoNextTimer }) {
    return autoNextTimer;
  },
  isAuthenticated ({ authenticated }) {
    return authenticated;
  },
  user ({ user }) {
    return user;
  }
};
