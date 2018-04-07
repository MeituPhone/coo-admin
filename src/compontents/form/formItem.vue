<template>
    <div class="cooFormItem clearfix">
        <div class="cooFormItem_label" :class="[size ? `cooFormItem_label-${size}` : '']" :style="labelStyle">{{label}}</div>
        <div class="cooFormItem_content" :style="contentStyle">
                <slot></slot>
        </div>
    </div>
</template>
<script>
    export default {
        props: {
            label: String
        },
        data() {
            return {
                size: this.$parent.size
            };
        },
        computed: {
            itemStyle () {
                return {

                };
            },
            labelStyle () {
                let {labelWidth, layout} = this.$parent;

                return {
                    width: layout === 'horizontal' ? labelWidth : '',
                    float: layout === 'horizontal' ? 'left' : '',
                };
            },
            contentStyle () {
                let {labelWidth, layout} = this.$parent;
                return {
                    marginLeft: layout === 'horizontal' ? labelWidth : '0px',
                };
            }
        }
    }
</script>
<style lang="scss" src="./formItem.scss"></style>
