<template>
  <ul class="multiple-choice-list" role="radiogroup">
    <li v-for="choice in choices" :key="processChoice(choice)" :tabindex="disabled ? -1 : 0" role="radio"
      :aria-checked="selected === choice" :aria-disabled="disabled" :disabled="disabled"
      @click="select(choice)" @keydown.space.stop.prevent="select(choice)" @keydown.enter.stop.prevent="select(choice)"
    >
      <div :class="{ 'box-content': true, 'success': correctAnswer === processChoice(choice) && isWrong }">
        <p>{{ processChoice(choice) }}</p>
      </div>
      <div class="box-border" :class="getClassForChoice(choice)" aria-hidden="true" />
    </li>
  </ul>
</template>

<script>
export default {
  name: "practice-styles-multiple-choice",
  data () {
    return {
      selected: null,
    }
  },
  props: {
    choices: {
      type: Array,
      required: true,
      default: [],
    },
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
    }
  },
  methods: {
    select (choice) {
      choice = this.processChoice(choice);
      if (this.isCorrect || this.isWrong) return;

      this.selected = choice;
      this.$emit('input', choice);
      this.$emit('change');
    },
    // See if lastname is active and refelect this in the choices
    processChoice (choice) {
      if(this.$store.getters.lastnameActive()) {
        return choice.firstname + ' ' + choice.lastname;
      }
      return choice.firstname;
    },
    getClassForChoice (choice) {
      choice = this.processChoice(choice);
      if (this.selected === choice) {
        if (!this.isCorrect && !this.isWrong) {
          return "bg-regal-blue-100";
        } else if (this.isWrong) {
          return "border-red-500";
        } else if (this.isCorrect) {
          return "border-green-500";
        }
      }

      if (this.correctAnswer === choice && (this.isCorrect || this.isWrong)) {
        return "border-green-500"
      }

      return "border-transparent";
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
.multiple-choice-list {
  @apply space-y-2 xl:space-y-4;

  li {
    @apply group relative bg-white rounded-lg shadow-sm cursor-pointer focus:outline-none focus:ring-1 focus:ring-offset-2 focus:bg-regal-blue-200;

    .box-content {
      @apply rounded-lg border border-gray-300 bg-white px-6 py-3 xl:py-4 hover:border-gray-400 sm:flex sm:justify-between;

      &.success{

        p{
          @apply text-white;
        }
        @apply bg-green-500;
      }

      p {
        @apply text-sm font-bold text-gray-900;

      }
    }

    .box-border {
      @apply absolute inset-0 rounded-lg border-2 pointer-events-none;
    }

    &[disabled="disabled"] {
      @apply cursor-text focus:ring-transparent;
    }
  }
}
</style>
