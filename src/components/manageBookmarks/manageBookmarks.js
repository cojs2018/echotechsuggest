import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Appbar } from 'react-native-paper'
import DataGrid from './dataGrid/dataGrid';

export default function ManageBookmarks() {
    return (
        <View style={styles.root}>
            <Appbar>
                <Appbar.Content
                    title="Manage Bookmarks"
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