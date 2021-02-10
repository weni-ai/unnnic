<template>
    <div class='unnnic-select'>
          <div :class="{'unnnic-select__field': true,
          'unnnic-select__field--active': active,
          'unnnic-select__field--inactive': !active,
          }" @click="handleClickSelect()">
          <span :class="[
          'unnnic-select__field__selected',
          `unnnic-select__field__selected--${size}`
          ]">
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
          <div :class="{'unnnic-select__options': true,
          'unnnic-select__options--active': active,
          'unnnic-select__options--inactive': !active }">
             <slot @click="handleClickSelect()"/>
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
    size: {
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
  },
};
</script>

<style lang="scss" scoped>
@import '../../assets/scss/unnnic.scss';

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

    &--inactive{
      display: none;
    }

    &--active{
      display: block;
    }
  }
}
</style>
