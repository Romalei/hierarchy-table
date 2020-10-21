import React from 'react';
import { TreeViewTableProps } from "./models/tree-view-table-props";
import TreeViewTableRow from "./TreeViewTableRow";
import TreeViewTableHeading from "./TreeViewTableHeading";

class TreeViewTable extends React.Component<TreeViewTableProps, any> {
    render() {
        return this.hasRecords() ? this.renderTable() : this.renderError('The table is empty');
    }

    private hasRecords(): boolean {
        return this.props.records?.length > 0;
    }

    private renderTable(): JSX.Element {
        return (
            <table className="tree-view-table">
                <thead className="tree-view-table__heading">
                <TreeViewTableHeading columns={this.columns()}/>
                </thead>
                <tbody className="tree-vew-table__body">
                {this.props.records.map((rec, index) => <TreeViewTableRow key={index} record={rec}/>)}
                </tbody>
            </table>
        );
    }

    private renderError(message: string): JSX.Element {
        return (
            <div className="tree-view-empty-table">{message}</div>
        );
    }

    private columns(): string[] {
        return Object.keys(this.props.records[0].data);
    }
}

export default TreeViewTable;
