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

      let text = get(this.translations, `${key}.${locale}`, get(this.translations, key));

      if (!text) {
        text = get(get(this.defaultTranslations, key), locale, defaults);
      }

      if (text?.includes('|') && typeof arguments[1] === 'number') {
        const count = arguments[1];
        const pluralization = text.split('|');

        if (pluralization.length === 3) {
          text = pluralization[count] || pluralization[2];
        } else if (pluralization.length === 2) {
          text = count === 1 ? pluralization[0] : pluralization[1];
        }
      }

      let vars = {};

      Object.values(arguments).slice(1).forEach((argument) => {
        if (!(argument instanceof Array) && argument instanceof Object) {
          vars = argument;
        }
      });

      Object.keys(vars).forEach((varName) => {
        text = text?.replaceAll(new RegExp(`{ *${varName} *}`, 'g'), vars[varName]);
      });

      return text;
    },
  },
};
