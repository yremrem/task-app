import axios from 'axios';
import NProgress from 'nprogress';
import FormErrors from './FormErrors';

class Form {

    /**
     * The list of fields that we will ignore when resetting/getting the data
     *
     * @type {[*]}
     */
    static ignores = [
        'ignore',
        'http',
        'busy',
        'successful',
        'errors',
        'originalData'
    ];

    /**
     * Create a new form object.
     */
    constructor(data, httpClient = axios) {
        $.extend(true, this, data);

        this.http = httpClient;
        this.busy = false;
        this.successful = false;
        this.originalData = data;
        this.errors = new FormErrors();
    }

    /**
     * Get the data payload for the form.
     */
    data() {
        console.log(this);
        return _.omit(JSON.parse(JSON.stringify(this)), this.constructor.ignores);
    }


    /**
     * Set the data original data
     */
    setData(data) {
        $.extend(true, this, data);
        this.originalData = data;
    }

    /**
     * Start processing the form.
     */
    startProcessing() {
        this.errors.clear();

        this.busy = true;
        this.successful = false;
    }

    /**
     * Finish processing the form.
     */
    finishProcessing() {
        this.busy = false;
        this.successful = true;
    }

    /**
     * Finish processing the form with the given errors.
     */
    finishProcessingWithErrors(errors) {
        this.errors.set(errors);
        this.busy = false;
    }

    /**
     * Reset all the form data except the for the given fields
     */
    resetExcept(fields) {
        let toReset = _.keys(_.omit(_.omit(this, this.constructor.ignores), fields));
        this.reset(toReset);
    }

    /**
     * Reset the form or the given fields back to its original state.
     */
    reset(fields) {

        // if no fields was specified, we will reset all data
        if (!fields) {
            $.extend(true, this, this.originalData);
            return;
        }

        // If the fields passed is an array, we will loop through each fields
        // and pass it to this same reset() method as string.
        if (_.isArray(fields)) {
            for (let field of fields) {
                this.reset(field);
            }
            return;
        }

        this[fields] = this.originalData[fields];
    }

    /**
     * Clear the form errors.
     */
    clear() {
        this.errors.clear();
        this.successful = false
    }

    /**
     * Check if the current form has any error
     *
     * @return bool
     */
    hasError() {
        return this.errors.any();
    }

    /**
     * Helper method for making POST HTTP requests.
     */
    post(uri) {
        return this.send('post', uri);
    }

    /**
     * Helper method for making PUT HTTP requests.
     */
    put(uri) {
        return this.send('put', uri);
    }

    /**
     * Helper method for making DELETE HTTP requests.
     */
    patch(uri) {
        return this.send('patch', uri);
    }

    /**
     * Helper method for making DELETE HTTP requests.
     */
    delete(uri) {
        return this.send('delete', uri);
    }

    /**
     * Send the form to the back-end server.
     */
    send(method, uri) {
        return new Promise((resolve, reject) => {
            this.startProcessing();
            NProgress.start();

            this.http[method](uri, this.data())
                .then(response => {
                    this.finishProcessing();
                    NProgress.done();
                    resolve(response);
                })
                .catch(errors => {
                    this.finishProcessingWithErrors(errors.response.data);
                    NProgress.done();
                    reject(errors);
                });
        });
    }

}

export default Form