import { TableDataSource, TableRecord } from './table-record';

export interface TableProps {
    dataSource: TableDataSource;

    rowRender(row: TableRecord, index: number): JSX.Element;
}
