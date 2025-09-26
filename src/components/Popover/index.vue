<template>
    <section class="unnnic-popover" ref="popover">
        <div class="unnnic-popover__trigger" data-testid="popover-trigger" @click="toggleOpen()">
            <slot name="trigger"></slot>
        </div>
        <UnnnicPopoverBalloon class="unnnic-popover__balloon" v-show="open" v-bind="popoverBalloonProps">
            <slot name="content" />
        </UnnnicPopoverBalloon>
    </section>
</template>

<script setup lang="ts">
import UnnnicPopoverBalloon from './PopoverBalloon.vue';
import { PopoverBalloonProps } from './PopoverBalloon.vue';

import { computed, onMounted, ref, useTemplateRef, watch } from 'vue';
import { onClickOutside } from '@vueuse/core';

const target = useTemplateRef<HTMLDivElement>('popover')

onClickOutside(target, () => {
    if(props.persistent) return;
    open.value = false;
})

defineOptions({
    name: "UnnnicPopover"
})

interface PopoverProps {
    modelValue?: boolean;
    persistent?: boolean;
    popoverBalloonProps?: PopoverBalloonProps;
}

const props = withDefaults(defineProps<PopoverProps>(), {
    modelValue: undefined,
    persistent: false,
});

const useModelValue = computed(() => props.modelValue !== undefined);

const open = ref<boolean>(useModelValue.value ? Boolean(props.modelValue) : false);

const toggleOpen = () => {
    open.value = !open.value;
}

onMounted(() => {
    if(useModelValue.value) {
        open.value = Boolean(props.modelValue);
    }
})

const emit = defineEmits<{
    'update:modelValue': [value: boolean];
}>()

watch(open, (value) => {
    if(useModelValue.value) {
        emit('update:modelValue', value);
    }
})

</script>

<style lang="scss" scoped>
@use '@/assets/scss/unnnic' as *;
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

.unnnic-popover {
    &__balloon {
        margin-top: $unnnic-space-1;
        position: fixed;
        left: auto;
        right: auto;
    }
}
</style>