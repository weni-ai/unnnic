<template>
    <div class='unnic-select'>
          <div :class="{'unnic-select__field': true,
          'unnic-select__field--active': active,
          'unnic-select__field--inactive': !active,
          }" @click="handleClickSelect()">
          <span>
            {{selected}}
          </span>
            <UICon
            v-if="active"
              icon="arrow-button-up-1"
              size="sm"/>
            <UICon
            v-else
              icon="arrow-button-down-1"
              size="sm"/>
          </div>
          <div :class="{'unnic-select__options': true,
          'unnic-select__options--active': active,
          'unnic-select__options--inactive': !active }">
             <slot/>
      </div>
    </div>
</template>

<script>
import UICon from '../Icon.vue';

export default {
  name: 'UnnicSelect',
  components: { UICon },
  props: {
    selected: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      active: false,
    };
  },
  methods: {
    handleClickSelect() {
      this.active = !this.active;
    },
    handleSelectItem(value) {
      this.active = !this.active;
      this.val = value;
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../../assets/scss/unnic.scss';

 ::-webkit-scrollbar {
  width: 4px;
}

::-webkit-scrollbar-track {
  background: $unnic-color-neutral-soft;
}

::-webkit-scrollbar-thumb {
  background: $unnic-color-neutral-clean;
  border-radius: $unnic-border-radius-pill;
}

  .unnic-select {
    position: relative;
    display: inline-block;

  &__field {
    display: flex;
    justify-content: space-between;
    min-width: 169px;
    min-height: 36px;
    border: 1px solid $unnic-color-neutral-soft;
    border-radius: $unnic-border-radius-sm;
    background-color: $unnic-color-background-snow;
    font-family: $unnic-font-family-secondary;
    font-weight: $unnic-font-weight-regular;
    line-height: $unnic-font-size-body-gt + $unnic-line-height-medium;
    padding: 0 $unnic-inset-xs;
    font-size: $unnic-font-size-body-gt;

    display: flex;
    align-items: center;
    cursor: pointer;

     &--inactive{
      border: 1px solid $unnic-color-neutral-soft;
      color: $unnic-color-neutral-clean;
    }

    &--active{
      border: 1px solid $unnic-color-brand-weni;
      color: $unnic-color-brand-weni;
    }

  }

  &__options{
    max-height: 12.5rem;
    overflow-y: auto;
    margin-top: 4px;
    box-shadow: $unnic-shadow-level-near;

    &--inactive{
      display: none;
    }

    &--active{
      display: block;
    }
  }
}
</style>
