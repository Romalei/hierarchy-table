export interface DataRecordKids {
    [key: string]: {
        records: DataRecord[]
    };
}

export interface DataRecord {
    data: { [key: string]: string };
    kids: DataRecordKids;
}
