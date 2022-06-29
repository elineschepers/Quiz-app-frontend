<template>
<div>
  <nav>
    <div id="nav-desktop" >
      <div class="flex items-center justify-between h-16 ">
        <div class="flex items-center">
          <div>
            <nuxt-link id="logoMobile" :to="localePath({ name: 'index' })" >
                <img class="h-11" src="@/assets/images/logo_ucll_rgb_white.svg" alt="Workflow">
              </nuxt-link>
          </div>
          <div class="hidden md:block">
            <div class="nav-links">
              <nuxt-link :to="localeRoute({ name: 'index' })">Dashboard</nuxt-link>
              <nuxt-link :to="localeRoute({ name: 'disabledstudents' })">{{$t("disabled.nav")}}</nuxt-link>
              <nuxt-link :to="localeRoute({ name: 'howto' })">{{$t("howto.nav")}}</nuxt-link>
            </div>
          </div>
        </div>

        

        <div class="hidden md:block">
          <div class="ml-4 flex items-center md:ml-6">
             <div class="dropdown relative">
              <button
                class="dropdown-toggle inline-block px-6 py-2.5 bg-regal-blue-100 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-regal-blue-200
                  hover:shadow-lg focus:bg-regal-blue-200 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-regal-blue-200 active:shadow-lg transition duration-150 ease-in-out
                  flex items-center whitespace-nowrap gap-2"
                type="button" @click.prevent="openModal = true;"><span class="sr-only" v-t="'general.stop'" />
                {{$t("dashboard.language")}}
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 " fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                </svg>
              </button>
            </div>



            <!-- Profile dropdown -->
            <div class="ml-3 relative" v-on-clickaway="closeDropdown">
              <div>
                <button @click="open = !open" class="max-w-xs bg-regal-blue-100 rounded-full flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-regal-blue-200 focus:ring-white" id="user-menu" aria-haspopup="true" x-bind:aria-expanded="open">
                  <span class="sr-only">Open user menu</span>
                  <img class="h-8 w-8 rounded-full" :src="getAvatar()" alt="">
                </button>
              </div>
              <transition enter-active-class="transition ease-out duration-100" enter-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100" leave-active-class="transition ease-in duration-75" leave-class="transform opacity-100 scale-100" leave-to-class="transform opacity-0 scale-95">
                <div v-if="open" class="dropdown-menu-links" role="menu" aria-orientation="vertical" aria-labelledby="user-menu">
                  <div class="block px-4 py-2 text-sm text-gray-700">{{getName()}} <br> {{getUserId()}}</div>
                  <a href="/api/auth/logout" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" v-t="'auth.logout'" />
                </div>
              </transition>
            </div>
          </div>
        </div>
        <div id="mobile-menu-button">
          <!-- Mobile menu button -->
          
          <button @click="mobileopen = !mobileopen" class="button button-primary">
            <span class="sr-only">Open main menu</span>
            <svg :class="{ 'hidden': mobileopen, 'block': !mobileopen }" class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            <svg :class="{ 'hidden': !mobileopen, 'block': mobileopen }" class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <div id="nav-mobile" :class="{ 'block': mobileopen, 'hidden': !mobileopen }" >
      <div class="nav-links">
        <ul>
          <li @click="closeMobile()"><nuxt-link :to="localeRoute({ name: 'index' })">Dashboard</nuxt-link></li>
          <li @click="closeMobile()"><nuxt-link :to="localeRoute({ name: 'disabledstudents' })">{{$t("disabled.nav")}}</nuxt-link></li>
          <li @click="closeMobile()"><nuxt-link :to="localeRoute({ name: 'howto' })">{{$t("howto.nav")}}</nuxt-link></li>
          <li> <button id="languageButton" type="button" class="flex items-center content-center justify-center"  @click.prevent="openModal = true;"><span class="sr-only" v-t="'general.stop'" />{{$t("dashboard.language")}} 
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 " fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
              </svg>
          </button></li>
          
        </ul>
      </div>

      
      
      <div class="pt-4 pb-3 border-t border-regal-blue-200">
        <div class="flex items-center px-5">
          <div class="flex-shrink-0">
            <img class="h-10 w-10 rounded-full" :src="getAvatar()" alt="">
          </div>
          <div class="ml-3">
            <div class="text-base font-medium text-white">{{getName()}}</div>
            <div class="text-sm font-medium text-white">{{getUserId()}}</div>
          </div>

        </div>
        <div class="mt-3 px-2 space-y-1 nav-links" >
          <a href="/api/auth/logout">
            {{$t("auth.logout")}}
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 inline" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  </nav>

  <!-- Modal to confirm language -->
          <modal v-model="openModal" modal-title-id="closeModalTitle" id="languageModel">
            <template>
              <div class="modal-icon">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                </svg>
              </div>
              <div class="modal-body">
                <h3 class="modal-title" id="closeModalTitle" v-t="'language.choice.title'" />
                <p v-t="'language.choice.text'" />
              </div>
            </template>
            <template slot="footer">
              <div>
                <ul>
                  <li class="" v-for="locale in availableLocales" :key="locale.code">
                      <div v-if="locale.code === $i18n.locale" class=" justify-center text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-gray-700 flex items-center" @click="closeMobile()" >
                        {{locale.name}}
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 ml-2 align-center" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        </div>
                        <div v-else @click="closeMobile()">
                          <nuxt-link class="justify-center text-center text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-gray-700 flex items-center" :to="switchLocalePath(locale.code)">{{locale.name}}</nuxt-link>
                        </div>
                    </li>
                </ul>
              </div>
            </template>
          </modal>
