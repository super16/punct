<template>
  <main class="main">
    <h1
      id="attr"
      class="header"
    >
      Только знаки препинания
    </h1>
    <textarea
      v-model="text"
      aria-labelledBy="attr"
      class="input-area"
    />
    <button
      class="button"
      @click="processText()"
    >
      Показать
    </button>
    <button
      class="button second-button"
      @click="clearText()"
    >
      Сбросить
    </button>
    <p
      v-if="show && processedText.length > 0"
      class="text"
      v-html="processedText"
    />
  </main>
  <footer>
    <p class="footer-paragraph">
      Сделал
      <a
        class="text-gray-600"
        :href="repoLink"
      >
        super16
      </a>
    </p>
  </footer>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

interface AppData {
  text: string,
  processedText: string,
  repoLink: string,
  show: boolean,
}

export default defineComponent({
  name: 'App',
  data(): AppData {
    return {
      text: 'Вставьте сюда текст и нажмите на кнопку «Показать», ' +
        'чтобы от текста остались только знаки препинания.',
      processedText: '',
      repoLink: 'https://github.com/super16',
      show: false,
    };
  },
  methods: {
    processText(): void {
      const punctuation: RegExpMatchArray | null =
        this.text.match(/\p{P}/gu);
      if (punctuation) {
        this.processedText = punctuation.join('&#8201;');
        this.processedText = this.processedText.replaceAll(
          /(\r\n|\n|\r)/gu,
          '',
        );
      }
      this.show = true;
    },
    clearText(): void {
      this.text = '';
      this.processedText = '';
      this.show = false;
    },
  },
});
</script>

<style lang="styl" scoped>
@css {
  .button {
    @apply bg-gray-800
      font-bold
      hover:bg-black
      mt-4
      px-4
      py-3
      text-white
  }

  .footer-paragraph {
    @apply bottom-0
      font-serif
      mr-3
      sticky
      text-right
  }

  .header {
    @apply
      font-serif
      m-4
      text-4xl
      text-center
  }

  .input-area {
    @apply block
      focus:outline-none
      h-72
      min-h-full
      p-1
      rounded
      w-full
      focus:border-transparent
      focus:ring-2
      focus:ring-gray-800
  }

  .main {
    @apply flex-col
      flex-grow
      items-center
      max-w-xl
      mx-auto
      p-6
  }

  .second-button {
    @apply ml-4
  }

  .text {
    @apply bg-gray-200
      break-words
      mt-3
      p-3
      rounded
  }
}
</style>
