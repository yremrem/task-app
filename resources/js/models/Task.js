import axios from "axios";
import Model from "./Model";

class Task extends Model {
    static URI = '/tasks';

    static list() {
        return new Promise((resolve, reject) => {
            axios.get(URI).then((response) => {
                console.log("response",response)
                resolve(response);
            }).catch((response) => {
                reject(response);
            });
        });
    }
}

export default Task