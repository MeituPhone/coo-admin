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
import cooSwitch from './switch/switch.vue';
import table from './table/table.vue';
import column from './table/col.vue';
import drawer from './drawer/drawer.vue';
import noneData from './noneData/noneData.vue';
import select from './select/select.vue';
import selectOption from './select/option.vue';
import upload from './upload/index';

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
export const CooSwitch = cooSwitch;
export const Table = table;
export const TableColumn = column;
export const Drawer = drawer;
export const NoneData = noneData;
export const Select = select;
export const Option = selectOption;
export const Upload = upload;

if (!window.install) {
    Vue.prototype.$toast = toast;
    Vue.prototype.$tip = tip;
}
