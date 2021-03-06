import React from 'react';
import { TableRowProps } from './models/table-row-props';
import { TableCell } from './TableCell';
import { arrowDown, arrowRight } from './icons';

export class TableRow extends React.Component<TableRowProps, { expanded: boolean }> {
    constructor(props: any) {
        super(props);

        this.state = { expanded: false };

        this.toggle = this.toggle.bind(this);
        this.expand = this.expand.bind(this);
        this.collapse = this.collapse.bind(this);
    }

    isExpanded(): boolean {
        return !!this.state?.expanded;
    }

    render() {
        const { nestedTables, nestedTableRender } = this.props;

        // This line looks terrible but unfortunately, due to not having a lot of experience with React, I did such a trick.
        // There should definitely be a better way to grab all children as a single array.
        const children = (this.props.children as React.ReactElement[][]).flat();
        const columnCount = children.length + 1;

        return (
            <React.Fragment>
                <tr className={`h-table__row${this.hasNestedTables() ? ' h-table__row_expandable' : ''}`}>
                    <TableCell width="1%">{
                        this.hasNestedTables() && (
                            <button
                                aria-label={this.expansionTooltip}
                                title={this.expansionTooltip}
                                onClick={this.toggle}
                                className="btn"
                            >{this.expansionIcon}</button>
                        )
                    }</TableCell>
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

    private get expansionTooltip(): string {
        return this.isExpanded() ? 'Collapse row' : 'Expand row'
    }

    private get expansionIcon(): JSX.Element {
        return this.isExpanded() ? arrowDown : arrowRight;
    }
}
