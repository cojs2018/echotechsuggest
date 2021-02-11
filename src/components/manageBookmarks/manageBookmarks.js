import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Appbar } from 'react-native-paper'
import DataGrid from './dataGrid/dataGrid';
import AlertBar from '../alertBar/alertBar';
import { deleteBookmark, listBookmarks } from '../../utils/storage';

export default function ManageBookmarks() {
    return (
        <View style={styles.root}>
            <Appbar>
                <Appbar.Content
                    title="Manage Bookmarks"
                />
                <Appbar.Action
                    testID="refresh"
                    icon="refresh"
                    onPress={handleRefresh}
                />
            </Appbar>
            <DataGrid />
        </View>
    );
}

const styles= StyleSheet.create({
    root: {
        width: '97%'
    }
});