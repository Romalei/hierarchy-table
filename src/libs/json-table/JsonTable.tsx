import React from 'react';
import { JsonTableRecord } from './models/json-table-record';
import { JsonTableProps } from './models/json-table-props';
import JsonTableRow from './JsonTableRow';
import './JsonTable.scss';

export class JsonTable extends React.Component<JsonTableProps, any> {
    render() {
        return (
            <div className="json-table-container">
                {this.caption && (
                    <div className="json-table-caption">
                        {this.caption}
                    </div>
                )}

                <table
                    className="json-table"
                    cellSpacing="0"
                    cellPadding="0"
                >
                    <thead className="json-table__head">
                    {this.renderHeadings()}
                    </thead>
                    <tbody className="json-table__body">
                    {this.renderRows()}
                    </tbody>
                </table>
            </div>
        );
    }

    private renderHeadings(): JSX.Element {
        const columns = Object.keys(this.records[0].data);

        return (
            <tr className="json-table__row json-table__row_heading">
                {
                    columns.map((colName, index) => (
                        <th
                            key={index}
                            className="json-table__cell json-table__cell_heading"
                        >{colName}</th>
                    ))
                }
            </tr>
        )
    }

    private renderRows(): JSX.Element[] {
        return this.records.map((record, index) => {
            const cells = Object.values(record.data);

            return (
                <React.Fragment key={index}>
                    <JsonTableRow
                        key={index}
                        nestedTables={record.children}
                    >
                        {
                            cells.map((value: any, index) => (
                                <td
                                    key={index}
                                    className="json-table__cell"
                                >{value}</td>
                            ))
                        }
                    </JsonTableRow>
                </React.Fragment>
            )
        });
    }

    private get records(): JsonTableRecord[] {
        return this.props.dataSource.records;
    }

    private get caption(): string | undefined {
        return this.props.dataSource.caption;
    }
}
