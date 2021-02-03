import React from 'react';
import { DataTable } from 'react-native-paper';
import PropTypes from 'prop-types';

export default function HeaderCell(props) {
    const {
        field,
        headerName,
        width
    } = props;

    return (
        <DataTable.Title testID={field} style={{ width }}>
            {headerName}
        </DataTable.Title>
    )
}

HeaderCell.defaultProps = {
    width: 20,
}

HeaderCell.propTypes = {
    field: PropTypes.string.isRequired,
    headerName: PropTypes.string.isRequired,
    width: PropTypes.number,
}