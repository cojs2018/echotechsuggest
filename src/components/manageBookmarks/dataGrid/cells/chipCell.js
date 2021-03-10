import React from 'react';
import { DataTable, Chip } from 'react-native-paper';
import PropTypes from 'prop-types';

const tagToChip = (tag) => {
    return (
        <Chip key={tag.tagId}>
            {tag.value.substring(0, 4)}
        </Chip>
    )
}

export default function ChipCell({ values = [] }) {

    const chipSet = values.map(tag => tagToChip(tag));

    return (
        <DataTable.Cell>
            {chipSet}
        </DataTable.Cell>
    )
}