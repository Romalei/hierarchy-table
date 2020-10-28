import React from 'react';
import {
    Table,
    TableCell,
    TableColumnHeader,
    TableDataSource,
    TableRecord,
    TableRow,
} from '../../shared/components/table';
import { DataRecordsMapper } from './data-records-mapper';
import { connect } from 'react-redux';
import { AppState } from '../../store/app-reducer';
import { bindActionCreators, Dispatch } from 'redux';
import { loadRecords, removeRecord } from '../../store/app-actions';
import { DataRecord } from '../../models';

const trashIcon = (
    <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-trash"
         fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path
            d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
        <path fillRule="evenodd"
              d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
    </svg>
);

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

    private isEmptyTable(): boolean {
        return this.props.records.length === 0;
    }

    private createDataSource(): TableDataSource {
        return new DataRecordsMapper(this.props.records).toTableDataSource();
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
                            <button
                                aria-label="Delete record"
                                title="Delete record"
                                onClick={() => this.deleteRecord(row)}
                                className="btn btn-danger"
                            >{trashIcon}</button>
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
