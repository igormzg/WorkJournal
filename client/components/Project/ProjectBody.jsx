import React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

import NotesTab from './Notes/NotesTab.jsx'
import JournalTab from './Journal/JournalTab.jsx';

const ProjectBody = React.createClass({
    render() {
        return (
            <div>                
                <Tabs onSelect={this.handleSelect} selectedIndex={0}>
                    <TabList>
                        <Tab>Notes</Tab>
                        <Tab>Journal</Tab>
                    </TabList>
                    <TabPanel>
                        <NotesTab />
                    </TabPanel>
                    <TabPanel>
                        <JournalTab />
                    </TabPanel>
                </Tabs>
            </div>
        )
    }
})

export default ProjectBody;