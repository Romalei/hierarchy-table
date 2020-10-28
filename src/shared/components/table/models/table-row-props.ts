import { TableDataSource } from './table-record';

export interface TableRowProps {
    /** Nested tables */
    nestedTables?: TableDataSource[];

    /** A render function which is called for each nested table to be rendered */
    nestedTableRender?: (dataSource: TableDataSource) => JSX.Element;
}
