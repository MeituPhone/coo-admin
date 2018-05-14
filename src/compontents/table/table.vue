<template>
    <table class="coo-table" cellpadding="0" cellspacing="0" border="0">
        <colgroup>
            <slot></slot>
        </colgroup>
        <thead class="coo-table-head">
            <tr>
                <th class="coo-table-column" v-for="(column, index) in $children" v-if="index < length">
                    <div class="coo-table-cell" :style="{textAlign: column.$props.align}">
                        {{ column.$props.label }}
                    </div>
                </th>
            </tr>
        </thead>
        <tbody class="coo-table-body">
            <coo-row v-for="(item, index) in data">
                <td class="coo-table-column" v-for="(column, columnIndex) in $children" v-if="columnIndex < length">
                    <coo-cell :row="item" :column="column" :index="index + 1" :align="column.$props.align"></coo-cell>
                </td>
            </coo-row>
        </tbody>
    </table>
</template>
<script>
    import row from './row.vue';
    import col from './col.vue';
    import cell from './cell';

    export default {
        components: {
            cooRow: row,
            cooCol: col,
            cooCell: cell
        },
        props: {
            data: Array
        },
        data () {
            return {
                children: [],
                length: 0
            };
        },
        mounted () {
            this.length = this.$children.length;
        }
    };
</script>
<style lang="scss" src="./table.scss"></style>
