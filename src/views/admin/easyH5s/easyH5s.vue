<template>
    <div class="easyh5">
        <div class="easyh5-toolbar">
            <coo-button suffixIcon="picture" @click="handleLinkH5Page">制作简单网页</coo-button>
            <coo-button suffixIcon="post">制作简单H5</coo-button>
        </div>
        <div class="easyh5-content">
            <coo-table :data="list">
                <coo-table-column :width="80" prop="$lineNumber" label="系号" align="center"></coo-table-column>
                <coo-table-column :width="250" prop="name" label="活动名称" align="center"></coo-table-column>
                <coo-table-column :width="200" prop="type" label="类型">
                    <template slot-scope="scope">
                        <span>{{ scope.$row.type === 'h5_page' ? '简单页面' : 'H5页面' }}</span>
                    </template>
                </coo-table-column>
                <coo-table-column :width="200" label="创建时间">
                    <template slot-scope="scope">
                        <span>{{ dateFormat(scope.$row.meta.createAt) }}</span>
                    </template>
                </coo-table-column>
                <coo-table-column :width="200" label="操作" align="center">
                    <template slot-scope="scope">
                        <a href="javascript:;" @click="handleEdit(scope.$row, scope.$index)" class="easyh5-link">编辑</a>
                        <a href="javascript:;" @click="handleRemove(scope.$row, scope.$index)" class="easyh5-link">删除</a>
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
                确认删除<span>{{ currentH5.name }}</span>吗？
            </div>
        </coo-dialog>
    </div>
</template>
<script>
    import {mapActions} from 'vuex';
    import {Button, CooSwitch, Table, TableColumn, Dialog, NoneData} from '../../../compontents';
    import {dateFormat} from '../../../utils/dateFormat';

    export default {
        components: {
            cooButton: Button,
            cooTable: Table,
            cooTableColumn: TableColumn,
            cooNoneData: NoneData,
            cooDialog: Dialog
        },
        data () {
            return {
                list: [],
                page: 1,
                per_page: 10,
                loading: false,
                currentH5: {},
                deleteDialogVisible: false,
            }
        },
        methods: {
            ...mapActions({
                fetch: 'easyH5/fetch',
                remove: 'easyH5/remove'
            }),
            handleLinkH5Page () {
                this.$router.push({ path: '/h5editor' });
            },
            dateFormat (value) {
                let crtTime = new Date(value);
                return dateFormat("yyyy-MM-dd hh:mm:ss", crtTime);
            },
            handleEdit () {

            },
            handleRemove (h5, index) {
                this.currentIndex = index;
                this.currentH5 = h5;
                this.deleteDialogVisible = true;
            },
            handleConfirmRemove(done) {
                this.remove(this.currentH5._id).then((response) => {
                    if(response.ok === 1 && response.n === 1) {
                        this.list.splice(this.currentIndex, 1);
                        console.log(this.list);
                        done();
                        return false;
                    }

                }).catch((error) => {

                });
            }
        },
        created () {
            this.fetch({page: this.page, per_page: this.per_page}).then((result) => {
                if (!result.error) {
                    this.list = result;
                }
            });
        }
    };
</script>
<style lang="scss" src="./easyH5s.scss"></style>