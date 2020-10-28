import { DataRecordsMapper } from './data-records-mapper';
import { TableDataSource } from '../../shared/components/table';
import { DataRecord } from '../../models';

describe('DataRecordsMapper', () => {
    let sut: DataRecordsMapper | null;

    afterEach(() => {
        sut = null;
    })

    describe('toJsonTableDataSource()', () => {
        it('should return data records', () => {
            const dataRecords: DataRecord[] = [
                {
                    id: '1',
                    data: {
                        x: 'x1',
                        y: 'y1',
                    },
                    kids: {
                        has_relatives: {
                            records: [
                                {
                                    id: '2',
                                    data: {
                                        a: 'a1',
                                        b: 'b1',
                                    },
                                    kids: {
                                        has_phone: {
                                            records: [
                                                {
                                                    id: '3',
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
                    id: '4',
                    data: {
                        x: 'x2',
                        y: 'y2',
                    },
                    kids: {},
                },
            ];
            const expectedResult: TableDataSource = {
                records: [
                    {
                        id: '1',
                        data: {
                            x: 'x1',
                            y: 'y1',
                        },
                        children: [
                            {
                                caption: 'has_relatives',
                                records: [
                                    {
                                        id: '2',
                                        data: {
                                            a: 'a1',
                                            b: 'b1',
                                        },
                                        children: [
                                            {
                                                caption: 'has_phone',
                                                records: [
                                                    {
                                                        id: '3',
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
                        id: '4',
                        data: {
                            x: 'x2',
                            y: 'y2',
                        },
                        children: [],
                    },
                ],
            };
            sut = new DataRecordsMapper(dataRecords);

            const actualResult = sut.toTableDataSource();

            expect(actualResult).toEqual(expectedResult);
        });
    });
});
