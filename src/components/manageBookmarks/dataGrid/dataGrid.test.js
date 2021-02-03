import React from 'react';
import render from 'react-test-renderer';

import DataGrid from './dataGrid';

const getMockDate = () => {
    const randomTime = Math.floor(Math.random() * Date.now());
    const mockDate = new Date(randomTime);
    return mockDate.toUTCString();
};

const mockBookmarkUrls = [
    {
        bookmarkId: "0",
        articleName: "article0 - articlearchive",
        path: 'http://www.articlearchive.com/article0',
        url: new URL('http://www.articlearchive.com/article0'),
        createdAt: getMockDate(),
        tags: []
    },
    {
        bookmarkId: "1",
        articleName: "article1 - articlearchive",
        path: 'http://www.articlearchive.com/article1',
        url: new URL('http://www.articlearchive.com/article1'),
        createdAt: getMockDate(),
        tags: []
    },
    {
        bookmarkId: "2",
        articleName: "article2 - articlearchive",
        path: 'http://www.articlearchive.com/article2',
        url: new URL('http://www.articlearchive.com/article2'),
        createdAt: getMockDate(),
        tags: [ "tag 1" ]
    }
]

const mockColumns = [
    {field: 'bookmarkId', headerName: 'ID', width: 10},
    {field: 'articleName', headerName: 'Article Name', width: 20},
    {field: 'path', headerName: 'Path', width: 50},
    {field: 'url', headerName: 'URL', width: 50},
    {field: 'createdAt', headerName: 'Created At', width: 20},
    {field: 'tags', headerName: 'Tags', width: 100}
]

describe('DataGrid', () => {
    it('renders correctly', () => {
        const props = {
            columns: mockColumns,
            rows: mockBookmarkUrls,
            pageSize: 0,
            onSelectionChange: jest.fn()
        }

        const tree = render
            .create(<DataGrid {...props} />)
            .toJSON();

        expect(tree).toMatchSnapshot();
    })
})