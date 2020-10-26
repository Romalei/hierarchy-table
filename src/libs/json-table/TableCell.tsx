import React from 'react';

export class TableCell extends React.Component<{ colSpan?: number, width?: string }, any> {
    render() {
        return (
            <td
                style={{ width: this.props.width }}
                colSpan={this.props.colSpan ?? 1}
                className="h-table__cell"
            >{this.props.children}</td>
        );
    }
}
