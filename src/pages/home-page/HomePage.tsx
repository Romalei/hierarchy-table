import React from 'react';
import { Table, TableCell, TableColumnHeader, TableDataSource, TableRecord } from '../../shared/components/table';
import TableRow from '../../shared/components/table/TableRow';
import { DataRecordsMapper } from './data-records-mapper';
import { connect } from 'react-redux';
import { AppState } from '../../store/app-reducer';
import { bindActionCreators, Dispatch } from 'redux';
import { loadRecords, removeRecord } from '../../store/app-actions';
import { DataRecord } from '../../models';

export interface HomePageProps {
    records: DataRecord[]

    loadRecords(): void;

    removeRecord(recordId: string): void;
}

class HomePage extends React.Component<HomePageProps, any> {
    componentDidMount() {
        this.props.loadRecords();
    }

    render() {
        if (this.isEmptyTable()) {
            return <p>Table is empty</p>;
        }

        const dataSource: TableDataSource = this.createDataSource();

        return <div>{this.table(dataSource)}</div>;
    }

    private createDataSource(): TableDataSource {
        return new DataRecordsMapper(this.props.records).toTableDataSource();
    }

    private isEmptyTable(): boolean {
        return this.props.records.length === 0;
    }

    private table(dataSource: TableDataSource): JSX.Element {
        const columnNames = Object.keys(dataSource.records[0].data);
        const additionalColumns = ['delete'];

        return (
            <Table
                dataSource={dataSource}
                rowRender={(row, index) => (
                    <TableRow
                        key={index}
                        nestedTables={row.children}
                        nestedTableRender={nestedTable => this.table(nestedTable)}
                    >
                        {columnNames.map(key => <TableCell key={key}>{row.data[key]}</TableCell>)}

                        <TableCell width="1%">
                            <button onClick={() => this.deleteRecord(row)} className="btn btn-danger">D</button>
                        </TableCell>
                    </TableRow>
                )}
            >
                {columnNames.map(colKey => <TableColumnHeader key={colKey}>{colKey}</TableColumnHeader>)}
                {additionalColumns.map(colKey => <TableColumnHeader key={colKey}/>)}
            </Table>
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
export default connect(putStateToProps, putActionsToProps)(HomePage);
