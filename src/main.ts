import { createApp } from 'petite-vue';
import './index.css';

interface Application {
  text: string,
  processedText: string,
  repoLink: string,
  show: boolean,
  processText: Function,
  clearText: Function,
}

const App: Application = {
  text: 'Вставьте сюда текст и нажмите на кнопку «Показать», ' +
  'чтобы от текста остались только знаки препинания.',
  processedText: '',
  repoLink: 'https://github.com/super16',
  show: false,
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
};

createApp(App).mount('#app');
