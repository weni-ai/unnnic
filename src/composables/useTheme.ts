import { computed, ref, watch, type Ref } from 'vue';
import { usePreferredColorScheme } from '@vueuse/core';

export type Theme = 'light' | 'dark';
export type ThemePreference = Theme | 'system';

const STORAGE_KEY = 'unnnic-theme';
const DARK_CLASS = 'dark';

function readStoredPreference(): ThemePreference {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === 'light' || stored === 'dark' || stored === 'system') {
      return stored;
    }
  } catch {
    /* localStorage may be unavailable (SSR / iframe sandbox) */
  }
  return 'system';
}

function persistPreference(preference: ThemePreference): void {
  try {
    localStorage.setItem(STORAGE_KEY, preference);
  } catch {
    /* silent fail */
  }
}

function applyTheme(theme: Theme): void {
  document.documentElement.classList.toggle(DARK_CLASS, theme === 'dark');
}

const preference: Ref<ThemePreference> = ref(readStoredPreference());

export function useTheme() {
  const osScheme = usePreferredColorScheme();

  const resolvedTheme = computed<Theme>(() => {
    if (preference.value !== 'system') return preference.value;
    return osScheme.value === 'dark' ? 'dark' : 'light';
  });

  watch(
    resolvedTheme,
    (theme) => {
      applyTheme(theme);
    },
    { immediate: true },
  );

  function setTheme(value: ThemePreference): void {
    preference.value = value;
    persistPreference(value);
  }

  function toggleTheme(): void {
    setTheme(resolvedTheme.value === 'dark' ? 'light' : 'dark');
  }

  return {
    preference,
    resolvedTheme,
    setTheme,
    toggleTheme,
  };
}
