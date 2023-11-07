import Vue from 'vue';

class Filter {

    /**
     * Create a new filter object.
     */
    constructor(filters) {
        $.extend(true, this, filters);

        this.originalFilters = filters;
        this.table = null;
    }


    /**
     * Get the filters payload.
     */
    data() {
        return _.omit(JSON.parse(JSON.stringify(this)), [
            'originalFilters'
        ]);
    }

    /**
     * Clear one or all of the filter currently in the this.filters object
     */
    reset(filter) {
        if (filter) {
            this[filter] = this.originalFilters[filter];

            return;
        }

        // Reset all the filters except the search key
        $.extend(true, this, _.omit(this.originalFilters, ['search']));
    }

    /**
     * set the given key/value filter
     */
    set(key, value) {
        this[key] = value;
    }

    /**
     * Get the selected filter from collection
     */
    getLabel(filter, collection, value, label = 'label', emptyLabel = 'All') {
        let obj = _.find(collection, [value, this[filter]]);

        if (!obj) {
            return emptyLabel;
        }

        return obj[label];
    }

}

export default Filter