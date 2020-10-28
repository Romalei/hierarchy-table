import React from 'react';
import './Table.scss';
import { TableRecord } from './models/table-record';
import { TableProps } from './models/table-props';
import { TableHeadCell } from './TableHeadCell';

export class Table extends React.Component<TableProps, any> {
    render() {
        return (
            <div className="h-table-container">
                {this.caption && (<div className="h-table-caption">{this.caption}</div>)}

                <table
                    className="h-table"
                    cellSpacing="0"
                    cellPadding="0"
                >
                    <thead>
                    <tr className="h-table__row">
                        <TableHeadCell width="1%"/>
                        {this.props.children}
                    </tr>
                    </thead>
                    <tbody>
                    {this.records.map((record, index) => this.props.rowRender(record, index))}
                    </tbody>
                </table>
            </div>
        );
    }

    private get records(): TableRecord[] {
        return this.props.dataSource.records;
    }

    private get caption(): string | undefined {
        return this.props.dataSource.caption;
    }
}
