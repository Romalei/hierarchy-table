import { DataRecord, DataRecordKids } from '../../models/data-record';
import { TableDataSource, TableRecord } from '../../libs/table';

export class DataRecordsMapper {
    constructor(
        private readonly records: DataRecord[],
    ) {}

    toTableDataSource(caption?: string): TableDataSource {
        const result: TableDataSource = { caption, records: [] };

        this.records.forEach(({ data: row, kids, id }) => {
            const rec: TableRecord = {
                id,
                data: row,
                children: this.dataSourcesFromKids(kids),
            };

            result.records.push(rec);
        });

        return result;
    }

    private dataSourcesFromKids(kids: DataRecordKids): TableDataSource[] {
        const dataSources: TableDataSource[] = [];
        const keys = Object.keys(kids);

        keys.forEach(key => {
            const mapper = new DataRecordsMapper(kids[key].records);

            dataSources.push(mapper.toTableDataSource(key));
        });

        return dataSources;
    }
}
