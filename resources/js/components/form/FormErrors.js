class FormErrors {
    /**
     * Create a new form error container.
     */
    constructor() {
        this.errors = {};
    }

    /**
     * Determine if the collection has any errors.
     */
    any() {
        return !_.isEmpty(this.errors);
    }

    /**
     * Determine if there is an error for the given field.
     *
     * @param  {String} field
     * @return {Boolean}
     */
    has(field) {
        return this.errors.hasOwnProperty(field)
    }

    /**
     * Get all of the raw errors for the collection.
     */
    all() {
        return this.errors;
    }

    /**
     * Get all of the errors for the collection in a flat array.
     */
    flatten(exclude = []) {
        return _.flatten(_.toArray(_.omit(this.errors, exclude)));
    }

    /**
     * Get the first error message for a given field.
     */
    first(field) {
        if (this.has(field)) {
            return this.errors[field][0];
        }
    }

    /**
     * Get all of the messages for a given field.
     */
    get(field) {
        /*console.log("\n\n\n\n", field);
        if(field == 'remarks') {
            console.log(this); alert(2);
        }*/
        if (this.has(field)) {
            const messages = this.errors[field];

            return Array.isArray(messages) ? messages[0] : messages
        }
    }

    /**
     * Set the raw errors for the collection.
     */
    set(errors) {
        if (typeof errors === 'object') {
            this.errors = errors;
        } else {
            this.errors = {'form': ['Something went wrong. Please try again or contact customer support.']};
        }
    }

    /**
     * Clear one or all error fields.
     */
    clear(field) {
        const errors = {}

        if (field) {
            Object.keys(this.errors).forEach(key => {
                if (key !== field) {
                    errors[key] = this.errors[key]
                }
            })
        }

        this.set(errors)
    }
}

export default FormErrors