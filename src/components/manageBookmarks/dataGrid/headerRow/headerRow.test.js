import React from 'react';
import render from 'react-test-renderer';

import HeaderRow from './headerRow';

const mockRows = [
    {field: 'bookmarkId', headerName: 'ID', width: 10},
    {field: 'articleName', headerName: 'Article Name', width: 20},
    {field: 'path', headerName: 'Path', width: 50},
    {field: 'url', headerName: 'URL', width: 50},
    {field: 'createdAt', headerName: 'Created At', width: 20},
    {field: 'tags', headerName: 'Tags', width: 100}
]

describe('HeaderRows', () => {
    it('renders correctly', () => {
        const props = {
            columns: mockRows
        }

        const tree = render
            .create(<HeaderRow {...props} />)
            .toJSON();

        expect(tree).toMatchSnapshot();
    })
})