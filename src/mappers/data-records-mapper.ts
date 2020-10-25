import { DataRecord, DataRecordKids } from '../models/data-record';
import { JsonTableDataSource, JsonTableRecord } from '../libs/json-table/models/json-table-record';

export class DataRecordsMapper {
    constructor(private readonly records: DataRecord[]) {}

    toJsonTableDataSource(caption?: string): JsonTableDataSource {
        const result: JsonTableDataSource = { caption, records: [] };

        this.records.forEach(({ data: row, kids }) => {
            const rec: JsonTableRecord = {
                data: row,
                children: this.dataSourcesFromKids(kids),
            };

            result.records.push(rec);
        });

        return result;
    }

    private dataSourcesFromKids(kids: DataRecordKids): JsonTableDataSource[] {
        const dataSources: JsonTableDataSource[] = [];
        const keys = Object.keys(kids);

        keys.forEach(key => {
            const mapper = new DataRecordsMapper(kids[key].records);

            dataSources.push(mapper.toJsonTableDataSource(key));
        });

        return dataSources;
    }
}
