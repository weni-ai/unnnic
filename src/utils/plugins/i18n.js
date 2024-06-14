/* eslint-disable camelcase */
import { createI18n } from 'vue-i18n';

import en from '../../locales/en.json';
import es from '../../locales/es.json';
import pt_br from '../../locales/pt_br.json';

const languages = {
  en,
  es,
  'pt-br': pt_br,
  'pt-BR': pt_br,
};

const messages = Object.assign(languages);

export default createI18n({
  locale: 'pt-br',
  fallbackLocale: 'en',
  messages,
});
