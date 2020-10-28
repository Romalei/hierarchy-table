import React from 'react';
import { TableCell } from './TableCell';

export class TableColumnHeader extends TableCell {
    render() {
        return (
            <th
                style={{ width: this.props.width }}
                colSpan={this.props.colSpan ?? 1}
                className="h-table__cell h-table__cell_heading"
            >{this.props.children}</th>
        );
    }
}
