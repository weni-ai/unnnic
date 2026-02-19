/**
 * Typography stories. Display, Display4, Body, etc. use tags: ['!dev']
 * so they only appear in Typography.mdx via <Story of={...} />, not in the sidebar.
 */
export default {
  title: 'Typography',
  args: {
    fontFamily: 'Inter, sans-serif',
  },
  render: (args) => ({
    setup() {
      return { args };
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 0.5rem; border: 1px solid #D6D9E1; border-radius: 8px; padding: 1rem;">
        <p
          v-for="(size, i) in (Array.isArray(args.fontSizes) ? args.fontSizes : [args.fontSizes])"
          :key="i"
          :style="{
            fontSize: size + 'px',
            fontWeight: args.fontWeights[i],
            fontFamily: args.fontFamily,
            lineHeight: 1.4,
            letterSpacing: args.letterSpacing[i],

            margin: 0,
          }"
        >
          {{ args.fontsIds[i] }} | The quick brown fox jumps over the lazy dog
        </p>
      </div>
    `,
  }),
};

const docsOnlyTag = ['!dev'];

export const Display = {
  tags: docsOnlyTag,
  args: {
    fontSizes: [24, 20, 16, 16],
    fontWeights: ['600', '600', '600', '400'],
    fontsIds: ['Display 1', 'Display 2', 'Display 3', 'Display 4'],
    letterSpacing: ['-4%', '-4%', '-2%', '-2%'],
  },
};

export const Body = {
  tags: docsOnlyTag,
  args: {
    fontSizes: [14, 14, 14],
    fontWeights: ['400', '500', '600'],
    fontsIds: ['Body', 'Emphasis', 'Action'],
    letterSpacing: ['-1%', '-1%', '-1%'],
  },
};

export const Caption = {
  tags: docsOnlyTag,
  args: {
    fontSizes: [12, 12],
    fontWeights: ['500', '400'],
    letterSpacing: ['0', '0'],
    fontsIds: ['Caption 1', 'Caption 2'],
  },
};
