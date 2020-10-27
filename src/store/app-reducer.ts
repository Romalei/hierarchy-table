import { DataRecord } from '../models/data-record';
import { AppActions, LOAD_RECORDS, REMOVE_RECORD } from './app-actions';

export interface AppState {
    records: DataRecord[];
}

const initialState: AppState = {
    records: [],
};

const _removeRecordRecursive = (records: DataRecord[], deleteId: string): DataRecord[] => {
    return records.reduce((acc, record) => {
        if (record.id === deleteId) {
            return acc;
        }

        const entries = Object.entries(record.kids);
        for (const [key, { records }] of entries) {
            record.kids[key].records = _removeRecordRecursive(records, deleteId);

            if (record.kids[key].records.length === 0) {
                delete record.kids[key];
            }
        }

        acc.push(record);

        return acc;
    }, [] as DataRecord[]);
};
const _removeRecord = (state: AppState, recordId: string): AppState => ({
    ...state,
    records: _removeRecordRecursive(state.records, recordId),
});

export function appReducer(state: AppState = initialState, action: AppActions): AppState {
    switch (action.type) {
        case LOAD_RECORDS:
            return {
                ...state,
                records: action.records,
            };
        case REMOVE_RECORD:
            return _removeRecord(state, action.recordId);
    }

    return state;
}
