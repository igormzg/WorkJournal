import React from 'react';

import Store from '../../../stores/NotesStore';
import JournalActions from '../../../actions/JournalActions';

const JournalGrid = React.createClass({
    getInitialState() {
        return {
            journal: []
        };
    },

    componentWillMount() {
        let currentProject = Store.ProjectStore.getCurrentProject();
        if(currentProject){
            JournalActions.loadJournal(currentProject._id);
        }
    },

    componentDidMount() { 
        Store.JournalStore.addLoadListener(this._onJournalChange);
    },

    componentWillUnmount() {
        Store.JournalStore.removeLoadListener(this._onJournalChange);
    },

    _onJournalChange(project) {
        this.setState({ 
            journal: Store.JournalStore.getJournal() 
        });
    },

    _onProjectsChange() {        
        this.setState({
                projects: Store.ProjectStore.getProjects(),
                currentProject: Store.ProjectStore.getCurrentProject() 
            });
    },

    render() {
        return (
            <div>
                {
                this.state.journal.map(row =>
                    <div className="row">
                        <label>{row.task}</label>
                    </div>)
                }
            </div>
        );
    }
});

export default JournalGrid;