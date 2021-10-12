<template>
  <h1 class="font-serif text-4xl text-center m-4">
    Только знаки препинания
  </h1>
  <textarea v-model="text" class="form-textarea rounded
    block w-full focus:outline-none focus:ring-2
    focus:ring-gray-800 focus:border-transparent min-h-full h-72" />
  <button @click="processText()"
    class="bg-gray-800 hover:bg-black font-bold text-white px-4 py-3 mt-4"
  >
    Показать
  </button>
  <button @click="clearText()"
    class="bg-gray-800 hover:bg-black font-bold text-white px-4 py-3 ml-4 mt-4"
  >
    Сбросить
  </button>
  <p v-if="show && processedText.length > 0"
    class="bg-gray-200 rounded mt-3 p-3 break-words" v-html="processedText" />
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'App',
  data() {
    return {
      text: 'Вставьте сюда текст и нажмите на кнопку «Показать», чтобы от текста остались только знаки препинания.',
      processedText: '',
      show: false,
    };
  },
  methods: {
    processText() {
      const punctuation = this.text.match(/\p{P}/gu);
      if (punctuation) {
        this.processedText = punctuation.join('&#8201;');
        this.processedText = this.processedText.replaceAll(/(\r\n|\n|\r)/gu, '');
      }
      this.show = true;
    },
    clearText() {
      this.text = '';
      this.processedText = '';
      this.show = false;
    },
  },
});
</script>

<style scoped>
textarea {
  padding: 5px;
}
</style>
