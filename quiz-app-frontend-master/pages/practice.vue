<template>
  <main>
    <!-- HEADER -->
    <div class="practice-footer-header inline-flex items-center md:max-w-7xl md:mx-auto h-5">
      <button type="button" @click.prevent="openStudentModal = true;" class="mr-4">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-gray-400" viewBox="0 0 20 20" fill="currentColor"><path d="M11 6a3 3 0 11-6 0 3 3 0 016 0zM14 17a6 6 0 00-12 0h12zM13 8a1 1 0 100 2h4a1 1 0 100-2h-4z" /></svg>
      </button>
      <div class="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
        <div class="bg-green-500 h-2.5 rounded-full transition-all duration-500" :style="`width: ${progress}%;`" />
      </div>
      <button type="button" @click.prevent="openModal = true;" class="ml-4">
        <span class="sr-only" v-t="'general.stop'" />
        <svg class="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
      </button>


      <!-- Modal to confirm exiting of practice -->
      <modal v-model="openModal" modal-title-id="closeModalTitle">
        <template>
          <div class="modal-icon">
            <svg class="text-red-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
            </svg>
          </div>
          <div class="modal-body">
            <h3 class="modal-title" id="closeModalTitle" v-t="'quizzes.practice.close_title'" />
            <p v-t="'quizzes.practice.close_text'" />
          </div>
        </template>
        <template slot="footer">
          <div>
            <button @click="openModal = false;" type="button" class="button button-secondary" v-t="'general.cancel'" />
            <button @click="stopQuiz()" type="button" class="button button-danger" v-t="'general.stop'" />
          </div>
        </template>
      </modal>

    <!-- Modal to confirm student deletion -->
      <modal v-model="openStudentModal" modal-title-id="closeStudentModalTitle">
        <template>
          <div class="modal-icon">
            <svg class="text-red-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
            </svg>
          </div>
          <div class="modal-body">
            <h3 class="modal-title" id="closeModalTitle" v-t="'quizzes.practice.student_delete'" />
            <p v-t="'quizzes.practice.student_delete_text'" />
          </div>
        </template>
        <template slot="footer">
          <div>
            <button @click="openStudentModal = false;" type="button" class="button button-secondary" v-t="'general.cancel'" />
            <button @click="deleteStudent()" type="button" class="button button-danger" v-t="'general.delete'" />
          </div>
        </template>
      </modal>
    </div>

    <!-- Streak -->
    <div class="text-center">
      <div class="p-2 items-center text-indigo-100 leading-none rounded-full flex inline-flex" :class="getStreakClass()" role="alert">
        <span class="flex rounded-full uppercase px-2 py-1 text-xs font-bold mr-3" :class="getStreakInnerClass()">STREAK:</span>
        <span class="font-semibold mr-2 text-left flex-auto">{{ streak }}</span>
        <span v-if="streak > 1" class="font-semibold mr-2 text-left flex-auto">&#128293;</span>
        <span v-else class="font-semibold mr-2 text-left flex-auto">&#128517;</span>
      </div>
    </div>

    <!-- MAIN CONTENT -->
    <div id="practice-wrapper" class="mb-2">
      <div v-if="requestLoading" class="h-5/6">
        <LayoutLoader/>
      </div>
      <div v-else id="practice-container">

        <h2 class="h-10 mt-6">{{ $t(questionType === 'multiple-choice' ? 'quizzes.practice.select_name' : 'quizzes.practice.write_name') }}</h2>

        <!-- Picture -->
        <img :src="this.img" alt="">

        <form action="#" @submit.prevent="checkAnswer" :class="{ 'touch-form': questionType === 'touch' }" class="h-1/2 md:h-3/5 mx-auto mt-2">
          <div class="input-field">
            <label for="answer" class="sr-only">Antwoord</label>

            <!-- Multiple Choice -->
            <practice-styles-multiple-choice v-if="questionType === 'multiple-choice'" ref="multiplechoice"
              @change="checkAnswer" v-model="answer" :correct-answer="correctAnswer" :choices="choices" :is-correct="isCorrect" :is-wrong="isWrong"
            />
            <!-- Touch -->
            <practice-styles-touch v-else-if="questionType === 'touch'" v-model="answer" :correct-answer="correctAnswer" :is-correct="isCorrect" :is-wrong="isWrong"
              @change="submitTouchAnswer"
            />
            <!-- Input -->
            <input v-else ref="inputquestion" type="text" id="answer" autocomplete="off" v-model="answer" class="gray" :placeholder="$t('quizzes.practice.type_answer')" :disabled="isCorrect || isWrong"/>
          </div>
          <div class="px-4 py-3 mt-4 text-center" v-if="questionType !== 'touch' && questionType !== 'multiple-choice' && !(isWrong || isCorrect)">
            <button v-if="!canCheckAnswer" class="button button-danger" @click.prevent="checkAnswer" :disabled="canCheckAnswer">{{ $t('quizzes.practice.no_clue') }}</button>
            <button v-else class="button button-primary" @click.prevent="checkAnswer" :disabled="!canCheckAnswer">{{ $t('quizzes.practice.check_answer') }}</button>
          </div>
        </form>
      </div>
    </div>


    <!-- FOOTER -->
    <div v-if="questionType!=='touch'" :class="{ 'practice-footer-header': true, 'is-correct': isCorrect, 'is-wrong': isWrong }">
      <div id="practice-footer">
        <div class="practice-footer-text">
          <slot v-if="isCorrect">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            <p v-t="'quizzes.practice.correct_answer'" />
          </slot>
          <slot v-if="isWrong">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            <p>
              <span v-t="'quizzes.practice.wrong_answer'" />
              <span class="answer">{{ correctAnswer }}</span>
            </p>
          </slot>
        </div>
        <div class="text-center sm:text-right">
          <button class="button button-success ml-2" @click.prevent="closeEnough" v-if="isWrong && questionType==='input' && answer!==''">{{ $t('quizzes.practice.close_enough') }}</button>
          <button class="button button-primary ml-2" @click.prevent="nextQuestion" v-if="autoNextActive && (isCorrect || isWrong)" ref="next">{{ $t('quizzes.practice.continue') + ' (' + countDown + 's)' }}</button>
          <button  class="button button-primary ml-2" @click.prevent="nextQuestion" v-else-if="!autoNextActive && (isCorrect || isWrong)" ref="next">{{ $t('quizzes.practice.continue')}}</button>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import incorrectSound from '@/assets/sounds/incorrect.mp3';
