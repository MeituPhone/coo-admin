<template>
    <transition name="drawer-fade">
        <div class="coo-drawer" v-show="visible" :style="{width: width}" v-clickoutside="handleClose">
            <button class="coo-drawer-close" @click="handleClose">
                <coo-icon type="chevron-right"></coo-icon>
            </button>
            <div class="coo-drawer-title" v-if="title">{{title}}</div>
            <div class="coo-drawer-content">
                <slot></slot>
            </div>
        </div>
    </transition>
</template>
<script>
    import Clickoutside from '../utils/clickoutside';
    import Icon from '../icon/icon.vue';
    export default {
        model: {
            prop: 'visible',
            event: 'visible-change',
        },
        props: {
            width: String,
            visible: Boolean,
            title: String,
            beforeOk: Function,
            beforeCancel: Function
        },
        components: {
            cooIcon: Icon
        },
        directives: { Clickoutside },
        methods: {
            // 点击蒙层
            handleWrapperClick () {
                this.handleClose();
            },
            // 点击关闭
            handleClose () {
                if (typeof this.beforeClose === 'function') {
                    this.beforeClose(this.hide);
                } else {
                    this.hide();
                }
            },
            // 点击确认
            handleOk () {
                if (typeof this.beforeOk === 'function') {
                    this.beforeOk(this.hide);
                } else {
                    this.hide();
                }
            },
            // 隐藏dialog
            hide () {
                this.$emit('update:visible', false);
            },
        }
    };
</script>
<style lang="scss" src="./drawer.scss"></style>
