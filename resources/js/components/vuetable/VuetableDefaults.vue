<script>
    export default {
        name: 'vuetable-default',
        data () {
            return {
                /**
                 * Default query params.
                 */
                defaultQueryParams: {
                    perPage: 10
                },
                /**
                 * Default css properties for our table.
                 * @note - since this is just a mixin, you can override these properties on the component instance.
                 */
                css: {
                    /**
                     * Default table style.
                     */
                    table: {
                        tableClass: 'table table-bordered table-striped table-hover',
                        ascendingIcon: 'fa fa-chevron-up',
                        descendingIcon: 'fa fa-chevron-down'
                    }
                }
            }
        },
        mounted() {
            //
            // In order for this mixin to work properly, the component needs to set a 'tableId' property.
            //
            if (!this.tableId) {
                console.error(`You need to define "tableId" data property  (used inside <vuetable :ref="tableId">) in order for VuetableDefaultsMixin to work!`);
                return false;
            }

            if (!this.$refs[this.tableId]) {
                console.error(`You need to define "tableId" data property  (used inside <vuetable :ref="tableId">) in order for VuetableDefaultsMixin to work!`);
                return false;
            }
        },
        methods: {
            /**
             * Reloads the table
             */
            reloadTable() {
                if (this.$refs[this.tableId]) {
                    this.$nextTick(() => this.$refs[this.tableId].refresh());
                }
            },
            /**
             * Reloads the table
             */
            reinitializeFields() {
                if (this.$refs[this.tableId]) {
                    this.$nextTick(() => {
                        this.$refs[this.tableId].normalizeFields();
                    });
                }
            },
            /**
             * The default vuetable-default:on-change-page-length event handler
             *
             * @see VuetableDefaultPagination@onChangePage
             * @see VuetableDefaultPageLength.vue@onChangePerPage()
             */
            defaultChangePageLengthHandler(count) {
                this.defaultQueryParams.perPage = count;
                this.reloadTable();
            },
            /**
             * The default vuetable:pagination change page event handler
             *
             * @see VuetableDefaultPagination@onChangePage
             */
            defaultChangePageHandler(page) {
                if (this.$refs[this.tableId]) {
                    this.$refs[this.tableId].changePage(page);
                }
            },

            /**
             * handles the firing of event when the pagination data was received.
             * @fix - will conflict multiple table
             * @example <vuetable @vuetable:pagination-data="onPaginationData"></vuetable>
             */
            onPaginationData (paginationData) {
                this.$events.fire('vuetable-default:on-pagination-data', paginationData);
            }
        }
    }
</script>