<template>
    <div class="coo-switch" :class="[value ? 'coo-switch-on' : 'coo-switch-off']">
        <a href="javascript:;" class="coo-switch-button" @click="handleSwitch">{{ showLabel ? ( value ? onText : offText ) : null}}</a>
    </div>
</template>
<script>
    export default {
        model: {
            prop: 'value',
            event: 'value-change',
        },
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
            },
            beforeSwitch: Function
        },
        methods: {
            handleSwitch () {
                if (typeof this.beforeSwitch === 'function') {
                    this.beforeSwitch(this.toggle);
                } else {
                    this.toggle();
                }
            },
            toggle () {
                this.$emit('update:value', !this.value);
            }
        },
    }
</script>
<style lang="scss" rel="stylesheet/scss" src="./switch.scss"></style>
