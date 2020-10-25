import React from 'react';
import { JsonTableRowProps } from './models/json-table-row-props';
import { JsonTable } from './JsonTable';
import { getValidChildren } from './helpers/get-valid-children';

class JsonTableRow extends React.Component<JsonTableRowProps, any> {
    private readonly parentRowRef: React.RefObject<HTMLTableRowElement>
    private expanded: boolean = true;

    constructor(props: JsonTableRowProps) {
        super(props);

        this.parentRowRef = React.createRef();
    }

    private getColumnCount(): number {
        return getValidChildren(this.props.children).length;
    }

    isExpanded(): boolean {
        return this.expanded;
    }

    render() {
        return (
            <>
                <tr ref={this.parentRowRef} className="json-table__row">{this.props.children}</tr>

                {
                    this.isExpanded() &&
                    this.props.nestedTables?.map((dataSource, index) => (
                        <JsonTableRow nested={true} key={index}>
                            <td colSpan={this.getColumnCount()} className="json-table__cell">
                                <JsonTable dataSource={dataSource}/>
                            </td>
                        </JsonTableRow>
                    ))
                }
            </>
        );
    }
}

export default JsonTableRow;
