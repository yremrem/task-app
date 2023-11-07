<template>
    <div class="vuetable-pagination">

        <vuetable-default-page-length ></vuetable-default-page-length>

        <vuetable-pagination-info ref="paginationInfo"
                                  info-class="pagination-info"
                                  :class="'pagination-info'"
        >
        </vuetable-pagination-info>

        <vuetable-pagination ref="pagination"
                             :css="css.pagination"
                             :icons="css.icons"
                             @vuetable-pagination:change-page="onChangePage"
        ></vuetable-pagination>
    </div>
</template>

<script type="text/babel">
    export default {
        name: 'vuetable-default-pagination',
        data () {
            return {
                /**
                 * Default css properties for our pagination.
                 * @note - since this is just a mixin, you can override these properties on the component instance.
                 */
                css: {
                    /**
                     * Default pagination properties.
                     */
                    pagination: {
                        wrapperClass: 'pagination',
                        activeClass: 'active',
                        disabledClass: 'disabled',
                        pageClass: 'page',
                        linkClass: 'link',
                        /**
                         * Default icons used.
                         */
                        icons: {
                            first: 'fa fa-step-backward',
                            prev: 'fa fa-chevron-left',
                            next: 'fa fa-chevron-right',
                            last: 'fa fa-step-forward',
                        }
                    }
                }
            }
        },
        methods: {
            /**
             * Default method that handles the firing of vuetable-default:on-change-page event.
             *
             * @param page
             */
            onChangePage (page) {
                this.$emit('vuetable-default:on-change-page', page);
            },
        },
        events: {
            /**
             * Default event listener when the pagination data was received.
             *
             * @param paginationData
             * @see VuetableDefaultsMixin.vue@onPaginationData()
             */
            'vuetable-default:on-pagination-data': function (paginationData) {
                if (this.$refs.pagination && this.$refs.paginationInfo) {
                    this.$refs.pagination.setPaginationData(paginationData);
                    this.$refs.paginationInfo.setPaginationData(paginationData);
                }
            }
        }
    }
</script>

<style>
    .vuetable-pagination-info {
        margin-right: 10px;
    }

    .pagination {
        margin: 0;
        float: right;
    }

    .pagination a {
        cursor: pointer;
    }

    .pagination a.page {
        border: 1px solid lightgray;
        border-radius: 3px;
        padding: 5px 10px;
        margin-right: 2px;
    }

    .pagination a.page.active {
        color: white;
        background-color: #337ab7;
        border: 1px solid lightgray;
        border-radius: 3px;
        padding: 5px 10px;
        margin-right: 2px;
    }

    .pagination a.btn-nav {
        border: 1px solid lightgray;
        border-radius: 3px;
        padding: 5px 7px;
        margin-right: 2px;
    }

    .pagination a.btn-nav.disabled {
        color: lightgray;
        border: 1px solid lightgray;
        border-radius: 3px;
        padding: 5px 7px;
        margin-right: 2px;
        cursor: not-allowed;
    }

    .pagination-info {
        float: left;
    }
</style>