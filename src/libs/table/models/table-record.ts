export interface TableDataSource {
    records: TableRecord[];
    caption?: string;
}

export interface TableRecord {
    id: string;
    data: { [key: string]: string };
    children: TableDataSource[];
}
