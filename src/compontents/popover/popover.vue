<template>
    <transition name="toast-fade">
        <div class="cooPopover">
            <span class="cooPopover_arrow"></span>
        </div>
    </transition>
</template>
<script>
    export default {
        data () {
            return {
                closed: false,          // 已关闭
                visible: false,         // 是否显示
                left: 0,                // 定位
                top: 0,                 // 定位
            };
        },
        watch: {
            closed (value) {
                if (value) {
                    this.visible = false;
                    // 动画介绍销毁组件
                    this.$el.addEventListener('transitionend', this.destroyElement);
                }
            }
        },
        methods: {
            destroyElement () {
                document.body.removeChild(this.$el);
            },
            close () {
                this.closed = true;
            }
        },
        mounted () {
            this.visible = true;
        }
    };
</script>
<style lang="scss" src="./popover.scss"></style>
