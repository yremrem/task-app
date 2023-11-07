<template>
    <div class="vuetable-pagination-info pagination-info">
        <label v-html="label"></label>
        <select v-model="queryParams.perPage" @change="onChangePageLength">
            <!-- <option v-for="length in lengths" :value="length">{{ length }}</option> -->
        </select>
    </div>
</template>

<script type="text/babel">
    export default {
        name: 'vuetable-default-page-length',
        props: {
            /**
             * Label.
             */
            label: {
                type: String,
                default: 'Records Per Page:'
            },
            /**
             * Length options.
             */
            lengths: {
                type: Array,
                default: function () {
                    return [10, 20, 50, 100];
                },
            }
        },

        data () {
            return {
                queryParams: {
                    perPage: 10
                },
            }
        },
        methods: {
            /**
             * Method that handles the firing of vuetable-default:on-change-length event.
             *
             * @param page
             */
            onChangePageLength (count){
                this.$parent.$emit('vuetable-default:on-change-page-length', Number(this.queryParams.perPage));
            }
        }
    }
</script>