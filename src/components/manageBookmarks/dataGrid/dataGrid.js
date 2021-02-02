import React from 'react';
import { DataTable, Checkbox } from 'react-native-paper';
import PropTypes from 'prop-types';

const arrayToRows = (rows, onSelectionChange) => {
    const [checked, setChecked] = React.useState(false);

    const handleCheck = (rowSelected) => {
        if(!checked) {
            onSelectionChange(rowSelected);
            setChecked(true);
        }
        else {
            setChecked(false);
        }
    }

    return (rows.map(row => (
        <DataTable.Row>
            <DataTable.Cell>
                <Checkbox 
                    status={checked ? 'checked' : 'unchecked'}
                    onPress={handleCheck}
                />
            </DataTable.Cell>
        </DataTable.Row>
    )))
}

const objectToHeaders = (columns) => {
    return (
        <DataTable.Header>
            <DataTable.Title />
            {columns.map(column => (
                <DataTable.Title>
                    {column.headerName}
                </DataTable.Title>
            ))}
        </DataTable.Header>
    )
}

export default function DataGrid(props) {

    const {
        columns,
        rows,
        pageSize,
        onSelectionChange,
    } = props;

    const [page, setPage] = React.useState(0);
    const pageFrom = page * pageSize;
    const pageTo = pageSize > 0 ? ((page + 1) * pageSize) : (rows.length);
    const numberOfPages = pageSize > 0 ? (Math.floor(rows.length / pageSize)) : (1);

    const label = `${pageFrom + 1}-${pageTo} of ${rows.length}`;
    const handlePageChange = (pageNumber) => setPage(pageNumber);

    const headers = objectToHeaders(columns);
    const rowSet = arrayToRows(rows, onSelectionChange);
    
    return (
        <DataTable >
            {headers}
            {rowSet}
            <DataTable.Pagination
                page={page}
                numberOfPages={numberOfPages}
                onPageChange={handlePageChange}
                label={label}
            />
        </DataTable>
    );
}

DataGrid.defaultProps = {
    pageSize: 0,
};

DataGrid.propTypes = {
    columns: PropTypes.arrayOf(PropTypes.shape({
        field: PropTypes.string.isRequired,
        headerName: PropTypes.string.isRequired,
        width: PropTypes.number.isRequired
    })).isRequired,
    rows: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string.isRequired,
    })).isRequired,
    pageSize: PropTypes.number,
    onSelectionChange: PropTypes.func.isRequired,
};
