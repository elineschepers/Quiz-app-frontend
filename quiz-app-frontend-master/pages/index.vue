<template>
  <div class="h-full">
    <layout-header :title="$metaInfo.title" />

    <div v-if="requestLoading" class="h-5/6">
      <LayoutLoader/>
    </div>

    <main v-else class="mt-4">
      <div class="max-w-md m-auto">
        <p v-t="'dashboard.select_class_courses'" class="ml-4 mr-4 mb-4" />

        <!-- Checkbox Choices -->
        <div v-for="course in apidata.courses" class="accordion ml-4 mr-4" :key="course.olaId">

          <div class="accordion-item bg-white border border-gray-200">
            <h2 class="accordion-header mb-0" :id="'heading' + encodeString(course.olaId)">
              <button class="accordion-button collapsed relative flex items-center w-full py-4 px-5 text-base text-gray-800 text-left bg-white border-0 rounded-none transition focus:outline-none "
                type="button" data-bs-toggle="collapse" :data-bs-target="'#' + encodeString(course.olaId)" aria-expanded="false" :aria-controls="encodeString(course.olaId)">
                {{course.olaSummary}}
              </button>
            </h2>
            <div :id="encodeString(course.olaId)" class="accordion-collapse collapse" :aria-labelledby="'heading' + encodeString(course.olaId)">
              <div class="accordion-body py-4 px-5">
                <table class="w-full">
                  <thead>
                    <th class="w-2"/>
                    <th class="text-left" v-t="'dashboard.classgroup'"/>
                    <th class="w-2/12" v-t="'dashboard.seen'"/>
                    <th class="w-2/12" v-t="'dashboard.known'"/>
                  </thead>
                  <tbody>
                    <tr v-for="classgroup in course.eventsOfOla" :key="classgroup.id">
                      <td>
                        <input class="mr-2" type="checkbox" :value="classgroup.eventSummary" :id="classgroup.eventSummary" :name="classgroup.eventSummary" v-model="classgroups">
                      </td>
                      <td>
                        <label :for="classgroup.eventSummary">{{classgroup.eventSummary}}</label>
                      </td>
                      <td>
                        <div class="text-center" >{{classgroup.seen}}%</div>
                      </td>
                      <td>
                        <div class="text-center" >{{classgroup.score}}%</div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        <!-- Lastname Active Option -->
        <div class="ml-4 mt-2">
          <input type="checkbox" v-model="lastnameActive" id="lastnameActive">
          <label class="ml-2" for="lastnameActive" v-t="'dashboard.lastnameActive'"/>
        </div>

         <!-- AutoNext Question Active Option -->
        <div class="ml-4 mt-2">
          <input type="checkbox" :class="autoNextDisabledClass()" v-model="autoNextActive" id="autoNext" :disabled="quizType==='touch'">
          <label class="ml-2" for="autoNext" v-t="'dashboard.autoNext'"/>
          <div class="mt-1 ml-7 relative rounded-md shadow-sm w-24" :class="autoNextDisabledClassTime()">
            <input type="number" min="1" max="99" name="autoNextTimer" id="autoNextTimer" class="focus:bg-regal-blue-100 focus:bg-regal-blue-200 block w-24 pr-10 sm:text-sm border-gray-300 rounded-md" v-model="autoNextTimer">
            <div class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
          </div>
        </div>

        <div class="grid place-items-center mt-4 mx-2">
          <!-- Popup Info Button -->
          <div class="flex items-center justify-center">
            <p class="inline-block mr-1" v-t="'dashboard.select_quiz_type'" />
            <div class="inline-block">
              <button @click="openPopup" class="font-bold text-white rounded-full bg-blue-700 flex items-center justify-center font-mono" style="height: 10px; width: 10px; font-size: 10px;" type="button">i</button>
            </div>
          </div>

          <!-- Radio Choices -->
          <div>
            <input type="radio" value="input" id="RadioInputGuesser" v-model="quizType">
            <label for="RadioInputGuesser" v-t="'dashboard.InputGuesser'" />

            <input type="radio" value="multiple-choice" id="RadioMultipleChoice" v-model="quizType">
            <label for="RadioMultipleChoice" v-t="'dashboard.InputMultipleChoice'" />

            <input type="radio" value="touch" id="RadioTouch" v-model="quizType" @click="disableAutoNext()">
            <label for="RadioTouch" v-t="'dashboard.InputTouch'" />
          </div>

          <button @click="startquiz" class="button button-success  my-4" :disabled="!canStartQuiz">Start</button>
        </div>

        </div>

        <!-- Popup Display -->
        <div id="popupdisplay" class="fixed z-50 inset-0 bg-opacity-30 overflow-y-auto h-full w-full px-4" :class="getPopUpClass()">
            <div class="relative top-40 mx-auto shadow-lg rounded-md bg-white max-w-md">
                <div class="flex justify-between items-center bg-regal-blue-100 text-white text-xl rounded-t-md px-3 py-1">
                    <h1 class="text-xl font-bold" v-t="'dashboard.popupdisplay.quiztypes'" />
                    <button @click="closePopup">x</button>
                </div>
                <div class="max-h-48 overflow-y-scroll p-4">
                    <h2 class="font-bold" v-t="'dashboard.InputGuesser'" />
                    <p class="mb-5" v-t="'dashboard.popupdisplay.InputInfo'" />

                    <h2 class="font-bold" v-t="'dashboard.InputMultipleChoice'" />
                    <p class="mb-5" v-t="'dashboard.popupdisplay.MultipleChoiceInfo'" />

                    <h2 class="font-bold" v-t="'dashboard.InputTouch'" />
                    <p v-t="'dashboard.popupdisplay.TouchInfo'" />
                </div>
                <div class="px-3 py-1 border-t flex justify-end items-center">
                    <button @click="closePopup" class="button button-primary"  v-t="'dashboard.popupdisplay.close'" />
                </div>
            </div>
        </div>
    </main>
  </div>
