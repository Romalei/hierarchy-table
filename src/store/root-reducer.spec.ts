import { AppState, rootReducer } from './root-reducer';
import { removeRecord } from './actions';
import { DataRecord } from '../models/data-record';

describe('Root Reducer', () => {
    let state: AppState;

    beforeEach(() => {
        state = {
            records: [
                {
                    id: '1',
                    kids: {
                        key1: {
                            records: [
                                {
                                    id: '2',
                                    data: {},
                                    kids: {},
                                },
                            ],
                        },
                    },
                    data: {},
                },
                {
                    id: '3',
                    kids: {
                        key1: {
                            records: [
                                {
                                    id: '4',
                                    data: {},
                                    kids: {},
                                },
                            ],
                        },
                    },
                    data: {},
                },
            ],
        };
    });

    describe('REMOVE_RECORD', () => {
        it('should remove 1-st level record', () => {
            const id = '1';

            const actualResult: DataRecord[] = rootReducer(state, removeRecord(id)).records;
            const expectedResult: DataRecord[] = [
                {
                    id: '3',
                    kids: {
                        key1: {
                            records: [
                                {
                                    id: '4',
                                    data: {},
                                    kids: {},
                                },
                            ],
                        },
                    },
                    data: {},
                },
            ];

            expect(actualResult).toEqual(expectedResult);
        });

        it('should remove nested record', () => {
            const id = '2';

            const actualResult: DataRecord[] = rootReducer(state, removeRecord(id)).records;
            const expectedResult: DataRecord[] = [
                {
                    id: '1',
                    kids: {},
                    data: {},
                },
                {
                    id: '3',
                    kids: {
                        key1: {
                            records: [
                                {
                                    id: '4',
                                    data: {},
                                    kids: {},
                                },
                            ],
                        },
                    },
                    data: {},
                },
            ];

            expect(actualResult).toEqual(expectedResult);
        });
    });
});
