export interface TableDataSource {
    records: TableRecord[];
    caption?: string;
}

export interface TableRecord {
    data: { [key: string]: string };
    children: TableDataSource[];
}