import correctSound from '@/assets/sounds/correct.mp3';

export default {
  name: 'practice',
  ssr: false,
  layout: 'no-nav',
  middleware: 'auth',
  data() {
    return {
      quizUuid: this.loadQuiz(),
      questionUuid: '',
      img: '',
      answer: '',
      choices: [],
      streak:'',

      isCorrect: false,
      isWrong: false,
      correctAnswer: '',
      group: '',
      questionType: '',

      openModal: false,
      openStudentModal: false,
      progress: 0,
      countDown: this.$store.getters.autoNextTimer,
      autoNextActive: this.$store.getters.autoNextActive,
      requestLoading: true
    };
  },
  methods: {
    // Load quiz id --> if no quiz is active, redirect to dashboard
    loadQuiz () {
      const quizUuid = this.$store.getters.getQuizUuid();
      if(quizUuid==='') {
        this.$router.push(this.localePath({ name: 'index' }));
      }
      return quizUuid;
    },
    // Stop the quiz --> remove the quiz_uuid from the store
    async stopQuiz () {
      //  TODO --> check if answer still needs submitting to backend
      if(this.answer!=='') {
        await this.submitAnswer()
      }
      this.$router.push(this.localePath({ name: 'results' }));
    },
    playSound (soundFile) {
      if (process.server) return;

      const audio = new Audio(soundFile);
      audio.play();
    },
    // Fetches the next question from the backend and prepares the necessary data fields
    async getQuestion () {
      try {
        const { data: { data } } = await this.$axios.post(`/api/quiz/${this.quizUuid}/getQuestion/`);
        this.questionUuid = data.question.personId;
        this.img = data.question.img;
        if(this.$store.getters.lastnameActive()) {
          this.correctAnswer = data.question.firstname + ' ' + data.question.lastname;
        } else {
          this.correctAnswer = data.question.firstname;
        }
        this.group = data.question.group;
        this.questionType = data.question.questionType; // Set question type
        this.progress = data.statistics.percentageKnown;
        this.streak = data.statistics.streak;
        switch (data.question.questionType) {
          case 'multiple-choice':
            this.choices = data.question.choices;
            // If choices is empty or not defined then set question type to touch
            if (!this.choices.length) {
              this.questionType = 'touch';
            }

            break;
          case 'touch':
            break;
          default:
            this.questionType = 'input'; // If it is anything else set it to input
            break;
        }
        this.requestLoading = false;

        this.$nextTick(function () {
          if(this.questionType === "input"){
            this.$refs.inputquestion.focus()
          }
        })
      } catch (error) {
        // TODO: error handeling
      }
    },
    closeEnough() {
      this.isCorrect = true;
      this.nextQuestion(true);
    },
    async nextQuestion (submit) {
      // Reset fields
      if (submit)
        await this.submitAnswer();
      this.requestLoading = true;
      this.isCorrect = false;
      this.isWrong = false;
      this.correctAnswer = '';
      this.choices = [];
      this.answer = '';
      this.group = '';
      this.countDown = this.$store.getters.autoNextTimer;
      if(this.questionType==='multiple-choice') {
        this.$refs.multiplechoice.selected = '';
      }

      await this.getQuestion();
    },
    checkAnswer () {
      this.answer = this.answer.trim()
      if (this.answer.toLowerCase() === this.correctAnswer.toLowerCase()) {
        this.isCorrect = true;
        this.streak += 1;
        this.playSound(correctSound);
      } else {
        this.isWrong = true;
        this.streak = 0;
        this.playSound(incorrectSound);
      }
      if (this.autoNextActive) {
        this.countDownTimer();
      }

      this.$nextTick(() => {this.$refs['next'].focus();});
    },
    async submitAnswer () {
      //if (!this.canCheckAnswer) return;

      try {
        await this.$axios.post(`/api/quiz/${this.quizUuid}/submitAnswer/`, {
          studentId: this.questionUuid,
          guessed: this.isCorrect,
          groupId: this.group
        });

      } catch (error) {
        console.error(error);
      }
    },
    submitTouchAnswer () {
      if (this.answer.toLowerCase() === this.correctAnswer.toLowerCase()) {
        this.isCorrect = true;
      }
      this.nextQuestion(true);
    },
    countDownTimer() {
        if(this.countDown > 0) {
          setTimeout(() => {
              if(this.isCorrect || this.isWrong) {
                this.countDown -= 1
                this.countDownTimer()
              }
          }, 1000)
        } else {
          this.nextQuestion(true);
        }
    },
    getStreakClass() {
      if(this.streak > 1) {
        return 'bg-green-800'
      }
      return 'bg-indigo-800'
    },
    getStreakInnerClass() {
      if(this.streak > 1) {
        return 'bg-green-500'
      }
      return 'bg-indigo-500'
    },
    getMainContentClass() {
      if(this.questionType === 'touch') {
        return 'h-4/5';
      }
      return 'h-4/5'
    },
    async deleteStudent () {
      try {
        await this.$axios.post(`/api/quiz/${this.quizUuid}/student/${this.questionUuid}/disable/`);
        this.openStudentModal = false;
        this.nextQuestion(false);
      } catch (error) {
        // TODO
      }
    },
  },
  computed: {
    canCheckAnswer () {
      return (this.answer !== null && this.answer !== '');
    }
  },
  created () {
    this.getQuestion();
  }
}
</script>

