import { JsonTableDataSource } from './json-table-record';

export interface JsonTableRowProps {
    nestedTables?: JsonTableDataSource[];
    nested?: boolean;
}
