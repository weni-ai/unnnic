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
    i18n(...args) {
      const [key, defaults] = args;

      const validLocaleValues = Object.keys(this.$i18n.messages);

      let { locale } = this;

      const treatedSelectedLocale =
        get(this, '$i18n.locale') === 'en-us'
          ? 'en'
          : get(this, '$i18n.locale');

      locale = validLocaleValues.includes(locale)
        ? locale
        : treatedSelectedLocale;

      locale = locale.toLowerCase();

      let text = get(
        this.translations,
        `${key}.${locale}`,
        get(this.translations, key),
      );

      if (!text) {
        text = get(get(this.defaultTranslations, key), locale, defaults);
      }

      if (text?.includes('|') && typeof args[1] === 'number') {
        const count = args[1];
        const pluralization = text.split('|');

        if (pluralization.length === 3) {
          text = pluralization[count] || pluralization[2];
        } else if (pluralization.length === 2) {
          text = count === 1 ? pluralization[0] : pluralization[1];
        }
      }

      let vars = {};

      Object.values(args)
        .slice(1)
        .forEach((argument) => {
          if (!(argument instanceof Array) && argument instanceof Object) {
            vars = argument;
          }
        });

      Object.keys(vars).forEach((varName) => {
        text = text?.replaceAll(
          new RegExp(`{ *${varName} *}`, 'g'),
          vars[varName],
        );
      });

      return text;
    },
  },
};
