import React from 'react';
import { JsonTableRecord } from './models/json-table-record';
import { JsonTableProps } from './models/json-table-props';
import JsonTableRow from './JsonTableRow';
import './JsonTable.scss';

export class JsonTable extends React.Component<JsonTableProps, any> {
    render() {
        return (
            <div className="json-table-container">
                {this.caption && (<div className="json-table-caption">{this.caption}</div>)}

                <table
                    className="json-table"
                    cellSpacing="0"
                    cellPadding="0"
                >
                    <thead className="json-table__head">
                    <tr className="json-table__row json-table__row_heading">
                        <th className="json-table__cell json-table__cell_heading"/>

                        {
                            this.getHeadingColumnNames().map((colName, index) => (
                                <th
                                    key={index}
                                    className="json-table__cell json-table__cell_heading"
                                >{colName}</th>
                            ))
                        }
                    </tr>
                    </thead>
                    <tbody className="json-table__body">
                    {
                        this.records.map((record, index) => (
                            <React.Fragment key={index}>
                                <JsonTableRow
                                    key={index}
                                    record={record}
                                />
                            </React.Fragment>
                        ))
                    }
                    </tbody>
                </table>
            </div>
        );
    }

    private getHeadingColumnNames(): string[] {
        return Object.keys(this.records[0].data);
    }

    private get records(): JsonTableRecord[] {
        return this.props.dataSource.records;
    }

    private get caption(): string | undefined {
        return this.props.dataSource.caption;
    }
}
