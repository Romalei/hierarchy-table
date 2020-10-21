import React from 'react';
import './App.scss';
import TreeViewTable from "./libs/tree-view-table/TreeViewTable";
import { RECORDS } from './data/records';

class App extends React.Component<any, any> {
    render() {
        return (
            <div className="app">
                <TreeViewTable records={RECORDS}/>
            </div>
        );
    }
}

export default App;
