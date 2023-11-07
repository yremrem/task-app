<template>
    <div>
			<div class="card shadow mb-4">
				<div class="card-header py-3 d-sm-flex align-items-center justify-content-between">
					<h5 class="m-0 font-weight-bold text-primary">Tasks</h5>
					<router-link class="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm" :to="{name:'tasks.create'}">
						<i class="fa fa-plus fa-sm text-white-50"></i> New Task
					</router-link>
				</div>
				<div class="card-body" v-if="!tableIsLoading">
					<div class="table-responsive">
						<table class="table table-bordered" id="taskTable" width="100%" cellspacing="0">
							<thead>
								<tr>
									<th>Title</th>
									<th>Description</th>
									<th>Created at</th>
									<th>Updated at</th>
									<th>Status</th>
									<th>Action</th>
								</tr>
							</thead>
							<tbody>
								<tr v-for="task in tasks">
									<td>{{ task.title }}</td>
									<td>{{ task.description }}</td>
									<td>{{ task.created_at }}</td>
									<td>{{ task.updated_at }}</td>
									<td><span class="badge badge-counter" :class="task.status ? task.status.color : 'badge-default'">{{ task.status ? task.status.name : '' }}</span></td>
									<td>
										<router-link :to="{ name: 'tasks.edit', params: { id: task.id }}">
											<button class="btn btn-primary btn-icon-split btn-sm">
												<span class="text">Edit <i class="fas fa-edit ml-1"></i></span>
											</button>
										</router-link>
										<button class="btn btn-danger btn-icon-split btn-sm" @click.prevent="deleteBtn(task)">
											<span class="text">Delete <i class="fas fa-trash ml-1"></i></span>
										</button>
										<button class="btn btn-icon-split btn-sm" :class="task.status_id === 1 ? 'btn-info' : 'btn-success'" @click.prevent="updateStatus(task)" v-if="task.status_id!==3">
											<span class="text">{{ task.status_id === 1 ? 'Start' : 'Finish' }} <i class="fas ml-1" :class="task.status_id === 1 ? 'fa-play' : 'fa-stop'"></i></span>
										</button>
									</td>
								</tr>
							</tbody>
						</table>
					</div>
					<!-- <DataTable :data="tasks" class="display">
						<thead>
								<tr>
									<th>A</th>
									<th>B</th>
								</tr>
						</thead>
					</DataTable> -->
				</div>
			</div>
	</div>
</template>

<script>
import "datatables.net-dt/js/dataTables.dataTables"
import "datatables.net-dt/css/jquery.dataTables.min.css"

// import DataTable from 'datatables.net-vue3';
// import DataTablesCore from 'datatables.net';
// import 'datatables.net-select';
// import 'datatables.net-responsive';
 
// DataTable.use(DataTablesCore);

import axios from "axios";
import Task from '../../../../models/Task';

import './custom.css';

export default {
	name: 'TasksComponent',
	
	data () {
		return {
			accessToken : 'Bearer ' + localStorage.getItem('token'),
			apiUrl: Task.URI,
			tableIsLoading: true,
			tasks: []
		}
	},

	mounted() {
		this.fetchTasks();
	},

	methods: {
		async fetchTasks(){
			return new Promise((resolve, reject) => {
					axios.get(Task.URI).then((response) => {
							this.tasks = response.data;
							$('#taskTable').DataTable();
							this.tableIsLoading = false;
							resolve(response);
					}).catch((response) => {
							reject(response);
					});
			});
		},
		updateStatus(task) {
			let status_id = 2;
			if(task.status_id === 2) {
				status_id = 3;
			}
			return new Promise((resolve, reject) => {
					axios.patch(`${Task.URI}/${task.id}`, {
						status_id: status_id 
					}).then((response) => {
							Vue.toasted.show(`${task.title} status has been updated.`, {
							theme: "toasted-info",
									position: "top-right",
									duration: 5000,
							});
							this.fetchTasks();
							this.tableIsLoading = false;
							resolve(response);
					}).catch((response) => {
							reject(response);
					});
			});
		},
		deleteBtn(task){
			return new Promise((resolve, reject) => {
					axios.delete(`${Task.URI}/${task.id}`).then((response) => {
							Vue.toasted.show(`${task.title} has been deleted.`, {
							theme: "toasted-warning",
									position: "top-right",
									duration: 5000,
							});
							this.fetchTasks();
							this.tableIsLoading = false;
							resolve(response);
					}).catch((response) => {
							reject(response);
					});
			});
		},
	}
}
</script>