import React from 'react';
import { DataTable, Chip } from 'react-native-paper';
import PropTypes from 'prop-types';

const stringToChip = (stringValue) => {
    return (
        <Chip key={stringValue}>
            {stringValue.substring(0, 4)}
        </Chip>
    )
}

export default function ChipCell(props) {
    const { values } = props;

    const chipSet = values.map(text => stringToChip(text.value));

    return (
        <DataTable.Cell>
            {chipSet}
        </DataTable.Cell>
    )
}

ChipCell.defaultProps = {
    values: [],
}

ChipCell.propTypes = {
    values: PropTypes.arrayOf(PropTypes.string),
}