<template>
  <div class="h-full">
  <layout-header :title="$metaInfo.title" />

    <LayoutLoader v-if="requestLoading" class="h-5/6"/>
    <!-- LOADING ANIMATION -->
    <div v-else class="h-5/6">
    <div class="flex justify-center items-center space-x-2 h-full mx-4">
      <div class="block p-2 rounded-lg shadow-lg bg-white max-w-sm">
        <h2>{{$t("result.results")}}</h2>

        <!-- Streak -->
        <div class="text-center mt-2">
          <div class="p-2 items-center text-indigo-100 leading-none rounded-full flex inline-flex" :class="getStreakClass()" role="alert">
            <span class="flex rounded-full uppercase px-2 py-1 text-xs font-bold mr-3" :class="getStreakInnerClass()">MAX STREAK:</span>
            <span class="font-semibold mr-2 text-left flex-auto">{{ currQuiz.streak }}</span>
            <span v-if="currQuiz.streak > 1" class="font-semibold mr-2 text-left flex-auto">&#128293;</span>
            <span v-else class="font-semibold mr-2 text-left flex-auto">&#128517;</span>
          </div>
        </div>

        <h1 class="m-4">{{currQuiz.percentage}}%</h1>
        <div v-if="!prevQuizEmpty">
          <h3 v-if="currQuiz.percentage-prevQuiz.percentage > 0"> {{$t("result.better",{param: currQuiz.percentage-prevQuiz.percentage})}}</h3>
          <h3 v-if="currQuiz.percentage-prevQuiz.percentage == 0">{{$t("result.same")}}</h3>
          <h3 v-if="currQuiz.percentage-prevQuiz.percentage < 0">{{$t("result.worse",{param:Math.abs(parseInt(currQuiz.percentage-prevQuiz.percentage))})}}</h3>

          <table class="border-t border-b w-full mt-4 mb-2">
            <thead>
              <th></th>
              <th v-t="'result.this_quiz'"/>
              <th v-t="'result.prev_quiz'"/>
            </thead>
            <tbody>
              <tr>
                <th class="text-right" v-t="'result.score'"/>
                <td class="text-center">{{currQuiz.correct}}/{{currQuiz.askedquestions}}</td>
                <td class="text-center">{{prevQuiz.correct}}/{{prevQuiz.askedquestions}}</td>
              </tr>
              <tr>
                <th class="text-right" v-t="'result.percentage'"/>
                <td class="text-center">{{currQuiz.percentage}}%</td>
                <td class="text-center">{{prevQuiz.percentage}}%</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div v-else>
          <h3>{{$t("result.noprevquiz")}}</h3>

          <table class="border-t border-b w-full mt-4 mb-2">
            <thead>
              <th></th>
              <th v-t="'result.this_quiz'"/>
              <th v-t="'result.prev_quiz'"/>
            </thead>
            <tbody>
              <tr>
                <th class="text-right" v-t="'result.score'"/>
                <td class="text-center">{{currQuiz.correct}}/{{currQuiz.askedquestions}}</td>
                <td class="text-center">-</td>
              </tr>
              <tr>
                <th class="text-right" v-t="'result.percentage'"/>
                <td class="text-center">{{currQuiz.percentage}}%</td>
                <td class="text-center">-</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="flex justify-center items-center h-fit">
          <nuxt-link class="button button-primary mt-2 mb-4" :to="localeRoute({ name: 'index' })">Dashboard</nuxt-link>
        </div>
      </div>
    </div>
    </div>
  </div>

</template>

<script>
import LayoutLoader from '/components/layout/loader.vue';
export default {
  name: 'results',
  middleware: 'auth',
  ssr: false,
  head () {
    return {
      title: this.$t("result.title")
    }
  },
  data() {
    return {
      currQuiz: [],
      prevQuiz: [],
      diffpercentage: '',
      requestLoading: true
    }
  },
  methods: {
      async loadQuiz () {
        const quizUuid = this.$store.getters.getQuizUuid();
        if(quizUuid==='') {
          this.$router.push(this.localePath({ name: 'index' }));
        } else {
          await this.endQuiz(quizUuid);
        }
        return quizUuid;
      },
      async endQuiz (quizUuid) {
        try {
          const { data: { data } } = await this.$axios.post(`/api/quiz/${quizUuid}/end/`);
          if(!Object.keys(data).includes('currQuiz')) {
            this.$router.push(this.localePath({ name: 'index' }));
          }
          this.$store.commit('SET_QUIZ_UUID', '');

          console.log(data);

          this.currQuiz = data.currQuiz;
          if(data.prevQuiz !== undefined){
            this.prevQuiz = data.prevQuiz;
          }
          this.requestLoading = false;
        } catch (error) {
          await this.endQuiz(quizUuid);
        }
      },
      getStreakClass() {
      if(this.currQuiz.streak > 1) {
        return 'bg-green-800'
      }
      return 'bg-indigo-800'
    },
    getStreakInnerClass() {
      if(this.currQuiz.streak > 1) {
        return 'bg-green-500'
      }
      return 'bg-indigo-500'
    }
  },
  computed: {
    prevQuizEmpty(){
      return this.prevQuiz.percentage === undefined;
    }
  },
  mounted() {
      this.loadQuiz();
  }
}
</script>
<style scoped>
h1 {
      @apply text-4xl font-bold text-center;

    }
h2 {
      @apply text-2xl font-bold text-center;

    }
h3 {
      @apply text-lg font-bold text-center;
    }
button {
      @apply text-lg mt-5;

    }
</style>
