import { get } from 'lodash';

export default {
  props: {
    locale: {
      type: String,
    },
    translations: {
      type: Object,
    },
  },

  methods: {
    i18n(key, defaults) {
      const locale = (this.locale || get(this, '$i18n.locale'))?.toLowerCase();

      const text = get(this.translations, `${key}.${locale}`, get(this.translations, key));

      if (!text) {
        return get(get(this.defaultTranslations, key), locale, defaults);
      }

      return text;
    },
  },
};
