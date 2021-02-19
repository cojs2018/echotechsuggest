jest.mock('./dataGrid/dataGrid');

import React from 'react';
import render from 'react-test-renderer';
import ManageBookmarks from './manageBookmarks'
import DataGrid from './dataGrid/dataGrid';
import { View } from 'react-native';

DataGrid.mockReturnValue(
    <View>
        Data Table
    </View>
);

describe('Manage Bookmark', () => {
    it('renders correctly', () => {
        const tree = render
            .create(<ManageBookmarks />)
            .toJSON();

        expect(tree).toMatchSnapshot();
    })
});