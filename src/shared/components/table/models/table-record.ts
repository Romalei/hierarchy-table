export interface TableDataSource {
    /** Table's rows */
    records: TableRecord[];

    /** Table's caption */
    caption?: string;
}

export interface TableRecord {
    /** Unique identifier of the record */
    id: string;

    /** The record's data */
    data: { [key: string]: string };

    /** Nested tables */
    children: TableDataSource[];
}
