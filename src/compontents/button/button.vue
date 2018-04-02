<template>
    <button class="cooButton"
            :class="[
                {'cooButton-animate': animate},
                suffixIcon ? `cooButton-suffix` : '',
                prefixIcon ? `cooButton-prefix` : '',
                coverIcon ? `cooButton-cover` : '',
                size ? `cooButton-${size}` : '',
            ]"
            @click="handleClick"
    >
        <coo-icon v-if="prefixIcon" :type="prefixIcon"></coo-icon>
        <slot></slot>
        <coo-icon v-if="suffixIcon" :type="suffixIcon"></coo-icon>
    </button>
</template>
<script>
    import Icon from '../icon/icon.vue';
    export default {
        props: {
            theme: {
                type: String,
                default: 'default'
            },
            animate: Boolean,
            disable: Boolean,
            size: {
                type: String,
                validator: value => ['medium', 'small', 'mini'].indexOf(value) > -1,
                default: ''
            },
            plain: Boolean,
            suffixIcon: String,
            prefixIcon: String,
            coverIcon: String,
        },
        components: {
            cooIcon: Icon
        },
        methods: {
            handleClick (event) {
                this.$emit('click', event);
            },
        },
        created () {

        }
    };
</script>
<style lang="scss" src="./button.scss"></style>
