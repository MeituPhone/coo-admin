<template>
    <div class="mt-select-option" v-show="visible" :class="{'selected': value === $parent.value}" @click.stop="clickHandler">
        {{ label }}
    </div>
</template>
<script>
    import Emitter from '../mixins/emitter';
    export default {
        mixins: [Emitter],
        name: 'cooOption',
        componentName: 'cooOption',
        props: {
            label: String,
            value: {
                required: true
            }
        },
        data () {
            return {
                index: -1,
                visible: true,
            };
        },
        methods: {
            clickHandler () {
                this.dispatch('cooSelect', 'handleOptionClick', {value: this.value, label: this.label});
            },
            resetIndex () {
                this.$nextTick(() => {
                    this.index = this.parent.options.indexOf(this);
                });
            }
        },
        created () {
            this.$parent.options.push(this);
            this.$parent.cachedOptions.push(this);
            this.$parent.optionsCount++;
            this.$parent.filteredOptionsCount++;
            this.index = this.$parent.options.indexOf(this);
            this.$on('resetIndex', this.resetIndex);
        },
        beforeDestroy () {
            this.dispatch('cooSelect', 'onOptionDestroy', this);
        }
    };
</script>
<style lang="scss" rel="stylesheet/scss">
    @import "option.scss";
</style>
