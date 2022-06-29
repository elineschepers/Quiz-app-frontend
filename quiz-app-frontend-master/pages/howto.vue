<template>
<div>
  <layout-header :title="$metaInfo.title" />
  <div class="container w-full break-normal mx-auto px-4">

    <h1>{{$t("howto.title")}}</h1>

    <div class="bg-gray-100 py-2">
      <div class="max-w-2xl mx-auto px-4">
        <div class="relative">
          <div class="absolute inset-0 flex items-center" aria-hidden="true">
            <div class="w-full border-t border-gray-300"></div>
          </div>
          <div class="relative flex justify-center">
            <span class="px-3 bg-gray-100 text-lg font-bold font-medium text-gray-900" v-t="'howto.start'"/>
          </div>
        </div>
      </div>
    </div>

    <div class="max-w-full mx-auto py-2 px-4">
      <div class="max-w-2xl mx-auto">
        <div class="bg-white overflow-hidden shadow rounded-lg">
          <div class="px-4 py-auto sm:p-6">
            <ol>
              <li>{{$t("howto.startdata.one")}}</li>
              <li>{{$t("howto.startdata.two")}}</li>
              <li>{{$t("howto.startdata.three")}}</li>
              <li>{{$t("howto.startdata.four")}}</li>
              <li>{{$t("howto.startdata.five")}}</li>
              <li>{{$t("howto.startdata.six")}}
                <ol class="sub">
                  <li><strong>{{$t("howto.startdata.sixdata.atitle")}}</strong>{{$t("howto.startdata.sixdata.a")}}</li>
                  <li><strong>{{$t("howto.startdata.sixdata.btitle")}}</strong>{{$t("howto.startdata.sixdata.b")}}</li>
                  <li><strong>{{$t("howto.startdata.sixdata.ctitle")}}</strong>{{$t("howto.startdata.sixdata.c")}}</li>
                </ol>
              </li>
              <li>{{$t("howto.startdata.seven")}}</li>
            </ol>
          </div>
        </div>
      </div>
    </div>

    <div class="bg-gray-100 py-2">
      <div class="max-w-2xl mx-auto px-4">
        <div class="relative">
          <div class="absolute inset-0 flex items-center" aria-hidden="true">
            <div class="w-full border-t border-gray-300"></div>
          </div>
          <div class="relative flex justify-center">
            <span class="px-3 bg-gray-100 text-lg font-bold font-medium text-gray-900" v-t="'howto.play'"/>
          </div>
        </div>
      </div>
    </div>

    <div class="max-w-full mx-auto py-2 px-4">
      <div class="max-w-2xl mx-auto">
        <div class="bg-white overflow-hidden shadow rounded-lg">
          <div class="px-4 py-auto sm:p-6">
            <ol>
              <li>{{$t("howto.playdata.one")}}&#128521;</li>
              <li>{{$t("howto.playdata.two")}}</li>
            </ol>
          </div>
        </div>
      </div>
    </div>

    <div class="bg-gray-100 py-2">
      <div class="max-w-2xl mx-auto px-4">
        <div class="relative">
          <div class="absolute inset-0 flex items-center" aria-hidden="true">
            <div class="w-full border-t border-gray-300"></div>
          </div>
          <div class="relative flex justify-center">
            <span class="px-3 bg-gray-100 text-lg font-bold font-medium text-gray-900" v-t="'howto.stop'"/>
          </div>
        </div>
      </div>
    </div>

    <div class="max-w-full mx-auto py-2 px-4">
      <div class="max-w-2xl mx-auto">
        <div class="bg-white overflow-hidden shadow rounded-lg">
          <div class="px-4 py-auto sm:p-6">
            <ol>
              <li>{{$t("howto.stopdata.one")}}</li>
              <li>{{$t("howto.stopdata.two")}}</li>
            </ol>
          </div>
        </div>
      </div>
    </div>

    <div class="bg-gray-100 py-2">
      <div class="max-w-2xl mx-auto px-4">
        <div class="relative">
          <div class="absolute inset-0 flex items-center" aria-hidden="true">
            <div class="w-full border-t border-gray-300"></div>
          </div>
          <div class="relative flex justify-center">
            <span class="px-3 bg-gray-100 text-lg font-bold font-medium text-gray-900" v-t="'howto.results'"/>
          </div>
        </div>
      </div>
    </div>

    <div class="max-w-full mx-auto py-2 px-4">
      <div class="max-w-2xl mx-auto">
        <div class="bg-white overflow-hidden shadow rounded-lg">
          <div class="px-4 py-auto sm:p-6">
            <h3 class="mb-2">{{$t("howto.resultquiz")}}</h3>
            <ol>
              <li>{{$t("howto.resultsdata.one")}}</li>
              <li>{{$t("howto.resultsdata.two")}}</li>
              <li>{{$t("howto.resultsdata.three")}}</li>
            </ol>

            <h3 class="mt-6 mb-2">{{$t("howto.resultdashboard")}}</h3>
            <ol>
              <li>{{$t("howto.dashboarddata.one")}}</li>
              <li>{{$t("howto.dashboarddata.two")}}</li>
            </ol>
          </div>
        </div>
      </div>
    </div>

    <div class="bg-gray-100 py-2">
      <div class="max-w-2xl mx-auto px-4">
        <div class="relative">
          <div class="absolute inset-0 flex items-center" aria-hidden="true">
            <div class="w-full border-t border-gray-300"></div>
          </div>
          <div class="relative flex justify-center">
            <span class="px-3 bg-gray-100 text-lg font-bold font-medium text-gray-900" v-t="'howto.delete'"/>
          </div>
        </div>
      </div>
    </div>

    <div class="max-w-full mx-auto py-2 px-4">
      <div class="max-w-2xl mx-auto">
        <div class="bg-white overflow-hidden shadow rounded-lg">
          <div class="px-4 py-auto sm:p-6">
            <ol>
              <li>{{$t("howto.deletedata.one")}}</li>
              <li>{{$t("howto.deletedata.two")}}</li>
            </ol>
          </div>
        </div>
      </div>
    </div>

  </div>
  </div>
</template>

<script>
export default {
  name: 'howto',
  middleware: 'auth',
  head () {
    return {
      title: this.$t("howto.nav")
    }
  },

  methods: {
    openPopup() {
      document.getElementById("popupdisplay").classList.remove('hidden')
    },
    closePopup() {
      document.getElementById("popupdisplay").classList.add('hidden')
    },
    autoNextDisabledClass() {
      if(this.quizType!=='touch') {
        return '';
      }
      return 'cursor-not-allowed opacity-50';
    },
    autoNextDisabledClassTime() {
      if(this.autoNextActive) {
        return '';
      }
      return 'hidden';
    },
    disableAutoNext() {
      this.autoNextActive = false;
    }
  }


}
</script>
<style scoped lang="scss">

    h1 {
      @apply text-4xl font-bold text-center m-9;

    }
    h2 {
      @apply text-2xl font-bold;

    }
    h3 {
      @apply text-lg font-bold;

    }
    p{
        @apply mt-10 font-semibold;
    }
    ol{
      @apply list-decimal;
      &.sub{
        list-style-type: lower-alpha;
      }
    }
    ol, ul{
        @apply mx-5 space-y-4;
    }

</style>
