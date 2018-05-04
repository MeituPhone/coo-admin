<template>
    <button class="cooButton"
            :class="[
                {
                    'cooButton-animate': animate,
                    'cooButton-suffix': suffixIcon,
                    'cooButton-prefix': prefixIcon,
                    'cooButton-cover': coverIcon,
                },
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
                validator: value => ['large', 'medium', 'small', 'mini', ''].indexOf(value) > -1,
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
