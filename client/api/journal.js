import axios from 'axios';

import { apiPrefix } from '../../etc/config.json';

export default {    
    getJournal(projectId) {
        return axios.get(`${apiPrefix}/journal?projectId=${projectId}`);
    },

    createJournalRecord(journalRecord, projectId) {
        var data = Object.assign({}, journalRecord);
        data.projectId = projectId;
        return axios.put(`${apiPrefix}/journal`, data);
    },

    deleteJournalRecord(projectId) {
        return axios.delete(`${apiPrefix}/journal/${projectId}`);
    },

    updateJournalRecord(data) {
        return axios.post(`${apiPrefix}/journal`, data);
    }
}