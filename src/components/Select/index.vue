<template>
    <div class="unnnic-select">
        <UnnnicPopover v-model="openPopover" :popover-balloon-props="{ maxHeight: calculatedMaxHeight }">
            <template #trigger>
                <UnnnicInput :model-value="inputValue" class="unnnic-select__input" readonly
                    :forceActiveStatus="openPopover" :size="props.size" :placeholder="props.placeholder"
                    :label="props.label" :errors="props.errors" :message="props.message"
                    :iconRight="openPopover ? 'keyboard_arrow_up' : 'keyboard_arrow_down'" :disabled="props.disabled" />
            </template>
            <template #content>
                <div class="unnnic-select__content">
                    <UnnnicInput v-if="props.enableSearch" class="unnnic-select__input-search"
                        :modelValue="props.search" :placeholder="$t('search')" iconLeft="search"
                        @update:modelValue="handleSearch" />
                    <UnnnicSelectOption v-for="option in filteredOptions" :key="option[props.itemValue]"
                        :label="option[props.itemLabel]"
                        :active="option[props.itemValue] === selectedItem?.[props.itemValue]"
                        :disabled="option.disabled" @click="handleSelectOption(option)" />
                </div>
            </template>
        </UnnnicPopover>
    </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import UnnnicInput from '../Input/Input.vue';
import UnnnicPopover from '../Popover/index.vue';
import UnnnicSelectOption from './SelectOption.vue';
import UnnnicI18n from '../../mixins/i18n';

defineOptions({
    name: "UnnnicSelect",
    mixins: [UnnnicI18n]
})

interface SelectProps {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    options: Array<{ [key: string]: any }>;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    modelValue: any;
    returnObject?: boolean;
    itemLabel?: string;
    itemValue?: string;
    placeholder?: string;
    label?: string;
    type?: 'normal' | 'error';
    errors?: string | Array<string>;
    message?: string;
    size?: 'sm' | 'md';
    optionsLines?: number;
    enableSearch?: boolean;
    search?: string;
    locale?: string;
    disabled?: boolean;
}

const props = withDefaults(defineProps<SelectProps>(), {
    size: 'md',
    type: 'normal',
    placeholder: '',
    optionsLines: 5,
    returnObject: false,
    itemLabel: 'label',
    itemValue: 'value',
    locale: 'en',
    enableSearch: false,
    disabled: false,
})

const emit = defineEmits<{
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    'update:modelValue': [value: any]
    'update:search': [value: string]
}>()

const openPopover = ref(false)

watch(openPopover, () => {
    if (!openPopover.value) {
        handleSearch('')
    }
})

const calculatedMaxHeight = computed(() => {
    if (!props.options || props.options.length === 0) return 'unset'
    const fieldsHeight = (37 * props.optionsLines) + 40
    return `${props.enableSearch ? fieldsHeight + 50 : fieldsHeight}px`
})

const selectedItem = computed(() => {
    if (props.returnObject) return props.modelValue

    return props.options.find(option => option[props.itemValue] === props.modelValue)
})

const inputValue = computed(() => {
    return selectedItem.value?.[props.itemLabel]
})

const handleSelectOption = (option) => {
    if (option[props.itemValue] === selectedItem.value?.[props.itemValue] || option.disabled) return

    emit('update:modelValue', props.returnObject ? option : option[props.itemValue])
    openPopover.value = false
}

const handleSearch = (value: string) => {
    emit('update:search', value)
}

const filteredOptions = computed(() => {
    if (!props.enableSearch || !props.search) return props.options

    return props.options.filter(option => option[props.itemLabel].toLowerCase().includes(props.search?.toLowerCase()) || option[props.itemValue].toLowerCase().includes(props.search?.toLowerCase()))
})

</script>

<style lang="scss" scoped>
@use '@/assets/scss/unnnic' as *;

:deep(.unnnic-select__input) {
    cursor: pointer;
}

:deep(.unnnic-select__input-search) {
    >.icon-left {
        color: $unnnic-color-fg-base;
    }
}

:deep(.unnnic-select__input) {
    >.icon-right {
        color: $unnnic-color-fg-base;
    }
}

.unnnic-select {
    &__content {
        display: flex;
        flex-direction: column;
        padding: 0;
        margin: 0;
        gap: $unnnic-space-1;
    }
}
</style>