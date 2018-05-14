<template>
    <div class="cooInput"
         :class="[
            size ? `cooInput-${size}` : ''
         ]"
    >
        <input
                class="cooInput_input"
                :class="[
                    {
                        'cooInput_input-readonly': readonly,
                        'cooInput_input-password': type === 'password',
                    }
                ]"
                :name="name"
                ref="input"
                :placeholder="placeholder"
                :value="currentValue"
                :type="viewPassword ? 'text' : type"
                :readonly="readonly"
                @input="handleInput"
                @focus="handleFocus"
                @change="handleChange"
                @blur="handleBlur"
        />
        <span class="cooInput_icon cooInput_clear" v-if="clear" v-show="!readonly && currentValue" @click="handleClear">
            <coo-icon type="circle-error-o"></coo-icon>
        </span>
        <span class="cooInput_icon cooInput_eye" v-show="!readonly && type === 'password'" @click="handleToggleViewPassword">
            <coo-icon :type="viewPassword ? 'eye-slash' : 'eye'"></coo-icon>
        </span>
    </div>
</template>
<script>
    import Icon from '../icon/icon.vue';
    export default {
        name: 'coo-input',
        components: {
            cooIcon: Icon
        },
        props: {
            readonly: {
                type: Boolean,
                default: false
            },
            type: {
                type: String,
                default: 'text'
            },
            name: String,
            value: [String, Number],
            placeholder: String,
            clear: {

            },
            size: {
                type: String,
                default: '',
                validator: value => ['medium', 'small', 'mini', 'large', ''].indexOf(value) > -1,
            }
        },
        data () {
            return {
                currentValue: this.value,
                viewPassword: false,
            };
        },
        watch: {
            value (val, oldValue) {
                this.currentValue = val;
            }
        },
        methods: {
            handleInput (event) {
                const value = event.target.value;
                this.$emit('input', value);
                this.currentValue = value;
            },
            handleFocus (event) {
                this.$emit('focus', event);
                if (this.$parent && this.$parent.handleChildFocus) {
                    this.$parent.handleChildFocus();
                }
            },
            handleChange (event) {
                this.$emit('change', event.target.value);
            },
            handleBlur (event) {
                this.$emit('blur', event);
            },
            handleClear () {
                this.$emit('input', '');
                this.$emit('change', '');
                this.$emit('clear');
                this.currentValue = '';
                this.$refs.input.focus();
            },
            handleToggleViewPassword () {
                this.viewPassword = !this.viewPassword;
            },
        },
    };
</script>
<style lang="scss" src="./input.scss"></style>
