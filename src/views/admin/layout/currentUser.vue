<template>
    <div class="currentUser">
        <img src="../../../assets/images/user.jpg" class="currentUser_avatar" v-popover:userPopover />
        <popover trigger="click" ref="userPopover" :fixed="true">
            <div class="menu">
                <a href="javascript:;" class="menu_item">
                    <icon type="org-user"></icon>我的主页
                </a>
                <a href="javascript:;" class="menu_item">
                    <icon type="cog"></icon>设置
                </a>
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
        methods: {
            handleLogout () {
                this.showLogoutDialog = true;
            },
            handleConfirmLogout (done) {
                done();
                this.$router.replace({path: '/login'});
            }
        },
        mounted () {

        },
    };
</script>
<style lang="scss" src="./currentUser.scss"></style>
