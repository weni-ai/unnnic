<template>
    <div>
    <p v-if="label" class="unnnic-form__label"> {{ label }}  </p>
    <div class='unnnic-select'>
          <div :class="{'unnnic-select__field': true,
          'unnnic-select__field--active': active,
          'unnnic-select__field--inactive': !active,
          }" @click="handleClickSelect()">
          <span :class="[
          'unnnic-select__field__selected',
          `unnnic-select__field__selected--${size}`
          ]">
            {{selected ? selected.text : placeholder}}
          </span>
            <UICon
              :icon="active ? 'arrow-button-up-1' : 'arrow-button-down-1'"
              size="sm"/>
          </div>
          <slot />
          <div
          v-if="active"
          :class="{'unnnic-select__options': true,
          'unnnic-select__options--active': active,
          'unnnic-select__options--inactive': !active }"
          v-click-outside="onClickOutside">
            <select-item
            v-for="(option, index) in options()"
            :tabindex="index"
            :size="size"
            :key="option.value"
            @click="onSelectOption(option)">
                {{ option.text }}
            </select-item>
      </div>
    </div>
    <p v-if="message" class="unnnic-form__message"> {{ message }} </p>
  </div>
</template>

<script>
import vClickOutside from 'v-click-outside';
import UICon from '../Icon.vue';
import selectItem from './SelectItem.vue';

export default {
  name: 'UnnicSelect',
  components: { UICon, selectItem },
  props: {
    size: {
      type: String,
      default: '',
    },
    placeholder: {
      type: String,
      default: '',
    },
    value: {
      type: null,
    },
    label: {
      type: String,
      default: null,
    },
    message: {
      type: String,
      default: null,
    },
  },
  data() {
    return {
      active: false,
      selected: null,
    };
  },
  directives: {
    clickOutside: vClickOutside.directive,
  },
  watch: {
    selected() {
      const value = this.selected ? this.selected.value : null;
      this.$emit('onChange', value);
      this.$emit('input', value);
    },
    value() {
      if (this.value === null) this.selected = null;
    },
  },
  methods: {
    onClickOutside(event) {
      this.active = false;
    },
    onSelectOption(option) {
      if (option.value == null || option.value.length === 0) this.selected = null;
      else this.selected = option;
      this.active = false;
    },
    options() {
      const children = this.$el.querySelectorAll('option');
      return [...children].map((option) => (
        { value: option.value, text: option.label || option.innerHtml }
      ));
    },
    handleClickSelect() {
      this.active = !this.active;
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../../assets/scss/unnnic.scss';
option {
    display: none;
}

 ::-webkit-scrollbar {
  width: 4px;
}

::-webkit-scrollbar-track {
  background: $unnnic-color-neutral-soft;
}

::-webkit-scrollbar-thumb {
  background: $unnnic-color-neutral-clean;
  border-radius: $unnnic-border-radius-pill;
}

  .unnnic-select {

  &__field {
    display: flex;
    justify-content: space-between;
    border: 1px solid $unnnic-color-neutral-soft;
    border-radius: $unnnic-border-radius-sm;
    background-color: $unnnic-color-background-snow;
    padding: $unnnic-squish-nano;

    display: flex;
    align-items: center;
    cursor: pointer;

    &__selected{
      font-family: $unnnic-font-family-secondary;
      font-weight: $unnnic-font-weight-regular;
      text-overflow: ellipsis;
      overflow: hidden;
      max-width: 100%;
      -webkit-line-clamp: 1;

      &--md{
        font-size: $unnnic-font-size-body-gt;
        line-height: $unnnic-font-size-body-gt + $unnnic-line-height-medium;
      }
      &--sm{
        font-size: $unnnic-font-size-body-md;
        line-height: $unnnic-font-size-body-md + $unnnic-line-height-medium;
      }
    }

     &--inactive{
      border: 1px solid $unnnic-color-neutral-soft;
      color: $unnnic-color-neutral-clean;
    }

    &--active{
      border: 1px solid $unnnic-color-brand-weni;
      color: $unnnic-color-brand-weni;
    }

  }

  &__options{
    max-height: 12.5rem;
    overflow-y: auto;
    margin-top: 4px;
    box-shadow: $unnnic-shadow-level-near;
    background-color: $unnnic-color-background-snow;

    &--inactive{
      display: none;
    }

    &--active{
      display: block;
    }
  }
}
</style>
