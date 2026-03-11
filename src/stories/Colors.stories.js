/**
 * Colors stories. use tags: ['!dev']
 * so they only appear in Colors.mdx via <Story of={...} />, not in the sidebar.
 */
import colors from '@/assets/tokens/colors.json';

function resolveReference(ref, root) {
  const path = ref.replace(/^\{|\}$/g, '').split('.');
  let current = root;

  for (const key of path) {
    if (!current?.[key]) return ref;
    current = current[key];
  }

  return current.value ?? ref;
}

function flattenGroup(obj, prefix = '', root = {}) {
  return Object.entries(obj).reduce((acc, [key, val]) => {
    const name = prefix ? `${prefix}-${key}` : key;

    if (val.value) {
      const isReference = val.value.startsWith('{');
      const resolved = isReference
        ? resolveReference(val.value, root)
        : val.value;

      acc.push({ name, value: resolved });
    } else {
      acc.push(...flattenGroup(val, name, root));
    }

    return acc;
  }, []);
}

function groupColors(colorTokens, root) {
  return Object.entries(colorTokens).map(([key, val]) => {
    if (val.value) {
      const isReference = val.value.startsWith('{');
      const resolved = isReference
        ? resolveReference(val.value, root)
        : val.value;

      return { group: key, colors: [{ name: key, value: resolved }] };
    }

    return { group: key, colors: flattenGroup(val, key, root) };
  });
}

function contrastColor(hex) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

  return luminance > 0.5 ? '#23262E' : '#FFFFFF';
}

function borderStyle(color) {
  return color === '#FFFFFF' ? '1px solid #D6D9E1' : 'none';
}

const colorGroups = groupColors(colors.color, colors);

export default {
  title: 'Colors',
  render: () => ({
    setup() {
      return {
        colorGroups,
        contrastColor,
        borderStyle,
      };
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 70px; padding: 16px;">
        <div
          v-for="group in colorGroups"
          :key="group.group"
        >
          <h3 style="margin: 0 0 12px 0; font-size: 14px; font-weight: 500; color: #1F1F1F; text-transform: capitalize;">
            {{ group.group }}
          </h3>

          <div style="display: flex; flex-wrap: wrap; gap: 12px;">
            <div
              v-for="color in group.colors"
              :key="color.name"
              style="display: flex; flex-direction: column; align-items: center; gap: 4px;"
            >
              <div
                :style="{
                  backgroundColor: color.value,
                  width: '70px',
                  height: '70px',
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: contrastColor(color.value),
                  fontSize: '10px',
                  fontWeight: '600',
                  border: borderStyle(color.value),
                }"
              >
                {{ color.value }}
              </div>
              <span style="font-size: 12px; color: #545E75; text-align: center; max-width: 90px; word-break: break-word;">
                {{ color.name }}
              </span>
            </div>
          </div>
        </div>
      </div>
    `,
  }),
};

const docsOnlyTag = ['!dev'];

export const Colors = {
  tags: docsOnlyTag,
  args: {},
};
