<template>
  <div
    :class="expand ? 'expand-multiselect' : 'normal-multiselect'"
    tabindex="-1"
  >
    <span class="select-permission-label" v-if="label">{{label}}</span>
    <div
      @keypress="handleIsOpenKeyboard"
      @click="active = !active"
      class="select-permission"
      tabindex="0"
    >
      <h6 class="title noselect">{{inputTitle}}</h6>
      <UnnnicIcon
        :icon="active ? 'arrow-button-up-1' : 'arrow-button-down-1'"
        size="sm"
        scheme="neutral-clean"
      />
    </div>
    <div v-if="active" class="select-content" v-click-outside="onClickOutside" tabindex="0">
      <div>

      <h6 class="title">Permissões Gerais</h6>
      <section v-for="(group, indexGroup) in groups" :key="indexGroup">
        <template v-for="(item, indexItem) in group.items">
          <UnnnicRadio
            name=""
            :globalValue="group.selected"
            @change="change(indexGroup, $event)"
            :value="indexItem"
            id=""
            size="sm"
            :key="indexItem + 'input'"
            class=""
          >
            <strong>{{ item.title }}</strong>
            <span>{{ item.description }}</span>
          </UnnnicRadio>
        </template>
      </section>
    </div>
    </div>
  </div>
</template>

<script>
import vClickOutside from 'v-click-outside';
import UnnnicIcon from '../Icon.vue';
import UnnnicRadio from '../Radio/Radio.vue';

export default {
  name: 'UnnicMultiSelect',
  components: {
    UnnnicIcon,
    UnnnicRadio,
  },
  model: {
    prop: 'groups',
    event: 'change',
  },
  directives: {
    clickOutside: vClickOutside.directive,
  },
  props: {
    isOpen: {
      default: false,
    },
    expand: {
      default: false,
    },
    label: {
      type: String,
      default: '',
    },
    groups: {
      type: Array,
      default: () => [],
    },
    inputTitle: {
      type: String,
      default: 'Teste',
    },
  },

  data() {
    return {
      active: false,
    };
  },

  watch: {
    isOpen() {
      this.active = this.open;
    },
  },
  methods: {
    handleIsOpenKeyboard(event) {
      if (
        document.querySelector('.select-permission:focus-visible')
        && event.keyCode === 32
      ) {
        this.active = !this.active;
      }
    },

    onClickOutside() {
      if (!this.active) return;
      this.active = false;
    },

    change(indexGroup, indexSelected) {
      this.$emit(
        'change',
        this.groups.map((item, index) => {
          if (index === indexGroup) {
            return { ...item, selected: indexSelected };
          }

          return item;
        }),
      );
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../assets/scss/unnnic.scss";

.normal-multiselect {
  position: relative;
  max-width: 319px;

  .select-content {
    max-width: 319px;
  }
}

.expand-multiselect {
  position: relative;
  width: 100%;

  .select-content {
    width: 100%;
  }
}

.noselect {
  -webkit-touch-callout: none; /* iOS Safari */
  -webkit-user-select: none; /* Safari */
  -khtml-user-select: none; /* Konqueror HTML */
  -moz-user-select: none; /* Old versions of Firefox */
  -ms-user-select: none; /* Internet Explorer/Edge */
  user-select: none; /* Non-prefixed version, currently
                                  supported by Chrome, Edge, Opera and Firefox */
}

.select-permission,
.select-content > div {
  padding: $unnnic-squish-xs;
  background-color: $unnnic-color-neutral-snow;

  border-radius: $unnnic-border-radius-sm;
  border: $unnnic-border-width-thinner solid $unnnic-color-neutral-soft;
}
.select-permission {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  line-height: $unnnic-font-size-body-gt + $unnnic-line-height-medium;

  cursor: pointer;
  .icon {
    margin-left: $unnnic-spacing-inline-xs;
  }
}
.select-permission-label {
    display: block;

    color: $unnnic-color-neutral-cloudy;
    margin-bottom: $unnnic-spacing-stack-xs;

    font-family: $unnnic-font-family-secondary;
    font-size:  $unnnic-font-size-body-gt;
    line-height: $unnnic-font-size-body-gt + $unnnic-line-height-medium;
}

.title {
  font-family: $unnnic-font-family-secondary;
  font-size: $unnnic-font-size-body-gt;
  margin: 0;
  font-weight: $unnnic-font-weight-regular;
  color: $unnnic-color-neutral-dark;
}

.select-content {
  position: absolute;
  margin-top: $unnnic-spacing-stack-xs;

  > div {
    box-shadow: $unnnic-shadow-level-near;
    .title {
      margin-bottom: $unnnic-spacing-stack-sm;
    }

    & section {
      display: flex;
      flex-direction: column;

      & + section {
        margin-top: $unnnic-spacing-stack-sm;
        padding-top: $unnnic-spacing-stack-sm;
        border-top: $unnnic-border-width-thinner solid
          $unnnic-color-neutral-darkest;
      }

      strong,
      span {
        display: block;
        font-family: $unnnic-font-family-secondary;
        font-size: $unnnic-font-size-body-gt;
      }

      strong {
        font-weight: $unnnic-font-weight-regular;
      }
      span {
        font-weight: $unnnic-font-weight-light;
      }

      .unnnic-radio-container {
        & + .unnnic-radio-container {
          margin-top: $unnnic-spacing-stack-sm;
          padding-top: $unnnic-spacing-stack-sm;
          border-top: $unnnic-border-width-thinner solid
            $unnnic-color-neutral-lightest;

        }

        ::v-deep .unnnic-icon {
          margin-right: $unnnic-inline-xs;
        }
      }

    }
  }

}
</style>
