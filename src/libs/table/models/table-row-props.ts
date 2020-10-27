import { TableDataSource } from './table-record';

export interface TableRowProps {
    nestedTables?: TableDataSource[];
    nestedTableRender?: (dataSource: TableDataSource) => JSX.Element;
}
