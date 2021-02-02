import React from 'react';
import { View } from 'react-native';
import { Headline, Appbar } from 'react-native-paper'
import DataGrid from './dataGrid/dataGrid';
import AlertBar from '../alertBar/alertBar';
import { deleteBookmark, listBookmarks } from '../../utils/storage';

const getColumns = () => {
    return [
        {field: 'bookmarkId', headerName: 'ID', width: 10},
        {field: 'articleName', headerName: 'Article Name', width: 20},
        {field: 'path', headerName: 'Path', width: 50},
        {field: 'url', headerName: 'URL', width: 50},
        {field: 'createdAt', headerName: 'Created At', width: 20},
        {field: 'tags', headerName: 'Tags', width: 100}
    ]
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
    });
    const [visible, setVisible] = React.useState(false);

    const handleTableData = async () => {
        return listBookmarks()
            .then(fulfilledBookmarkList => {
                const currentColumns = getColumns(fulfilledBookmarkList);
                const currentRows = getRows(fulfilledBookmarkList, currentColumns);

                setColumns(currentColumns);
                setRows(currentRows);
            })
            .catch((onrejected) => {
                const rejectAlertMessage = {
                    status: 'error',
                    message: onrejected.message
                }
                setAlertMessage(rejectAlertMessage);
                setVisible(true);
            });
    };

    React.useEffect(() => {
        handleTableData();
    }, []);

    const handleSelectionChange = (newSelection) => {
        setSelected(newSelection);
    };

    const handleDelete = async () => {
        return deleteBookmark(selected[0])
            .then((onfulfilled) => {
                const responseAlertMessage = {
                    status: 'success',
                    message: onfulfilled.message
                }
                handleRefresh()
                setAlertMessage(responseAlertMessage);
                setVisible(true);
            })
            .catch((onrejected) => {
                const rejectAlertMessage = {
                    status: 'error',
                    message: onrejected.message
                }
                setAlertMessage(rejectAlertMessage);
                setVisible(true);
            });
    }

    const handleRefresh = async () => {
        handleTableData();
    }

    return (
        <View>
            <Appbar>
                <Appbar.Content
                    title="Manage Bookmarks"
                />
                <Appbar.Action
                    testID="delete"
                    icon="delete"
                    disabled={selected.length !== 1}
                    onPress={handleDelete}
                />
                <Appbar.Action
                    testID="refresh"
                    icon="refresh"
                    onPress={handleRefresh}
                />
            </Appbar>
            <AlertBar
                visible={visible}
                setVisible={setVisible}
                severity={alertMessage.status}
                message={alertMessage.message}
            />
            <DataGrid
                columns={columns} 
                rows={rows}
                pageSize={10}
                onSelectionChange={handleSelectionChange}
            />
        </View>
    );
}