import React from 'react';
import './App.scss';
import { TableRecord } from './libs/table';
import { connect } from 'react-redux';
import { AppState } from './store/app-reducer';
import { bindActionCreators, Dispatch } from 'redux';
import { loadRecords, removeRecord } from './store/app-actions';
import { DataRecord } from './models/data-record';
import { DataTable } from './components/DataTable';

interface AppProps {
    records: DataRecord[];

    removeRecord(recordId: string): void;

    loadRecords(): void;
}

class App extends React.Component<AppProps, any> {
    constructor(props: AppProps) {
        super(props);

        this.deleteRecord = this.deleteRecord.bind(this);
    }

    componentDidMount() {
        this.props.loadRecords();
    }

    render() {
        return (
            <div className="app">
                <DataTable
                    records={this.props.records}
                    onDelete={this.deleteRecord}
                />
            </div>
        );
    }

    private deleteRecord(record: TableRecord): void {
        const confirmed = window.confirm('Are you sure want to delete this record?');

        if (confirmed) {
            this.props.removeRecord(record.id);
        }
    }
}

const putStateToProps = (state: AppState) => ({
    records: state.records,
});

const putActionsToProps = (dispatch: Dispatch) => ({
    removeRecord: bindActionCreators(removeRecord, dispatch),
    loadRecords: bindActionCreators(loadRecords, dispatch),
})

export default connect(putStateToProps, putActionsToProps)(App);
