export interface DataRecordKids {
    [key: string]: {
        records: DataRecord[]
    };
}

export interface DataRecord {
    id: string;
    data: { [key: string]: string };
    kids: DataRecordKids;
}
