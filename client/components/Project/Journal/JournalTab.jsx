import React from 'react';

import JournalControlPanel from './JournalControlPanel.jsx';
import JournalAddRecord from './JournalAddRecord.jsx';
import JournalGrid from './JournalGrid.jsx';

const JournalTab = React.createClass({
    getInitialState() {
        return {
            isCreateControl: false
        };
    },

    handleCreateRecordClick () {
        this.setState({
            isCreateControl: !this.state.isCreateControl
        });
    },

    onCreateRecordCallback () {
        this.setState({ isCreateControl: false });
    },

    render() {
        var partial = null;
        if(this.state.isCreateControl)
        {
            partial = (
                <div>
                    <div className='row margin-0'>
                        <JournalAddRecord createCallback={this.onCreateRecordCallback} />
                    </div>
                    <hr className="short" />
                </div>
            );
            
        }  
        return (
            <div>
                <div className='row margin-0'>
                    <JournalControlPanel onCreateRecordClick={this.handleCreateRecordClick} />
                </div>
                <hr className="short"/>
                { partial }   
                 <div className='row margin-0'>
                     <JournalGrid />
                </div>
            </div>
        );
    }
});

export default JournalTab;