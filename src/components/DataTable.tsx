import React from 'react';
import { DataRecord } from '../models/data-record';
import { Table, TableCell, TableColumnHeader, TableDataSource, TableRecord } from '../libs/table';
import TableRow from '../libs/table/TableRow';
import { DataRecordsMapper } from '../mappers/data-records-mapper';

export interface DataTableProps {
    records: DataRecord[];

    onDelete(row: TableRecord): void;
}

export class DataTable extends React.Component<DataTableProps, any> {
    render() {
        const dataSource = new DataRecordsMapper(this.props.records).toTableDataSource();

        return (
            <div>
                {this.hasRecords() ? this.table(dataSource) : <p>Table is empty</p>}
            </div>
        )
    }

    private hasRecords(): boolean {
        return this.props.records.length > 0;
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
                        nestedTableRender={nestedTable => this.table(nestedTable)}
                    >
                        {columns.map(key => <TableCell key={key}>{row.data[key]}</TableCell>)}

                        <TableCell width="1%">
                            <button onClick={() => this.props.onDelete(row)} className="btn btn-danger">D</button>
                        </TableCell>
                    </TableRow>
                )}
            >
                {columns.map(colKey => <TableColumnHeader key={colKey}>{colKey}</TableColumnHeader>)}
                {toolColumns.map(colKey => <TableColumnHeader key={colKey}/>)}
            </Table>
        );
    }
}
