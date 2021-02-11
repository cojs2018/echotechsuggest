import React from 'react';
import { View } from 'react-native';
import render from 'react-test-renderer';

jest.mock('../cells/cell');
jest.mock('../cells/chipCell');

import Cell from '../cells/cell';
import ChipCell from '../cells/chipCell';

import Row from './row';

Cell.mockImplementation(({ value }) => <View>{value}</View>)
ChipCell.mockReturnValue(<View>''</View>)

describe('Row', () => {
    it('renders correctly', () => {
        const props = {
            rowId: 0,
            rowData: {
                bookmarkId: "2",
                articleName: "article2 - articlearchive",
                path: 'http://www.articlearchive.com/article2',
                url: new URL('http://www.articlearchive.com/article2'),
                createdAt: (new Date()).toUTCString(),
                tags: [ "tag 1" ]
            },
            onChecked: jest.fn(),
        };

        const tree = render
            .create(<Row {...props} />)
            .toJSON();
        
        expect(tree).toMatchSnapshot();
    })
})