import React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

import ProjectNotesTab from './ProjectNotesTab.jsx'

const ProjectBody = React.createClass({
    // getInitialState() {

    // },

    // componentWillMount() {

    // },

    // componentDidMount() { 

    // },

    // componentWillUnmount() {
        
    // },

    render() {
        return (
            <div>                
                <Tabs onSelect={this.handleSelect} selectedIndex={0}>
                    <TabList>
                        <Tab>Notes</Tab>
                        <Tab>Journal</Tab>
                    </TabList>
                    <TabPanel>
                        <ProjectNotesTab currentProject={this.props.currentProject} />
                    </TabPanel>
                    <TabPanel>
                        <h2>Hello from Bar</h2>
                    </TabPanel>
                </Tabs>
            </div>
        )
    }
})

export default ProjectBody;