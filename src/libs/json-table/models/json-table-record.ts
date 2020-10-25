export interface JsonTableDataSource<T = any> {
    records: JsonTableRecord<T>[];
    caption?: string;
}

export interface JsonTableRecord<T = any> {
    data: T;
    children: JsonTableDataSource<T>[];
}
