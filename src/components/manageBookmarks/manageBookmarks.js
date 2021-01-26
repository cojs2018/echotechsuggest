import React from 'react';
import { DataGrid } from '@material-ui/data-grid';
import { deleteBookmark, listBookmarks } from '../../utils/storage';
import { IconButton, Toolbar, Typography, Grid } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import Delete from '@material-ui/icons/Delete';
import Refresh from '@material-ui/icons/Refresh';

const getColumnWidth = (bookmarkUrlList, columnName) => {
    const columnEntries = bookmarkUrlList
        .map(bookmark => {
            const columnValue = bookmark[columnName];

            if(typeof columnValue === 'undefined') return 0;
            return JSON.stringify(columnValue).length;
        })
        .sort();

    return columnEntries.pop();
}

const getColumns = (bookmarkUrlList) => {
    let columnSet = [];

    bookmarkUrlList.forEach((bookmark) => {
        Object.keys(bookmark).forEach((bookmarkColumn) => {
            const columnExists = columnSet.findIndex((columnInSet) => {
                return columnInSet.field === bookmarkColumn;
            }) > -1

            if(!columnExists) {
                const newColumn = {
                    field: bookmarkColumn,
                    headerName: bookmarkColumn.normalize(),
                    width: getColumnWidth(bookmarkUrlList, bookmarkColumn)
                }

                columnSet.push(newColumn);
            }
        });
    });

    return columnSet;
}

const getRows = (bookmarkUrlList, bookmarkColumns) => {
    return bookmarkUrlList.map(bookmark => {
        const newRow = {}

        bookmarkColumns.forEach(rowColumn => {
            if(bookmark[rowColumn.field]) {
                newRow[rowColumn.field] = bookmark[rowColumn.field];
            }
            else {
                newRow[rowColumn.field] = '';
            }
        })

        return newRow;
    })
}

export default function ManageBookmarks() {
    const [columns, setColumns] = React.useState([]);
    const [rows, setRows] = React.useState([]);
    const [selected, setSelected] = React.useState([]);
    const [alertMessage, setAlertMessage] = React.useState({
        status: 'none',
        message: ''
    })

    const handleTableData = async () => {
        const bookmarkUrlList = await listBookmarks();
        
        const currentColumns = getColumns(bookmarkUrlList);

        const currentRows = getRows(bookmarkUrlList, currentColumns);

        setColumns(currentColumns);
        setRows(currentRows);
    };

    React.useEffect(() => {
        handleTableData();
    }, []);

    const handleSelectionChange = (newSelection) => {
        setSelected(newSelection.rowIds);
    };

    const handleDelete = async () => {
        return deleteBookmark(selection[0])
            .then((onfulfilled) => {
                const responseAlertMessage = {
                    status: 'success',
                    message: onfulfilled.message
                }
                handleRefresh()
                setAlertMessage(responseAlertMessage);
            })
            .catch((onrejected) => {
                const rejectAlertMessage = {
                    status: 'error',
                    message: onrejected.message
                }
                setAlertMessage(rejectAlertMessage);
            })
    }

    const handleRefresh = async () => {
        handleTableData();
    }

    return (
        <Grid container direction="column" justify="center" alignItems="center">
            <Grid item>
                <Toolbar variant="dense">
                    <Typography variant="h2">
                        Manage Bookmarks
                    </Typography>
                    {selected.length === 1 ? (
                        <IconButton id="delete" onClick={handleDelete}>
                            <Delete />
                        </IconButton>
                    ) : (<div />)}
                    <IconButton id="refresh" onClick={handleRefresh}>
                        <Refresh />
                    </IconButton>
                </Toolbar>
            </Grid>
            <Grid item>
                {alertMessage.status === 'none' ? (<div />) : (
                    <Alert severity={alertMessage.status}>
                        {alertMessage.message}
                    </Alert>
                )}
            </Grid>
            <Grid item>
                {columns.length > 0 && rows.length > 0 ? (
                    <DataGrid 
                        columns={columns} 
                        rows={rows}
                        pageSize={10}
                        checkboxSelection
                        onSelectionChange={handleSelectionChange}
                    />
                ) : (
                    <Typography varaiant="h3">
                        No bookmarks to show!
                    </Typography>
                )}
            </Grid>
        </Grid>
    );
}