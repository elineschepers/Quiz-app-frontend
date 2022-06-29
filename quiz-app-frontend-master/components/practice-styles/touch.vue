<template>
  <div class="touch-wrapper">
    <p ref="touch-answer" v-if="show">{{ correctAnswer }}</p>
    <div class="touch-container">
      <slot v-if="show">
        <button @click.prevent="submit(false)" :disabled="disabled" class="bg-red-50" v-t="'quizzes.practice.i_dont_know'" />
        <button @click.prevent="submit(true)" :disabled="disabled" class="bg-green-50" v-t="'quizzes.practice.i_know'" />
      </slot>
      <button v-else @click.prevent="show = true;" class="col-span-2" v-t="'quizzes.practice.show_answer'" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'practice-styles-touch',
  props: {
    correctAnswer: {
      type: String,
      required: true,
    },
    isCorrect: {
      type: Boolean,
      required: true,
    },
    isWrong: {
      type: Boolean,
      required: true,
    },
  },
  data () {
    return {
      show: false,
    }
  },
  methods: {
    submit (guessedCorrectly) {
      this.$emit('input', guessedCorrectly ? this.correctAnswer : 'GUESSED_WRONG');
      this.$emit('change');
      this.show = false;
    },
    showAnswer () {
      this.show = true;
      this.$refs['touch-answer'].focus();
    },
  },
  computed: {
    disabled () {
      return this.isCorrect || this.isWrong;
    }
  }
}
</script>

<style lang="scss">
.touch-wrapper {
  @apply w-full h-full flex flex-col;

  p {
    @apply pb-6 text-center text-xl;
  }

  .touch-container {
    @apply flex-1 w-full h-auto grid grid-cols-2 border-t-2 border-b-2 border-dashed border-gray-200;

    button {
      @apply hover:bg-gray-200 bg-opacity-70 transition-colors duration-200 font-normal hover:text-gray-900;

      &:first-child:not(.col-span-2) {
        @apply border-r-2 border-dashed border-gray-200;
      }
    }
  }
}
</style>
