/**
 * 通用组件库
 * Created by 王佳欣 on 2017/5/17.
 */
import '../assets/scss/index.scss';
import Vue from 'vue';
import uploader from './uploader/uploader.vue';
import dialog from './dialog/dialog.vue';
import baiduMap from './baiduMap/baiduMap.vue';
import swiper from './swiper/swiper.vue';
import swiperItem from './swiper/swiperItem.vue';
import areaSelect from './areaSelect/areaSelect.vue';
import lazyImg from './lazyImg/lazyImg.vue';
import toast from './toast/toast.js';
import tip from './tip/tip.js';
import ripple from './ripple/ripple.vue';
import input from './input/input.vue';
import button from './button/button.vue';
import icon from './icon/icon.vue';
import popover from './popover/popover.vue';
import form from './form/form.vue';
import formItem from './form/formItem.vue';

export const Uploader = uploader;
export const Dialog = dialog;
export const BaiduMap = baiduMap;
export const Swiper = swiper;
export const SwiperItem = swiperItem;
export const AreaSelect = areaSelect;
export const LazyImg = lazyImg;
export const Ripple = ripple;
export const Input = input;
export const Button = button;
export const Icon = icon;
export const Popover = popover;
export const Form = form;
export const FormItem = formItem;

if (!window.install) {
    Vue.prototype.$toast = toast;
    Vue.prototype.$tip = tip;
}
