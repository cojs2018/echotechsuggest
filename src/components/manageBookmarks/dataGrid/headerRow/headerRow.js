import React from 'react';
import { DataTable } from 'react-native-paper';

export default function HeaderRow() {
    return (
        <DataTable.Header>
            <DataTable.Title>Article</DataTable.Title>
            <DataTable.Title>Created At</DataTable.Title>
            <DataTable.Title>Tags</DataTable.Title>
        </DataTable.Header>
    )
}