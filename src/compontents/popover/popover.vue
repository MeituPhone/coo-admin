<template>
    <transition name="toast-fade">
        <div class="cooPopover" v-if="visible">
            <span class="cooPopover_arrow"></span>
            <slot></slot>
        </div>
    </transition>
</template>
<script>
    export default {
        props: {
            visible: Boolean,
        },
        data () {
            return {
                left: 0,                // 定位
                top: 0,                 // 定位
            };
        },
        watch: {
            visible (value) {
                if (value) {
                    document.body.appendChild(this.$el);
                } else {
                    // 动画介绍销毁组件
                    this.$el.addEventListener('transitionend', this.destroyElement);
                }
            }
        },
        methods: {
            destroyElement () {
                document.body.removeChild(this.$el);
            },
            hide () {
                this.$emit('update:visible', false);
            },
        },
        mounted () {

        }
    };
</script>
<style lang="scss" src="./popover.scss"></style>
