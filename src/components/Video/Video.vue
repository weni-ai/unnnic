<template>
  <section
    class="unnnic-video__container"
    :class="{ 'is-fullscreen': isFullcreen }"
  >
    <video
      ref="player"
      class="unnnic-video__video"
    >
      <source :src="src" />
    </video>
  </section>
</template>

<script>
import Plyr from 'plyr';
import UnnnicI18n from '../../mixins/i18n';
import 'plyr/dist/plyr.css';

export default {
  name: 'UnnnicVideo',

  mixins: [UnnnicI18n],

  props: {
    src: {
      type: String,
      default: '',
    },
  },

  data() {
    return {
      player: null,
      isFullcreen: false,

      defaultTranslations: {
        speed: {
          'pt-br': 'Velocidade',
          en: 'Speed',
          es: 'Velocidad',
        },
      },
    };
  },

  mounted() {
    this.player = new Plyr(this.$refs.player, {
      controls: [
        'play-large',
        'play',
        'progress',
        'current-time',
        'mute',
        'volume',
        'settings',
        'download',
        'fullscreen',
      ],
      speed: {
        selected: 1,
        options: [0.5, 0.75, 1, 1.25, 1.5, 1.75, 2],
      },
      i18n: {
        speed: this.i18n('speed'),
      },
      resetOnEnd: true,
    });

    this.player.on('enterfullscreen', () => {
      this.isFullcreen = true;
    });
    this.player.on('exitfullscreen', () => {
      this.isFullcreen = false;
    });
  },
};
</script>

<style lang="scss" scoped>
@import '../../assets/scss/unnnic.scss';

.unnnic-video__container {
  display: inline-grid;

  --plyr-color-main: #{$unnnic-color-weni-600};
  --plyr-font-family: #{$unnnic-font-family-secondary};
  --plyr-control-spacing: #{$unnnic-spacing-xs};

  :deep() {
    .plyr {
      width: 100%;
      height: 100%;
    }

    :is(.plyr__progress, .plyr__volume) input[type='range'] {
      min-width: $unnnic-spacing-xl;

      &::-webkit-slider-thumb {
        cursor: pointer;
      }
    }

    .plyr__volume {
      position: relative;

      display: flex;
      justify-content: center;
      align-items: center;

      input[type='range'] {
        position: absolute;
        bottom: calc(100% + (var(--plyr-control-spacing)));
        padding: var(--plyr-control-spacing);
        box-sizing: content-box;

        rotate: -90deg;

        max-width: $unnnic-spacing-giant;
        opacity: 0;
        visibility: hidden;

        transition: all 0.3s ease;
      }

      &:hover,
      & :hover {
        input[type='range'] {
          opacity: 1;
          visibility: visible;
        }
      }
    }

    .plyr__menu,
    [data-plyr='download'] {
      display: none;
    }
  }

  &.is-fullscreen {
    :deep() {
      .plyr__menu,
      [data-plyr='download'] {
        display: flex;
      }
    }
  }
}
</style>
