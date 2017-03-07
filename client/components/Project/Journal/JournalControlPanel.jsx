import React from 'react';
import './JournalControlPanel.less';

const JournalControlPanel = React.createClass({
    render() {
        return (
            <div className="journal-control-panel">
                 <input type="button" className="button right" value="Create" 
                        onClick={ this.props.onCreateRecordClick } />
            </div>
        );
    }
});

export default JournalControlPanel;