import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Appbar } from 'react-native-paper'
import DataGrid from './dataGrid/dataGrid';

export default function ManageBookmarks({ setPage, bookmarkIdSelected, setBookmarkIdSelected }) {
    return (
        <View style={styles.root}>
            <Appbar>
                <Appbar.Content
                    title="Manage Bookmarks"
                />
                <Appbar.Action icon="view-carousel" disabled={bookmarkIdSelected === ''} onPress={() => setPage(3)}  />
            </Appbar>
            <DataGrid setBookmarkIdSelected={setBookmarkIdSelected} />
        </View>
    );
}

const styles= StyleSheet.create({
    root: {
        width: '97%'
    }
});