</div>
</template>

<script>
import { mixin as clickaway } from 'vue-clickaway';

export default {
  name: 'components-layout-navigation',
  mixins: [ clickaway ],
  data () {
    return {
      avatar: this.$parent.$parent.avatar,
	    open: false,
      mobileopen: false,
      openModal:false
    }
  },
  methods: {
    closeDropdown () {
      this.open = false;
    },
    closeMobile () {
      this.mobileopen = false;
      this.openModal = false;
    },
    getAvatar () {
      const user = this.$store.getters.user;
      return "https://eu.ui-avatars.com/api/?name=" + user.firstName.charAt(0) + "+" + user.lastName.charAt(0);
    },
    getName () {
      const user = this.$store.getters.user;
      return user.firstName + " " + user.lastName;
    },
    getUserId () {
      return this.$store.getters.user.accountId;
    }

  }, computed: {
    availableLocales () {
    return this.$i18n.locales.filter(i => i.code)
  }
  }
}
</script>

<style lang="scss">
nav {
  @apply bg-regal-blue-100;

  #nav-desktop {
    @apply max-w-7xl mx-auto px-4 sm:px-6 lg:px-8;

    .nav-links {
      @apply flex items-center space-x-4 items-center justify-center content-end;

      a {
        @apply text-white hover:bg-regal-blue-200 hover:bg-opacity-75 px-3 py-2 rounded-md text-sm font-medium;

        &.nuxt-link-exact-active {
          @apply bg-regal-blue-200;
        }
        &#logo{
          @apply bg-regal-blue-100;
      }
      }
      
    }


    .dropdown-menu-links {
      @apply origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5;
    }
  }
  #nav-mobile {
    
    .nav-links {
      @apply px-2 pt-2 pb-3 space-y-1 sm:px-3;
      
      a {
        @apply text-white hover:bg-opacity-75 block px-3 py-2 rounded-md text-base font-medium;

        &.nuxt-link-exact-active {
          @apply bg-regal-blue-200;
        }
        
      }
      button {
        @apply text-white hover:bg-opacity-75 block px-3 py-2 rounded-md text-base font-medium;

        &#languageButton{
          @apply items-center flex gap-2 ;
        }
      }

    }
  }

  #mobile-menu-button {
    @apply -mr-2 flex md:hidden;
  }
}
</style>
