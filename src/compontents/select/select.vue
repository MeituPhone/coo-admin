<template>
    <div class="mt-select" v-clickoutside="handleClose">
        <div class="mt-select-display" @click="visible = !visible">
            <input class="mt-select-input" :placeholder="placeholder"
                   readonly
                   v-model="label" />
            <div class="mt-select-display-mask"></div>
            <div class="mt-select-icon">
                <coo-icon type="org-chevron-down"></coo-icon>
            </div>
        </div>
        <div class="mt-select-body-outer" v-show="visible"
             @click="handleClose">
            <div class="mt-select-body" v-show="visible">
                <div class="mt-select-header"><span class="mt-select-label">请选择{{ title }}</span></div>
                <div class="mt-select-body-inner">
                    <slot></slot>
                    <div class="mt-select-no-data" v-if="options && options.length === 0">没有数据！</div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import Emitter from '../mixins/emitter';
    import Clickoutside from '../utils/clickoutside';
    import Icon from '../icon/icon.vue';
    export default {
        mixins: [Emitter],
        name: 'cooSelect',
        componentName: 'cooSelect',
        directives: { Clickoutside },
        props: {
            placeholder: {
                type: String,
                default: ''
            },
            change: {
                type: Function
            },
            value: {

            },
            autoOpen: {
                type: Boolean,
                default: false
            },
            title: String
        },
        components: {
            cooIcon: Icon
        },
        data () {
            return {
                label: null,
                visible: false,
                options: [],
                cachedOptions: [],
                optionsCount: 0,
                filteredOptionsCount: 0
            };
        },
        watch: {
            value (val) {
                this.setSelected();
                this.$emit('change', val, this.label);
            },
            options (val) {
                if (val && val.length && this.autoOpen) {
                    this.visible = true;
                }
                this.setSelected();
            },
            visible (val) {
                this.$emit('visible-change', val);
            }
        },
        methods: {
            setSelected () {
                if (this.options.length && this.value) {
                    for (let item of this.options) {
                        if (item.value === this.value) {
                            this.label = item.label;
                            return false;
                        }
                    }
                }
                this.label = '';
            },
            handleOptionSelect (option) {
                this.$emit('input', option.value);
                this.visible = false;
            },
            handleClose () {
                this.visible = false;
            },
            onOptionDestroy (option) {
                this.optionsCount--;
                this.filteredOptionsCount--;
                let index = this.options.indexOf(option);
                if (index > -1) {
                    this.options.splice(index, 1);
                }
                this.broadcast('cooOption', 'resetIndex');
            },
        },
        created () {
            this.$on('handleOptionClick', this.handleOptionSelect);
            this.$on('onOptionDestroy', this.onOptionDestroy);
        }
    };
</script>
<style lang="scss" rel="stylesheet/scss">
    @import "select.scss";
</style>
