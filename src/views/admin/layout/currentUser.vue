<template>
    <div class="currentUser">
        <img :src="me.avatar" class="currentUser_avatar" v-popover:userPopover />
        <popover trigger="click" ref="userPopover" :fixed="true">
            <div class="menu">
                <router-link to="/admin/me" class="menu_item">
                    <icon type="cog"></icon>我的资料
                </router-link>
                <a href="javascript:;" class="menu_item" @click="handleLogout">
                    <icon type="power"></icon>退出
                </a>
            </div>
        </popover>
        <coo-dialog
                :visible.sync="showLogoutDialog"
                type="dialog"
                title="确认退出吗？"
                :lock="true"
                :cancel='true'
                :width="300"
                :beforeOk="handleConfirmLogout"
        >
            <div class="logout">
                退出当前账户
            </div>
        </coo-dialog>
    </div>
</template>
<script>
    import {Icon, Popover, Dialog} from '../../../compontents';
    import popover from '../../../compontents/popover/directive';
    import {mapActions, mapGetters} from 'vuex';
    export default {
        components: {
            icon: Icon,
            popover: Popover,
            cooDialog: Dialog
        },
        directives: {popover},
        data () {
            return {
                showLogoutDialog: false
            };
        },
        computed: {
            ...mapGetters({
                me: 'administrators/me'
            })
        },
        methods: {
            ...mapActions({
                getMe: 'administrators/me',
                logout: 'administrators/logout',
            }),
            handleLogout () {
                this.showLogoutDialog = true;
            },
            handleConfirmLogout (done) {
                this.logout().then(result => {
                    done();
                    this.$router.replace({path: '/login'});
                });
            }
        },
        mounted () {
            this.getMe();
        },
    };
</script>
<style lang="scss" src="./currentUser.scss"></style>
