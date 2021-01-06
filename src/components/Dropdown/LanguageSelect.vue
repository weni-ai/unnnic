<template>
    <unnic-dropdown>
        <div slot="trigger">
            {{ languages[val] }}
        </div>
        <unnic-dropdown-item
          v-for="language in languages"
          :key="language.id"
          @click="val = language.id">
            {{ language.name }}
        </unnic-dropdown-item>
    </unnic-dropdown>
</template>

<script>
import UnnicDropdown from './Dropdown.vue';
import UnnicDropdownItem from './DropdownItem.vue';

export default {
  name: 'Sidebar',
  props: {
    value: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      val: this.value,
      languages: {
        'pt-br': 'Português do Brasil',
        'en-us': 'English',
      },
    };
  },
  components: {
    UnnicDropdown,
    UnnicDropdownItem,
  },
  watch: {
    val() {
      this.$emit('input', this.val);
    },
  },
  computed: {
    languageList() {
      return Object.entries.map((id, name) => ({ id, name }));
    },
    currentLanguage() {
      if (this.languages[this.val]) return this.languages[this.val].name;
      return '';
    },
  },
};
</script>