<style lang="scss" scoped>
main {
  @apply flex flex-col h-screen;

  #practice-wrapper {
    @apply flex justify-center items-center flex-grow mx-auto px-4 sm:px-0 w-full;

    #practice-container {
      @apply w-full h-full;

      form {
        @apply max-w-sm w-full;

        &.touch-form {
          @apply max-w-none;

          .input-field {
            @apply w-full h-full;
          }
        }
      }
    }

    h2 {
      @apply text-2xl font-bold text-center;
    }
    h3 {
      @apply text-lg font-bold text-center;
    }
    img {
      @apply max-w-xs max-h-60 xl:max-h-full mx-auto rounded-full my-4;
    }
  }

  .practice-footer-header {
    @apply py-4 sm:py-10 px-4 sm:px-6 lg:px-6 w-full text-white transition-all duration-200;

    &.is-correct {
      @apply bg-green-500;
    }

    &.is-wrong {
      @apply bg-red-500;
    }
  }

  #practice-footer {
    @apply grid grid-cols-1 sm:grid-cols-3 sm:h-1/5 max-w-7xl mx-auto z-20;

    .practice-footer-text {
      @apply mb-2 sm:mb-0 col-span-1 sm:col-span-2 inline-flex items-center;

      p {
        @apply ml-2 text-lg;

        .answer {
          @apply text-base -mt-1 block;
        }
      }

      svg {
        @apply w-8 h-8;
      }
    }
  }
}
</style>
