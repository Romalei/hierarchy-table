import React from 'react';
import './App.scss';
import { DATA_RECORDS } from './data/data-records.const';
import { JsonTable } from './libs/json-table/JsonTable';
import { DataRecord } from './models/data-record';
import { JsonTableDataSource } from './libs/json-table/models/json-table-record';
import { DataRecordsMapper } from './mappers/data-records-mapper';

class App extends React.Component<any, any> {
    private readonly dataSource: JsonTableDataSource;

    constructor(props: any) {
        super(props);

        this.dataSource = this.mapRecords(DATA_RECORDS);
    }

    render() {
        return (
            <div className="app">
                <JsonTable dataSource={this.dataSource}/>
            </div>
        );
    }

    private mapRecords(records: DataRecord[]): JsonTableDataSource {
        const mapper = new DataRecordsMapper(records);

        return mapper.toJsonTableDataSource();
    }
}

export default App;
