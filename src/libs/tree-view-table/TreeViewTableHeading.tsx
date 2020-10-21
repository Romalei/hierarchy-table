import React from 'react';
import { TreeViewTableHeadingProps } from "./models/tree-view-table-heading-props";

class TreeViewTableHeading extends React.Component<TreeViewTableHeadingProps, any> {
    render() {
        return (
            <tr className="tree-view-table-row tree-view-table-row_heading">
                {this.props.columns.map((name, index) => <th key={index}>{name}</th>)}
            </tr>
        );
    }
}

export default TreeViewTableHeading;
