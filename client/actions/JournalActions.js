import AppDispatcher from '../dispatcher/AppDispatcher';
import Constants from '../constants/AppConstants';

import api from '../api';

const JournalActions = {
    loadJournal (projectId) {
        api.journal.getJournal(projectId)
        .then((data) => {
            AppDispatcher.dispatch({
                type: Constants.LOAD_JOURNAL_SUCCESS,
                journal: data.data
            })
        })
        .catch(err =>
            console.error(err)
        );
    },

    createJournalRecord (journalRecord, projectId) {
        api.journal.createJournalRecord(journalRecord, projectId)
        .then(() => {
            this.loadJournal(projectId)
        })
        .catch(err =>
            console.error(err)
        );
    }
};

export default JournalActions;
