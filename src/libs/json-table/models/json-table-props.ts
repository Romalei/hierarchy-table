import { JsonTableDataSource } from './json-table-record';

export interface JsonTableProps {
    dataSource: JsonTableDataSource;
    nested?: boolean;
}
