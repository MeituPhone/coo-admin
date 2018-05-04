<template>
    <span>
        <transition name="popover-fade">
            <div class="cooPopover"
                 :class="{'cooPopover-fixed': fixed}"
                 ref="popper"
                 v-show="showPopper"
                 :style="{
                     top: `${referencePosition.top + referencePosition.height}px`,
                     left: `${left}px`
                 }"
            >
                <span class="cooPopover_arrow"
                      :style="{
                         left: `${this.width / 2}px`
                      }"
                      v-if="hasArrow"></span>
                <slot></slot>
            </div>
        </transition>
        <slot name="reference"></slot>
    </span>
</template>
<script>
    import {addEventListener, removeEventListener, getOffsetTop, getOffsetLeft} from '../utils/dom';

    export default {
        props: {
            reference: {},                  // 关联dom
            fixed: {                        // 固定位置
                type: Boolean,
                default: true
            },
            hasArrow: {                     // 显示箭头
                type: Boolean,
                default: true,
            },
            trigger: {                      // 激活条件
                type: String,
                validator: value => ['click', 'hover'].indexOf(value) > -1,
                default: 'click',
            }
        },
        data () {
            return {
                showPopper: false,          // 已关闭
                referencePosition: {        // 触发元素定位
                    width: 0,
                    height: 0,
                    top: 0,
                    left: 0,
                },
                width: 0,
            };
        },
        computed: {
            left () {
                let maxLeft = document.body.clientWidth - 10;
                if ((this.referencePosition.left + this.referencePosition.width / 2 + this.width / 2) > maxLeft) {
                    return maxLeft - this.width;
                } else {
                    return this.referencePosition.left + this.referencePosition.width / 2 - this.width / 2;
                }
            },
            arrowLeft () {
                return this.referencePosition.left + this.referencePosition.width / 2;
            }
        },
        watch: {
            showPopper (val) {
                if (val) {
                    this.$nextTick(() => {
                        let reference = this.referenceElm = this.reference || this.$refs.reference;

                        this.referencePosition = {
                            width: reference.offsetWidth,
                            height: reference.offsetHeight,
                            left: getOffsetLeft(reference),
                            top: getOffsetTop(reference)
                        };
                        this.width = this.$refs.popper.offsetWidth;
                    });
                }
            }
        },
        methods: {
            handleToggle () {
                this.showPopper = !this.showPopper;
            },
            handleShow () {
                this.showPopper = true;
            },
            handleClose () {
                this.showPopper = false;
            },
            handleMouseEnter () {
                this.showPopper = true;
            },
            handleMouseOuter () {
                this.showPopper = false;
            },
            handleDocumentClick (e) {
                let reference = this.reference || this.$refs.reference;
                let popper = this.$refs.popper;
                // 获取触发元素
                if (!reference && this.$slots.reference && this.$slots.reference[0]) {
                    reference = this.referenceElm = this.$slots.reference[0].elm;
                }

                if (!this.$el || !reference || this.$el.contains(e.target) || reference.contains(e.target) || !popper || popper.contains(e.target)) {
                    return;
                }
                this.showPopper = false;
            },
        },
        mounted () {
            let reference = this.referenceElm = this.reference || this.$refs.reference;
            let popper = this.$refs.popper;

            if (this.trigger === 'click') {
                addEventListener(reference, 'click', this.handleToggle);
                addEventListener(document, 'click', this.handleDocumentClick);
            } else if (this.trigger === 'hover') {
                addEventListener(reference, 'mouseenter', this.handleMouseEnter);
                addEventListener(popper, 'mouseenter', this.handleMouseEnter);
                addEventListener(reference, 'mouseleave', this.handleMouseOuter);
                addEventListener(popper, 'mouseleave', this.handleMouseOuter);
            }
            addEventListener(window, 'resize', this.handleClose);
        },
        destroyed () {
            let reference = this.reference;
            removeEventListener(reference, 'click', this.handleToggle);
            removeEventListener(reference, 'mouseup', this.handleClose);
            removeEventListener(reference, 'mousedown', this.handleShow);
            removeEventListener(reference, 'focusin', this.handleShow);
            removeEventListener(reference, 'focusout', this.handleClose);
            removeEventListener(reference, 'mouseleave', this.handleMouseOuter);
            removeEventListener(reference, 'mouseenter', this.handleMouseEnter);
            removeEventListener(document, 'click', this.handleDocumentClick);
            removeEventListener(window, 'resize', this.handleClose);
        },
    };
</script>
<style lang="scss" src="./popover.scss"></style>
