/**
 * popover
 * Created by 王佳欣 on 2018/3/27.
 */

import Vue from 'vue';
import Popover from './popover.vue';
let PopoverExtend = Vue.extend(Popover);

class PopoverUse {
    constructor (options = {}) {
        this.options = options;
        this.instance = new PopoverExtend({
            data: this.options
        });
        this.instance.vm = this.instance.$mount();
    }
};

const PopoverInstance = (options = {}) => {
    return new PopoverUse(options);
};

export default PopoverInstance;
