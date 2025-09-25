<template>
    <section class="unnnic-popover-balloon">
        <slot></slot>
    </section>
</template>

<script setup lang="ts">
defineOptions({
    name: "UnnnicPopoverBalloon"
})

export interface PopoverBalloonProps {
    width?: string;
    maxWidth?: string;
    height?: string;
    maxHeight?: string;
    overflow?:  'visible' | 'hidden' | 'auto' | 'scroll' | 'inherit' | 'unset';
}

withDefaults(defineProps<PopoverBalloonProps>(), {
    width: 'unset',
    height: 'unset',
    maxWidth: 'unset',
    maxHeight: 'unset',
    overflow: 'unset',
});


</script>


<style lang="scss" scoped>
@use '@/assets/scss/unnnic' as *;

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

.unnnic-popover-balloon {
    display: flex;
    overflow: v-bind(overflow);
    border-radius: $unnnic-radius-2;
    padding: $unnnic-space-4;
    background: $unnnic-color-bg-base;
    box-shadow: 0 4px 16px 0 rgba(0, 0, 0, 0.16);
    width: v-bind(width);
    height: v-bind(height);
    max-width: v-bind(maxWidth);
    max-height: v-bind(maxHeight);
}
</style>