import React from 'react';
import { TableCell } from './TableCell';

export class TableHeadCell extends TableCell {
    render() {
        return (
            <td
                style={{ width: this.props.width }}
                colSpan={this.props.colSpan ?? 1}
                className="h-table__cell h-table__cell_heading"
            >{this.props.children}</td>
        );
    }
}
