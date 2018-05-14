export default {
    props: {
        row: Object,
        column: Object,
        index: Number,
        align: {
            type: String,
            default: 'left'
        }
    },
    data() {
        return {

        };
    },
    methods: {
        renderCell () {
            if ( this.column.$props.prop === '$lineNumber') {
                return `${this.index }.`;
            }

            if (this.column.$scopedSlots.default) {
                return this.column.$scopedSlots.default({$row: {...this.row}, $index: this.index - 1});
            }

            return this.row[this.column.$props.prop];
        },
    },
    render (h) {
        let style = {
            textAlign: this.align
        };

        return (
            <div class="coo-table-cell" style={style}> {this.renderCell()} </div>
        );
    }
};
