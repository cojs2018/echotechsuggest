import React from 'react';
import { DataTable } from 'react-native-paper';
import PropTypes from 'prop-types';

import Cell from '../cells/cell';
import ChipCell from '../cells/chipCell';
import { StyleSheet } from 'react-native';

export default function Row(props) {
    const {
        rowId,
        rowData,
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
        <DataTable.Row style={styles.rowStyle}>
            <Cell value={articleName} />
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
        createdAt: PropTypes.string.isRequired,
        tags: PropTypes.arrayOf(PropTypes.string),
    }).isRequired,
}

const styles = StyleSheet.create({
    rowStyle: {
        height: 1500,
    }
})