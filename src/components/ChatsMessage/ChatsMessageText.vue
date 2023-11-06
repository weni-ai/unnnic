<template>
  <p v-html="formattedText" class="unnnic-chats-message__text" />
</template>

<script>
export default {
  name: 'ChatsMessageText',
  props: {
    text: {
      type: String,
      required: true,
    },
  },
  computed: {
    formattedText() {
      function treatTextUrl(text) {
        const urlRegex = /(https?:\/\/[^\s]+)/g;
        return text.replace(urlRegex, '<a href="$1" target="_blank">$1</a>');
      }

      function removeHtmlDangerousContent(text) {
      // eslint-disable-next-line default-param-last
        return text.replace(/<(\/)?([^> ]+)( [^>]+)?>/gi, ($1, $2 = '', $3, $4 = '') => {
          if (['b', 'i', 'u', 'ul', 'li', 'br', 'div'].includes($3)) {
            const complements = [];

            // eslint-disable-next-line no-restricted-syntax
            for (const i of $4.matchAll(
              /((?<name1>[^ =]+)="(?<value1>[^"]*)"|(?<name2>[^ =]+)='(?<value2>[^"]*)')/g,
            )) {
              const name = i.groups.name1 || i.groups.name2;
              const value = i.groups.value1 || i.groups.value2;

              if (name === 'style') {
                const styles = [];

                // eslint-disable-next-line no-restricted-syntax
                for (const j of value.matchAll(/(?<propertyName>[^:]+):(?<propertyValue>[^;]+);?/g)) {
                  if (j.groups.propertyName.toLowerCase().trim() === 'text-align') {
                    styles.push(
                      `${j.groups.propertyName
                        .toLowerCase()
                        .trim()}: ${j.groups.propertyValue.trim()}`,
                    );
                  }
                }

                complements.push(`style="${styles.join('; ')};"`);
              }
            }

            return `<${$2}${$3}${complements.length ? ` ${complements.join(' ')}` : ''}>`;
          }

          return '';
        });
      }

      const formattedText = treatTextUrl(removeHtmlDangerousContent(this.text).trim()?.replace(/\n/g, '<br/>'));

      return typeof this.text === 'string' ? formattedText : '';
    },
  },
};
</script>
