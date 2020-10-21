export interface TreeViewRecordKids {
    [key: string]: {
        records: TreeViewRecord[]
    };
}

export interface TreeViewRecord {
    data: { [key: string]: string };
    kids: TreeViewRecordKids;
}
