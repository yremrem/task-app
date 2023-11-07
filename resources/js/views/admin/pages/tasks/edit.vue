<template>
    <div>
        <section class="content-header">
            <h1>
                Edit Task
            </h1>
        </section>

        <form @submit.prevent="update" @keydown="form.errors.clear($event.target.name)">

            <!-- Loading spinner when fetching the form data. -->
            <spinner v-if="fetchingFormData" size="large" class="mt4"
                     message="Loading the form, please wait..."></spinner>

            <!-- The Form. -->
            <transition name="fade" mode="out-in">
                <section v-if="!fetchingFormData" class="content">

                    <alert-errors ref="errors" :form="form"
                                  message="There were some problems with your input."></alert-errors>
                    <task-form :form="form"></task-form>

                    <div class="fixed bottom-0 right-0 m2 p2 ">
                        <button :disabled="form.busy" type="submit" class="btn btn-primary btn-app shadow">
                            <i class="fa fa-save"></i>
                            {{ form.busy ? 'Saving...' : 'Save' }}
                        </button>

                        <router-link :to="{name:'tasks'}" class="btn  btn-default  btn-app shadow">
                            <i class="fa fa-arrow-circle-left"></i>
                            Back
                        </router-link>

                    </div>
                </section>
            </transition>
        </form>

    </div>

</template>

<script type="text/babel">
    import Vue from 'vue';
    import swal from 'sweetalert2';
    import Task from '../../../../models/Task';
    import TaskForm from './partials/TaskForm';
    import {Form, AlertErrors} from '../../../../components/form';
    import './custom.css';

    export default {
        components: {
            'task-form': TaskForm,
            AlertErrors,
        },

        metaInfo: {
            titleTemplate: 'Task Create | %s'
        },

        mounted() {
			this.fetchFormData();	
        },
        data () {
            return {
                /**
                 * Determines if the app is currently fetching the data needed for the form.
                 */
                fetchingFormData: true,
                form: new Form({})
            }
        },
        methods: {
            /**
             * Fetches the data needed for the form.
             *
             * If we didn't find the user with the specified ID, we'll redirect to 404 page.
             *
             * @return void
             */
            async fetchFormData() {

                this.fetchingFormData = true;

                let params = {
                    
                };

                Task.find(this.$route.params.id, params).then(async (data) => {
                    // Initial form data.
                    this.form.setData(data);
                    this.fetchingFormData = false;
                }).catch(e => {
                    next({name: 'error.404', params: [to.path]});
                });

            },
            /**
             * Handles the process of storing the location
             */
            update() {
                this.form.patch(Task.set(this.form.id)).then(({data}) => {
                    Vue.toasted.show(`${data.title} has been updated.`, {
                    theme: "toasted-success",
                        position: "top-right",
                        duration: 5000,
                    });
                    this.$router.push({name: 'tasks'});
                }).catch(error => {
                    this.$scrollTo(this.$refs.errors.$el);
                });
            }
        },
    }
</script>