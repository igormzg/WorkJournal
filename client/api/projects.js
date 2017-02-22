import axios from 'axios';

import { apiPrefix } from '../../etc/config.json';

export default {    
    getProjects() {
        return axios.get(`${apiPrefix}/projects`);
    },

    createProject(data) {
        return axios.post(`${apiPrefix}/project`, data);
    }
}