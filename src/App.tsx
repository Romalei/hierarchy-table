import React from 'react';
import './App.scss';
import { DATA_RECORDS } from './data/data-records.const';
import { Table } from './libs/json-table/Table';
import { DataRecord } from './models/data-record';
import { TableDataSource, TableRecord } from './libs/json-table/models/table-record';
import { DataRecordsMapper } from './mappers/data-records-mapper';
import { TableColumnHeader } from './libs/json-table/TableColumnHeader';
import TableRow from './libs/json-table/TableRow';
import { TableCell } from './libs/json-table/TableCell';

class App extends React.Component<any, { dataSource: TableDataSource }> {
    constructor(props: any) {
        super(props);

        this.state = {
            dataSource: this.mapRecords(DATA_RECORDS),
        };

        console.log(DATA_RECORDS);
        console.log(this.state);
    }

    render() {
        const { dataSource } = this.state;

        return (
            <div className="app">
                {this.table(dataSource)}
            </div>
        );
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
                            <button onClick={(e) => this.deleteRecord(e, row)} className="btn btn-danger">D</button>
                        </TableCell>
                    </TableRow>
                )}
            >
                {columns.map(colKey => <TableColumnHeader key={colKey}>{colKey}</TableColumnHeader>)}
                {toolColumns.map(colKey => <TableColumnHeader key={colKey}/>)}
            </Table>
        );
    }

    private mapRecords(records: DataRecord[]): TableDataSource {
        const mapper = new DataRecordsMapper(records);

        return mapper.toTableDataSource();
    }

    private deleteRecord(e: React.MouseEvent<HTMLElement>, record: TableRecord): void {
        e.preventDefault();
        e.stopPropagation();
        console.log(record)
    }
}

export default App;
