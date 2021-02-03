import React from 'react';
import { DataTable } from 'react-native-paper';
import PropTypes from 'prop-types';

export default function Cell(props) {
    const { value } = props;

    return (
        <DataTable.Cell>
            {value}
        </DataTable.Cell>
    )
}

Cell.propTypes = {
    value: PropTypes.string.isRequired,
}