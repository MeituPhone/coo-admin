<template>
    <div class="administrators">
        <div class="administrators-toolbar">
            <coo-button suffixIcon="circle-plus-o">添加管理员</coo-button>
        </div>
        <div class="administrators-content">
            <coo-table :data="list">
                <coo-table-column :width="100" prop="_lineNumber" label="系号"></coo-table-column>
                <coo-table-column :width="150" prop="avatar" label="用户头像">
                    <template slot-scope="scope">
                        <img :src="scope.row.name.avatar" class="administrators-avatar" />
                    </template>
                </coo-table-column>
                <coo-table-column :width="200" prop="nickname" label="用户昵称"></coo-table-column>
                <coo-table-column :width="200" prop="administrator" label="用户名"></coo-table-column>
                <coo-table-column :width="100" prop="status" label="状态">
                    <template slot-scope="scope">
                        <coo-switch v-model="!!scope.row.name.status" @change="handleSwitch(scope.row, scope.$index)"></coo-switch>
                    </template>
                </coo-table-column>
                <coo-table-column :width="100" prop="status" label="操作"></coo-table-column>
            </coo-table>
        </div>
        <coo-drawer :width="'100px'" :visible.sync="showDrawer">
        </coo-drawer>
    </div>
</template>
<script>
    import {mapActions} from 'vuex';
    import {Button, CooSwitch, Table, TableColumn, Drawer} from '../../../compontents';

    export default {
        components: {
            cooButton: Button,
            CooSwitch,
            cooTable: Table,
            cooTableColumn: TableColumn,
            cooDrawer: Drawer
        },
        data () {
            return {
                page: 1,
                list: [],
                showDrawer: true
            };
        },
        methods: {
            ...mapActions({
                fetch: 'administrators/fetch',
                update: 'administrators/update'
            }),
            handleSwitch(value, administrator, index) {
                this.update({include: 'status', value, _id: administrator._id}).then((response) => {
                    this.list[index].status = value;
                }).catch((error) => {
                    this.isSaving = false;
                    this.showTip(error.message);
                });
            }
        },
        created () {
            this.fetch({page: this.page, per_page: 10}).then((response) => {
                this.list = response;
            });
        }
    };
</script>
<style lang="scss" src="./list.scss"></style>
