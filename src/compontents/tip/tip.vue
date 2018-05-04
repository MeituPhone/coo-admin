<template>
    <transition name="tip-fade">
        <div class="coo-tip"
            v-show="visible" >
            <div class="coo-tip-message">
                <div class="coo-tip-icon" v-if="type">
                    <mt-icon :type="type"></mt-icon>
                </div>
                {{message}}
            </div>
        </div>
    </transition>
</template>
<script>
    import MtIcon from '../icon/icon.vue';
    export default {
        components: {
            mtIcon: MtIcon,
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
        data () {
            return {
                visible: false,         // 是否显示
                type: '',               // 类型
                message: '',            // 消息
                closed: false,          // 已关闭
                timeout: 3000,          // 显示时间
            };
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
            setTimeout(() => {
                if (!this.closed) {
                    this.closed = true;
                }
            }, this.timeout);
        },
    };
</script>
<style lang="scss" rel="stylesheet/scss" src="./tip.scss"></style>
