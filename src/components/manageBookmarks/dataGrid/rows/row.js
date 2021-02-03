import React from 'react';
import { DataTable } from 'react-native-paper';
import PropTypes from 'prop-types';

import Cell from '../cells/cell';
import CheckboxCell from '../cells/checkboxCell';
import ChipCell from '../cells/chipCell';

export default function Row(props) {
    const {
        rowId,
        rowData,
        onChecked
    } = props;

    const {
        bookmarkId,
        articleName,
        path,
        url,
        createdAt,
        tags
    } = rowData;

    return (
        <DataTable.Row>
            <CheckboxCell
                rowId={rowId}
                onChecked={onChecked}
            />
            <Cell value={bookmarkId} />
            <Cell value={articleName} />
            <Cell value={path} />
            <Cell value={url.toString()} />
            <Cell value={createdAt} />
            <ChipCell values={tags} />
        </DataTable.Row>
    )
}

Row.defaultProps = {
    rowData: {
        tags: []
    }
}

Row.propTypes = {
    rowId: PropTypes.number.isRequired,
    rowData: PropTypes.shape({
        bookmarkId: PropTypes.string.isRequired,
        articleName: PropTypes.string.isRequired,
        path: PropTypes.string.isRequired,
        url: PropTypes.instanceOf(URL).isRequired,
        createdAt: PropTypes.string.isRequired,
        tags: PropTypes.arrayOf(PropTypes.string),
    }).isRequired,
    onChecked: PropTypes.func.isRequired,
}