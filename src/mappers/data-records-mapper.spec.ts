import { DataRecordsMapper } from './data-records-mapper';
import { DataRecord } from '../models/data-record';
import { JsonTableDataSource } from '../libs/json-table/models/json-table-record';

describe('DataRecordsMapper', () => {
    let sut: DataRecordsMapper | null;

    afterEach(() => {
        sut = null;
    })

    describe('toJsonTableDataSource()', () => {
        it('should return data records', () => {
            const dataRecords: DataRecord[] = [
                {
                    data: {
                        x: 'x1',
                        y: 'y1',
                    },
                    kids: {
                        has_relatives: {
                            records: [
                                {
                                    data: {
                                        a: 'a1',
                                        b: 'b1',
                                    },
                                    kids: {
                                        has_phone: {
                                            records: [
                                                {
                                                    data: {
                                                        q: 'q1',
                                                        w: 'w1',
                                                    },
                                                    kids: {},
                                                },
                                            ],
                                        },
                                    },
                                },
                            ],
                        },
                    },
                },
                {
                    data: {
                        x: 'x2',
                        y: 'y2',
                    },
                    kids: {},
                },
            ];
            const expectedResult: JsonTableDataSource = {
                records: [
                    {
                        data: {
                            x: 'x1',
                            y: 'y1',
                        },
                        children: [
                            {
                                caption: 'has_relatives',
                                records: [
                                    {
                                        data: {
                                            a: 'a1',
                                            b: 'b1',
                                        },
                                        children: [
                                            {
                                                caption: 'has_phone',
                                                records: [
                                                    {
                                                        data: {
                                                            q: 'q1',
                                                            w: 'w1',
                                                        },
                                                        children: [],
                                                    },
                                                ],
                                            },
                                        ],
                                    },
                                ],
                            },
                        ],
                    },
                    {
                        data: {
                            x: 'x2',
                            y: 'y2',
                        },
                        children: [],
                    },
                ],
            };
            sut = new DataRecordsMapper(dataRecords);

            const actualResult = sut.toJsonTableDataSource();

            expect(actualResult).toEqual(expectedResult);
        });
    });
});
