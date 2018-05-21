<template>
    <div class="h5Editor">
        <toolbar pages="[]"></toolbar>
        <sidebar></sidebar>
        <div class="h5Editor-preview" ref="preview">
            <div class="h5Editor-item" v-for="file in files">
                <template v-if="file.type === 'photo'">
                    <div class="h5Editor-pic">
                        <img :src="file.src" />
                    </div>
                </template>
                <template v-if="file.type === 'video'">
                    <div class="h5Editor-pic">
                        <img :src="file.src" />
                    </div>
                </template>
            </div>
        </div>
    </div>
</template>
<script>
    import PerfectScrollbar from 'perfect-scrollbar';
    import Toolbar from './components/toolbar.vue';
    import Sidebar from './components/sidebar.vue';
    import {mapGetters, mapActions} from 'vuex';

    export default {
        components: {
            Toolbar,
            Sidebar
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
        mounted() {
            const ps = new PerfectScrollbar(this.$refs['preview'], {
                wheelSpeed: 2,
                wheelPropagation: true,
                minScrollbarLength: 20
            });
        }
    };
</script>
<style lang="scss" src="./h5Editor.scss"></style>
