<template>
    <div class="unnnic-select">
        <UnnnicPopover :popover-balloon-props="{ maxHeight: '100px' }">
            <template #trigger="{ open }">
                <UnnnicInput readonly :forceActiveStatus="open" />
            </template>
            <template #content>
                <div style="display: flex; flex-direction: column;"></div>
                <p>aaa</p>
                <p>aaa</p>
                <p>aaa</p>
                <p>aaa</p>
                <p>aaa</p>
                <p>aaa</p>
                <p>aaa</p>
                <p>aaa</p>
                <p>aaa</p>
            </template>
        </UnnnicPopover>
    </div>
</template>

<script setup lang="ts">
import UnnnicInput from '../Input/Input.vue';
import UnnnicPopover from '../Popover/index.vue';
defineOptions({
    name: "UnnnicSelect"
})
</script>

<style lang="scss" scoped>
.unnnic-select {
}
</style>