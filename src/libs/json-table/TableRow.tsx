import React from 'react';
import { TableRowProps } from './models/table-row-props';
import { TableCell } from './TableCell';

class TableRow extends React.Component<TableRowProps, { expanded: boolean }> {
    constructor(props: any) {
        super(props);

        this.state = { expanded: false };
    }

    isExpanded(): boolean {
        return !!this.state?.expanded;
    }

    render() {
        const { nestedTables, nestedTableRender } = this.props;
        const children = (this.props.children as React.ReactElement[][]).flat();
        const columnCount = children.length + 1;

        return (
            <React.Fragment>
                <tr
                    onClick={() => this.toggle()}
                    className={`h-table__row${this.hasNestedTables() ? ' h-table__row_expandable' : ''}`}
                >
                    <TableCell width="1%">
                        {this.hasNestedTables() && (<button className="btn btn-primary">T</button>)}
                    </TableCell>
                    {children}
                </tr>
                {this.isExpanded() && nestedTableRender != null && (
                    nestedTables?.map((dataSource, index) => (
                        <tr key={index} className="h-table__row">
                            <TableCell colSpan={columnCount}>{nestedTableRender(dataSource)}</TableCell>
                        </tr>
                    ))
                )}
            </React.Fragment>
        );
    }

    toggle(): void {
        this.isExpanded() ? this.collapse() : this.expand();
    }

    expand(): void {
        this.setState((state) => ({
            ...state,
            expanded: true,
        }));
    }

    collapse(): void {
        this.setState((state) => ({
            ...state,
            expanded: false,
        }))
    }

    private hasNestedTables(): boolean {
        return !!this.props.nestedTables?.length;
    }
}

export default TableRow;
