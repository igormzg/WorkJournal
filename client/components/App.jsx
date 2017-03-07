import React from 'react';

import ProjectContainer from './Project/ProjectContainer.jsx';

import './App.less';

const App = React.createClass({
    render() {
        return (
            <div className='App'>
                <h2 className='App__header'>Projects App</h2>
                <ProjectContainer />
            </div>
        );
    },
});

export default App;
