<template>
    <div>
        <div class="row">
            <div class="col-md-12">
                <div class="box box-primary">

                    <!-- box-body -->
                    <div class="box-body">
                        <!-- Personal Information Section -->
                        <section>
                            <div class="row">
                                <div class="col-md-12">
                                    <!-- Title -->
                                    <div class="form-group" :class="{ 'has-error': form.errors.has('title') }">
                                        <label class="control-label">Title <span
                                                class="text-red">*</span></label>
                                        <input type="text" autocomplete="off" 
                                               class="form-control"
                                               name="title"
                                               placeholder="Title"
                                               v-model="form.title"
                                        >
                                        <has-error :form="form" field="name"></has-error>
                                    </div>
                                </div>
                                <div class="col-md-12">
                                    <!-- Description -->
                                    <div class="form-group" :class="{ 'has-error': form.errors.has('description') }">
                                        <label class="control-label">Description </label>
                                        <textarea autocomplete="off" 
                                               class="form-control"
                                               name="description"
                                               placeholder="Description"
                                               v-model="form.description"
                                        ></textarea>
                                        <has-error :form="form" field="description"></has-error>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </div>

        </div>


    </div>

</template>

<script type="text/babel">

    export default {
        props: {
            form: {
                type: Object,
                required: true
            }
        },
        data() {
            return {}
        },

        methods: {

        },
        computed: {
            
        }

    }
</script>
