import React from 'react';
import { DataTable, Checkbox } from 'react-native-paper';
import PropTypes from 'prop-types';

export default function CheckboxCell(props) {
    const { rowId, onChecked } = props;

    const [checked, setChecked] = React.useState(false);

    const handleChecked = () => {
        if (checked) {
            setChecked(false)
        }
        else {
            setChecked(true);
            onChecked(rowId);
        }
    };

    return (
        <DataTable.Cell>
            <Checkbox
                status={checked ? 'checked' : 'unchecked'}
                onPress={handleChecked}
            />
        </DataTable.Cell>
    )
}

CheckboxCell.propTypes = {
    rowId: PropTypes.number.isRequired,
    onChecked: PropTypes.func.isRequired,
}