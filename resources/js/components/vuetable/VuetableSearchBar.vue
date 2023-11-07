<template>
    <form class="form-inline">
        <div class="form-group">
            <label>{{ label }}</label>
            <input type="text"
                   ref="input"
                   :value="value"
                   class="form-control"
                   :placeholder="placeholder">
        </div>
        <div class="form-group">
            <button class="btn btn-primary btn-flat btn-sm" @click.prevent="doFilter">{{ filterButtonLabel }}</button>
            <button class="btn btn-default btn-flat btn-sm" @click.prevent="resetFilter">{{ resetButtonLabel }}</button>
        </div>
    </form>
</template>

<script type="text/babel">
    export default {
        name: 'vuetable-search-bar',
        props: {
            value: {
                required: true
            },
            placeholder: {
                type: String,
                default: '',
            },
            label: {
                type: String,
                default: 'Search:',
            },
            filterButtonLabel: {
                type: String,
                default: 'Go',
            },
            resetButtonLabel: {
                type: String,
                default: 'Reset',
            }
        },
        methods: {
            /**
             * Start filtering.
             */
            doFilter () {
                let value = this.$refs.input.value;

                this.$emit('input', value);
            },
            /**
             * Resets the filter.
             */
            resetFilter () {
                this.$emit('input', '');
            }
        }
    }
</script>
<style>
    .filter-bar {
        padding: 10px;
    }
</style>
