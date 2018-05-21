<template>
    <div class="administrators">
        <div class="administrators-toolbar">
            <coo-button suffixIcon="circle-plus-o" @click="handleOpenDrawer">添加管理员</coo-button>
        </div>
        <div class="administrators-content">
            <coo-table :data="list">
                <coo-table-column :width="80" prop="$lineNumber" label="系号" align="center"></coo-table-column>
                <coo-table-column :width="150" label="用户头像" align="center">
                    <template slot-scope="scope">
                        <img :src="scope.$row.avatar" class="administrators-avatar" />
                    </template>
                </coo-table-column>
                <coo-table-column :width="200" prop="nickname" label="用户昵称"></coo-table-column>
                <coo-table-column :width="200" prop="administrator" label="用户名"></coo-table-column>
                <coo-table-column :width="150" prop="status" label="状态" align="center">
                    <template slot-scope="scope">
                        <coo-switch v-model="!!scope.$row.status" :beforeSwitch="handleSwitch.bind(this, scope.$row, scope.$index)"></coo-switch>
                    </template>
                </coo-table-column>
                <coo-table-column :width="100" label="操作" align="center">
                    <template slot-scope="scope">
                        <a href="javascript:;" @click="handleRemove(scope.$row, scope.$index)" class="administrators-link">删除</a>
                    </template>
                </coo-table-column>
            </coo-table>

            <coo-none-data v-if="list.length === 0 && !loading">
                没有相关数据
            </coo-none-data>
        </div>
        <coo-dialog
                :visible.sync="deleteDialogVisible"
                type="dialog"
                title="确认删除吗？"
                :lock="true"
                :cancel='true'
                :width="300"
                :beforeOk="handleConfirmRemove"
        >
            <div class="administrators-remove">
                确认删除<span>{{ currentAdministrator.nickname }}</span>吗？
            </div>
        </coo-dialog>
        <coo-drawer :width="'500px'" :visible.sync="openDrawer" title="管理员编辑">
            <administrator-form @create="handleCreateSuccess"></administrator-form>
        </coo-drawer>
    </div>
</template>
<script>
    import {mapActions} from 'vuex';
    import {Button, CooSwitch, Table, TableColumn, Drawer, Dialog, NoneData} from '../../../compontents';
    import administratorForm from './form.vue';

    export default {
        components: {
            cooButton: Button,
            CooSwitch,
            cooTable: Table,
            cooTableColumn: TableColumn,
            cooDrawer: Drawer,
            cooDialog: Dialog,
            cooNoneData: NoneData,
            AdministratorForm: administratorForm
        },
        data () {
            return {
                loading: true,
                page: 1,
                list: [],
                currentAdministrator: {},
                currentIndex: 0,
                openDrawer: false,
                deleteDialogVisible: false,
            };
        },
        methods: {
            ...mapActions({
                fetch: 'administrators/fetch',
                update: 'administrators/update',
                toggleStatus: 'administrators/toggleStatus',
                remove: 'administrators/remove',
            }),
            handleSwitch(administrator, index, done) {
                this.toggleStatus({value: administrator.status ? 0 : 1 , id: administrator._id}).then((response) => {
                    if(response.ok === 1) {
                        this.list[index].status = !administrator.status;
                    }
                }).catch((error) => {
                    this.isSaving = false;

                });
            },
            handleRemove (administrator, index) {
                this.deleteDialogVisible = true;
                this.currentAdministrator = administrator;
                this.currentIndex = index;
            },
            handleConfirmRemove (done) {
                this.remove(this.currentAdministrator._id).then((response) => {
                    if(response.ok === 1 && response.n === 1) {
                        this.list.splice(this.currentIndex, 1);
                        done();
                        return false;
                    }

                }).catch((error) => {

                });
            },
            handleOpenDrawer () {
                this.openDrawer = true;
            },
            handleCreateSuccess () {
                this.loadData();
            },
            loadData () {
                this.loading = true;
                this.fetch({page: this.page, per_page: 10}).then((response) => {
                    this.list = response;
                    this.loading = false;
                });
            }
        },
        created () {
            this.loadData();
        }
    };
</script>
<style lang="scss" src="./list.scss"></style>
