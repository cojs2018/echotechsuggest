import React from 'react';
import { DataTable } from 'react-native-paper';
import PropTypes from 'prop-types';

import HeaderCell from './headerCell';

export default function HeaderRow(props) {
    const { columns } = props;

    const columnHeaders = columns.map(column => (
        <HeaderCell {...column} />
    ));

    return (
        <DataTable.Header>
            <DataTable.Title> </DataTable.Title>
            {columnHeaders}
        </DataTable.Header>
    )
}

HeaderRow.defaultProps = {
    columns: []
}

HeaderRow.propTypes = {
    columns: PropTypes.arrayOf(PropTypes.shape({
        field: PropTypes.string.isRequired,
        headerName: PropTypes.string.isRequired,
        width: PropTypes.number,
    }))
}