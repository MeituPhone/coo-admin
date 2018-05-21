<template>
    <div class="pageThumb" :class="[!file.src ? 'pageThumb-none' : '', index + 1 === length ? 'pageThumb-last' : '']">
        <div class="pageThumb-mask" v-if="file.src">
            <a href="javascript:;" class="pageThumb-remove" @click="handleRemove"><coo-icon type="remove"></coo-icon></a>
        </div>
        <a href="javascript:;"
           class="pageThumb-btn pageThumb-btn——up"
           :class="[index === 0 ? 'pageThumb-btn——disable' : '']"
           @click="handleMoveUp"
           v-if="file.src">
            <coo-icon type="circle-arrow-up"></coo-icon>
        </a>
        <a href="javascript:;"
           class="pageThumb-btn pageThumb-btn——down"
           :class="[index + 1 ===  length ? 'pageThumb-btn——disable' : '']"
           @click="handleMoveDown"
           v-if="file.src">
            <coo-icon type="circle-arrow-down"></coo-icon>
        </a>
        <img :src="file.src" v-if="file.src" class="pageThumb-image" />
        <a href="javascript:;" class="pageThumb-add" @click="handleAdd"><coo-icon type="plus"></coo-icon></a>
    </div>
</template>
<script>
    import {Icon, Upload} from '../../../compontents';
    import {mapActions, mapGetters} from 'vuex';
    export default {
        props: {
            file: Object,
            index: Number,
            length: Number
        },
        components: {
            cooIcon: Icon
        },
        data () {
            return {

            };
        },
        methods: {
            ...mapActions({
                moveUp: 'easyH5/moveUp',
                moveDown: 'easyH5/moveDown',
                removeFile: 'easyH5/removeFile'
            }),
            handleAdd () {
                document.getElementById('up-file-input').click();
            },
            handleRemove () {
                this.removeFile(this.index);
            },
            handleMoveUp () {
                if (this.index === 0) {
                    return false;
                }
                this.moveUp(this.index);
            },
            handleMoveDown () {
                if (this.index === this.length - 1) {
                    return false;
                }
                this.moveDown(this.index);
            }
        }
    };
</script>
<style lang="scss" src="./pageThumb.scss"></style>