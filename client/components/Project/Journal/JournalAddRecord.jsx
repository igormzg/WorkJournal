import React from 'react';

import Switch from '../../Controls/Switch.jsx';
import Store from '../../../stores/NotesStore';
import JournalActions from '../../../actions/JournalActions';
import { DateField, DatePicker } from 'react-date-picker';
import './JournalAddRecord.less';


const JournalAddRecord = React.createClass({
    getInitialState() {
        return {
            task: null,
            comment: null,
            time: "00:00",
            date: new Date,
            isBTSPosted: false,
            isPLPosted: false
        };
    },

    handleIsPLClick: function (state) {
        this.setState({ isBTSPosted: state });
    },

    handleIsBTSClick: function (state) {
        this.setState({ isPLPosted: state });
    },

    handleTaskNameChange: function (event) {
        this.setState({ task: event.target.value });
    },

    handleCommentChange: function (event) {
        this.setState({ comment: event.target.value });
    },

    handleDateChange: function (event) {
        this.setState({ date: event.target.value });
    },

    handleTimeChange: function (event) {
        this.setState({ time: event.target.value });
    },

    handleAddRecordClick () {
        let currentProject = Store.ProjectStore.getCurrentProject();
        let journalRecord = {
            task: this.state.task,
            comment: this.state.comment,
            time: this.state.time,
            date:this.state.date,
            isBTSPosted: this.state.isBTSPosted,
            isPLPosted: this.state.isPLPosted
        }
        JournalActions.createJournalRecord(journalRecord , currentProject._id);
        this.props.createCallback();
    },

    render() {
        return (
            <div className="add-record-panel">
                <div className="column medium-4">
                    <div className="row margin-0">
                        <div className="column medium-12">
                            <label>Task</label>
                            <input type="text" onChange={this.handleTaskNameChange} />
                        </div> 
                    </div>         
                    <div className="row margin-0">
                        <div className="column medium-6">                    
                            <label>Date</label>
                            <DateField
                                dateFormat="YYYY-MM-DD"
                                forceValidDate={true}
                                updateOnDateClick={true}
                                collapseOnDateClick={true}
                                defaultValue={new Date}
                                onChange={this.handleDateChange}
                                >
                                <DatePicker
                                    navigation={true}
                                    locale="en"
                                    forceValidDate={true}
                                    highlightWeekends={true}
                                    highlightToday={true}
                                    weekNumbers={false}
                                    weekStartDay={1}
                                    weekDayNames={false}
                                />
                            </DateField>
                        </div>  
                        <div className="column medium-6">          
                            <label>Time</label>
                            <input type="time" value={this.state.time} onChange={this.handleTimeChange}/>
                        </div>
                    </div>
                </div>
                <div className="column medium-6">
                    <label>Comment</label>
                    <textarea className="none-resize comment-field" onChange={this.handleCommentChange} />   
                </div>
                <div className="column medium-1">
                    <div className="row marging-0">
                        <label>BTS</label>
                        <Switch onToggle={this.handleIsBTSClick} activeText="yes" inactiveText="no" />
                    </div>
                    <div className="row marging-0">
                        <label>PL</label>
                        <Switch onToggle={this.handleIsPLClick} activeText="yes" inactiveText="no" />
                    </div>
                </div>
                <div className="column medium-1">
                    <input type="button" className="button width-full add-button" value="Add" onClick={this.handleAddRecordClick}/>
                </div>
            </div>
        );
    }
});

export default JournalAddRecord;