</template>

<script>
import LayoutLoader from '/components/layout/loader.vue';

export default {
  name: 'index',
  middleware: 'auth',
  components: {
    LayoutLoader,
  },
  head () {
    return {
      title: 'Dashboard'
    }
  },
  data() {
    return {
      apidata: [],
      classgroups: [],
      popUpOpen: false,
      lastnameActive: false,
      autoNextActive: false,
      autoNextTimer: 5,
      quizType: 'input',
      requestLoading: true,
    }
  },
  methods: {
    async startquiz(){
      if (!this.canStartQuiz) {
        return;
      }

      try {
        const { data: { data } } = await this.$axios.post(`/api/quiz/start/`, {
          type: this.quizType,
          groups: this.classgroups
        });
        this.$store.commit('SET_QUIZ_UUID', data.id);
        this.$store.commit('SET_LASTNAME_ACTIVE', this.lastnameActive);
        this.$store.commit('SET_AUTONEXT_ACTIVE', this.autoNextActive);
        this.$store.commit('SET_AUTONEXT_TIMER', this.autoNextTimer);
        this.$router.push(this.localePath({ name: 'practice' }));
      } catch (error) {
        console.error(error);
      }
    },
    openPopup() {
      this.popUpOpen = true;
    },
    closePopup() {
      this.popUpOpen = false;
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
    },
    getPopUpClass() {
      if(this.popUpOpen) {
        return '';
      }
      return 'hidden';
    },
    encodeString(olaId) {
      return 'course_' + olaId;
    }
  },
  computed: {
    canStartQuiz() {
      return this.classgroups.length !== 0;
    }
  },
  async asyncData({ $axios, app }) {
    try {
      const { data: { data } } = await $axios.get(`/api/dashboard/`, {
      });
      return {
        apidata: data,
      }
    } catch (error) {
      window.location.href = (app.localePath({ name: 'auth-login' }));
    }

  },
  created() {
    this.requestLoading = false;
  }
}
</script>

<style scoped lang="scss">
  main {
    @apply text-sm md:text-base;
  }
  .accordion-button:not(.collapsed){
    @apply text-regal-blue-100;
  }

  .accordion-button:not(.collapsed)::after{
    @apply text-regal-blue-100;
  }



</style>
