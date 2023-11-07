import axios from 'axios';

class Model {
    static URI = '';

    /**
     * Get all of the models from the api
     *
     * @param params
     * @returns {Promise}
     */
    static all(params = {}) {
        return new Promise((resolve, reject) => {
            axios.get(this.URI, {
                params: params
            }).then(({data}) => {
                resolve(data.data);
            }).catch((response) => {
                reject(response);
            });
        })
    }

    /**
     * Find the model by the specified ID
     *
     * @param id
     * @param params
     * @returns {Promise}
     */
    static find(id, params = {}) {
        return new Promise((resolve, reject) => {
            axios.get(this.set(id), {
                params: params
            }).then(({data}) => {
                resolve(data);
            }).catch((response) => {
                reject(response);
            });
        });
    }

    /**
     * Set the given ID to the api URI
     *
     * @param id
     * @returns {string}
     */
    static set(id) {
        return `${this.URI}/${id}`;
    }

}

export default Model