import Vue from 'vue';
import Tip from './tip.vue';
let TipExtend = Vue.extend(Tip);

class TipUse {
    constructor (options = {}) {
        this.options = options;
        this.instance = new TipExtend({
            data: this.options
        });
        this.instance.vm = this.instance.$mount();
        document.body.appendChild(this.instance.vm.$el);
    }
    close () {
        this.instance.close();
    }
};

const TipInstance = (options = {}) => {
    return new TipUse(options);
};

export default TipInstance;
