export default {
    fields: [
        {
            name: 'title',
            sortField: 'title',
        },
        {
            name: 'description',
            sortField: 'description'
        },
        {
            title: 'Created at',
            name: 'created_at',
            sortField: 'created_at',
            callback: 'formatDate'
        },
        {
            title: 'Updated at',
            name: 'updated_at',
            sortField: 'updated_at',
            callback: 'formatDate'
        },
        {
            name: '__component:task-status-toggler',
            title: 'Status',
            sortField: 'status',
            titleClass: 'text-center',
            dataClass: 'text-center'
        },
        {
            name: '__component:task-actions',
            title: 'Actions',
            titleClass: 'text-right width-175',
            dataClass: 'text-right'
        }
    ]
}