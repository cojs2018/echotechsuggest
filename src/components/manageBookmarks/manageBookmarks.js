import React from 'react';
import { DataGrid } from '@material-ui/data-grid';
import { deleteBookmark, listBookmarks } from '../../utils/storage';
import { IconButton, Toolbar, Typography, Grid } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import Delete from '@material-ui/icons/Delete';

const getColumns = (bookmarkUrlList) => {
    const sortByLengthDesc = Object.keys(bookmarkUrlList)
        .sort((bookmarkA, bookmarkB) => bookmarkA.length > bookmarkB.length);

    let bookmarkColumns = [{
        field: 'articleName',
        headerName: 'Article Name',
        width: sortByLengthDesc[0]
    }]

    const otherColumns = Object.values(bookmarkUrlList)[0]
        .map(column => ({
            field: column,
            headerName: column.normalize(),
            width: column.length
        }));

    return [bookmarkColumns].concat(otherColumns);
}

const getRows = (bookmarkUrlList) => {
    return Object.keys(bookmarkUrlList)
        .map((bookmark) => ({
            articleName: bookmark,
            ...bookmarkUrlList[bookmark]
        }))
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
        setColumns(getColumns(bookmarkUrlList));
        setRows(getRows(bookmarkUrlList));
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

    return (
        <Grid container direction="column" justify="center" alignItems="center">
            <Grid item>
                <Toolbar variant="dense">
                    <Typography variant="h2">
                        Manage Bookmarks
                    </Typography>
                    {selected.length === 1 ? (
                        <IconButton onClick={handleDelete}>
                            <Delete />
                        </IconButton>
                    ) : (<div />)}
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
                <DataGrid 
                    rows={rows} 
                    columns={columns} 
                    pageSize={10} 
                    checkboxSelection
                    onSelectionChange={handleSelectionChange}
                />
            </Grid>
        </Grid>
    );
}