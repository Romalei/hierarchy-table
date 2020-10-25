import './JsonTableRow.scss';
import React from 'react';
import { JsonTableRowProps } from './models/json-table-row-props';
import { JsonTable } from './JsonTable';
import { JsonTableDataSource } from './models/json-table-record';

class JsonTableRow extends React.Component<JsonTableRowProps, { expanded: boolean }> {
    constructor(props: JsonTableRowProps) {
        super(props);

        this.setState({ expanded: false });
    }

    isExpanded(): boolean {
        return !!this.state?.expanded;
    }

    render() {
        return (
            <>
                <tr className="json-table__row">
                    <td className="json-table__cell">
                        {this.hasNestedTables() && (
                            <button className="btn btn-outline-primary" onClick={() => this.toggle()}>
                                <svg width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <path className={this.isExpanded() ? 'json-table-expansion-button-rotated' : ''}
                                          d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/>
                                </svg>
                            </button>
                        )}
                    </td>

                    {this.getColumnValues().map((value, index) => (
                        <td key={index} className="json-table__cell">{value}</td>
                    ))}
                </tr>

                {
                    this.isExpanded() &&
                    this.getChildrenTables().map((dataSource, index) => (
                        <tr key={index} className="json-table__row">
                            <td colSpan={this.getColumnCount()} className="json-table__cell">
                                <JsonTable dataSource={dataSource}/>
                            </td>
                        </tr>
                    ))
                }
            </>
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

    hasNestedTables(): boolean {
        return !!this.props.record.children?.length;
    }

    private getChildrenTables(): JsonTableDataSource[] {
        return this.props.record.children;
    }

    private getColumnCount(): number {
        return Object.keys(this.props.record.data).length + 1;
    }

    private getColumnValues(): any[] {
        return Object.values(this.props.record.data);
    }
}

export default JsonTableRow;
