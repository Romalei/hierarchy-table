import React from 'react';
import { TreeViewTableRowProps } from "./models/tree-view-table-row-props";

class TreeViewTableRow extends React.Component<TreeViewTableRowProps, any> {
    render() {
        return (
            <tr className="tree-view-table-row">
                {this.columns().map((value, index) => <td key={index}>{value}</td>)}
            </tr>
        );
    }

    private columns(): string[] {
        return Object.values(this.props.record.data);
    }
}

export default TreeViewTableRow;
