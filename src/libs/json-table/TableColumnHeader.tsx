import React from 'react';

export class TableColumnHeader extends React.Component<any, any> {
    render() {
        return (
            <th className="h-table__cell h-table__cell_heading">{this.props.children}</th>
        );
    }
}
