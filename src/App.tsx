import React from 'react';
import './App.scss';
import { TableDataSource, TableRecord, Table, TableCell, TableColumnHeader } from './libs/table';
import { DataRecordsMapper } from './mappers/data-records-mapper';
import TableRow from './libs/table/TableRow';
import { connect } from 'react-redux';
import { AppState } from './store/root-reducer';
import { bindActionCreators, Dispatch } from 'redux';
import { loadRecords, removeRecord } from './store/actions';

export interface AppProps {
    dataSource: TableDataSource;

    removeRecord(recordId: string): void;

    loadRecords(): void;
}

class App extends React.Component<AppProps, { dataSource: TableDataSource }> {
    componentDidMount() {
        this.props.loadRecords();
    }

    render() {
        const { dataSource } = this.props;

        return (
            <div className="app">
                {this.hasRecords() ? this.table(dataSource) : <p>Table is empty</p>}
            </div>
        );
    }

    private hasRecords(): boolean {
        return this.props.dataSource.records.length > 0;
    }

    private table(dataSource: TableDataSource): JSX.Element {
        const columns = Object.keys(dataSource.records[0].data);
        const toolColumns = ['_delete'];

        return (
            <Table
                dataSource={dataSource}
                rowRender={(row, index) => (
                    <TableRow
                        key={index}
                        nestedTables={row.children}
                        nestedTableRender={dataSource => this.table(dataSource)}
                    >
                        {columns.map(key => <TableCell key={key}>{row.data[key]}</TableCell>)}

                        <TableCell width="1%">
                            <button onClick={() => this.deleteRecord(row)} className="btn btn-danger">D</button>
                        </TableCell>
                    </TableRow>
                )}
            >
                {columns.map(colKey => <TableColumnHeader key={colKey}>{colKey}</TableColumnHeader>)}
                {toolColumns.map(colKey => <TableColumnHeader key={colKey}/>)}
            </Table>
        );
    }

    private deleteRecord(record: TableRecord): void {
        this.props.removeRecord(record.id);
    }
}

const putStateToProps = (state: AppState) => ({
    dataSource: new DataRecordsMapper(state.records).toTableDataSource(),
});

const putActionsToProps = (dispatch: Dispatch) => ({
    removeRecord: bindActionCreators(removeRecord, dispatch),
    loadRecords: bindActionCreators(loadRecords, dispatch),
})

export default connect(putStateToProps, putActionsToProps)(App);
