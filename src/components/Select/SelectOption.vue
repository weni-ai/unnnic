<template>
    <div :class="['unnnic-select-option', {
        'unnnic-select-option--disabled': props.disabled,
        'unnnic-select-option--active': props.active,
        'unnnic-select-option--focused': props.focused,
    }]">
        <p class="unnnic-select-option__label">{{ props.label }}</p>
    </div>
</template>

<script setup lang="ts">
defineOptions({
    name: "UnnnicSelectOption"
})

interface SelectOptionProps {
    label: string;
    disabled?: boolean;
    active?: boolean;
    focused?: boolean;
}

const props = withDefaults(defineProps<SelectOptionProps>(), {
    disabled: false,
    active: false,
    focused: false,
})
</script>

<style lang="scss" scoped>
@use '@/assets/scss/unnnic' as *;
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

.unnnic-select-option {
    cursor: pointer;
    border-radius: $unnnic-radius-1;
    padding: $unnnic-space-2 $unnnic-space-4;
    font: $unnnic-font-emphasis;

    &--focused {
        background-color: $unnnic-color-bg-soft;
    }

    &--active {
        background-color: $unnnic-color-bg-active;
        color: $unnnic-color-fg-inverted;
    }

    &--disabled {
        color: $unnnic-color-fg-muted;
        background-color: $unnnic-color-bg-muted;
        cursor: not-allowed;
    }
}
</style>