import { TableDataSource, TableRecord } from './table-record';

export interface TableProps {
    dataSource: TableDataSource;

    /** A callback render function which is called for each row in the table and should return a `<TableRow/>` element */
    rowRender(row: TableRecord, index: number): JSX.Element;
}
