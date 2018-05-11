<template>
    <div class="coo-switch" :class="[value ? 'coo-switch-on' : 'coo-switch-off']">
        <a href="javascript:;" class="coo-switch-button" @click="handleSwitch">{{ showLabel ? ( value ? onText : offText ) : null}}</a>
    </div>
</template>
<script>
    export default {
        props: {
            value: Boolean,
            showLabel: {
                type: Boolean,
                default: true
            },
            onText: {
                type: String,
                default: '开'
            },
            offText: {
                type: String,
                default: '关'
            }
        },
        methods: {
            handleSwitch () {
                this.$emit('change', !this.value);
            }
        },
    }
</script>
<style lang="scss" rel="stylesheet/scss" src="./switch.scss"></style>
