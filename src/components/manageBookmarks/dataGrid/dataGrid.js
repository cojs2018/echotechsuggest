import React from 'react';
import { DataTable, Headline } from 'react-native-paper';
import PropTypes from 'prop-types';
import { View, Image } from 'react-native';
import HeaderRow from './headerRow/headerRow';
import Row from './rows/row';

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
    
    return (
        columns.length > 0 ? (
            <DataTable >
                <HeaderRow {...columns} />
                {rows.map((rowData, i) => {
                    <Row 
                        rowId={i}
                        rowData={rowData}
                        onChecked={onSelectionChange}
                    />
                })}
                <DataTable.Pagination
                    page={page}
                    numberOfPages={numberOfPages}
                    onPageChange={handlePageChange}
                    label={label}
                />
            </DataTable>
        ) : (
            <View>
                <Image source={require('../../../images/noBookmarks.png')} />
                <Headline>No boookmarks could be found in database.</Headline>
            </View>
        )
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
        bookmarkId: PropTypes.string.isRequired,
        articleName: PropTypes.string.isRequired,
        path: PropTypes.string.isRequired,
        url: PropTypes.instanceOf(URL).isRequired,
        createdAt: PropTypes.string.isRequired,
        tags: PropTypes.arrayOf(PropTypes.string),
    })).isRequired,
    pageSize: PropTypes.number,
    onSelectionChange: PropTypes.func.isRequired,
};
