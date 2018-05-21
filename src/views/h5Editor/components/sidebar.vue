<template>
    <div class="h5Sidebar">
        <page-thumb v-for="(file, index) in files " :file="file" :index="index" :length="files.length"></page-thumb>
        <input type="file" class="h5Sidebar-file" id="up-file-input" @change="handleFileChange" accept="image/gif,image/jpeg,image/jpg,image/png,image/svg">
    </div>
</template>
<script>
    import {Icon} from '../../../compontents';
    import pageThumb from './pageThumb.vue';
    import {Upload} from '../../../compontents';
    import {mapActions, mapGetters} from 'vuex';
    export default {
        components: {
            cooIcon: Icon,
            pageThumb
        },
        computed: {
            ...mapGetters({
                files: 'easyH5/files'
            })
        },
        data () {
            return {

            };
        },
        methods: {
            ...mapActions({
                addFile: 'easyH5/addFile'
            }),
            handleFileChange (e) {
                let _this = this;
                let file = e.target.files[0];
                let UP = new Upload({
                    type: 'meitu',
                    width: 750,
                    quality: '100',
                    preToken: false,
                    tokenParams: {
                        app: "cloud-beauty-h5",
                        type: "photo"
                    }
                });

                UP.up(file, {
                    success (e) {
                        _this.addFile({
                            type: 'photo',
                            src: e.img
                        });
                    },
                    error (e) {
                        console.log(e);
                    }
                });
            }
        }
    };
</script>
<style lang="scss" src="./sidebar.scss"></style>