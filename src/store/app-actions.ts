import { DATA_RECORDS } from '../__data/data-records.const';
import { DataRecord } from '../models';

// action types
export const LOAD_RECORDS = 'LOAD_RECORDS';
export const REMOVE_RECORD = 'REMOVE_RECORD';

// interfaces
interface RemoveRecordAction {
    type: typeof REMOVE_RECORD;
    recordId: string;
}

interface LoadRecordsAction {
    type: typeof LOAD_RECORDS;
    records: DataRecord[];
}

// action creators

// in reality this one would be asynchronous and would not return an object with hardcoded records
export const loadRecords = (): LoadRecordsAction => ({
    type: LOAD_RECORDS,
    records: DATA_RECORDS,
})

export const removeRecord = (recordId: string): RemoveRecordAction => ({
    type: REMOVE_RECORD,
    recordId,
});

export type AppActions =
    RemoveRecordAction
    | LoadRecordsAction;
