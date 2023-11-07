<template>
    <div class="alert alert-danger" v-if="form.errors.any()">
        <button v-if="dismissible" type="button" class="close" aria-label="Close" @click="dismiss">
            <span aria-hidden="true">&times;</span>
        </button>

        <div v-if="message" v-html="message"></div>

        <ul>
            <li v-for="error in form.errors.flatten(exclude)" v-html="error"></li>
        </ul>
    </div>
</template>

<script>
    import Alert from './Alert'

    export default {
        extends: Alert,

        name: 'alert-errors',

        props: {
            /**
             * The keys to be excluded when showing the errors.
             */
            exclude: {
                type: Array,
                required: false,
                default: () => {
                    return []
                }
            },
            message: {
                type: String,
                default: 'There were some problems with your input.'
            }
        }
    }
</script>
