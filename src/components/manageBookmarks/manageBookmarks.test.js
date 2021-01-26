jest.mock('../../utils/storage');

import React from 'react';
import { deleteBookmark, listBookmarks } from '../../utils/storage';
import { mount } from 'enzyme';
import render from 'react-test-renderer';
import ManageBookmarks from './manageBookmarks'

const getMockDate = () => {
    const randomTime = Math.floor(Math.random() * Date.now());
    const mockDate = new Date(randomTime);
    return mockDate.toUTCString();
};

const mockBookmarkUrls = [
    {
        id: "0",
        articleName: "article0 - articlearchive",
        path: 'http://www.articlearchive.com/article0',
        url: new URL('http://www.articlearchive.com/article0'),
        createdAt: getMockDate(),
    },
    {
        id: "1",
        articleName: "article1 - articlearchive",
        path: 'http://www.articlearchive.com/article1',
        url: new URL('http://www.articlearchive.com/article1'),
        createdAt: getMockDate(),
    },
    {
        id: "2",
        articleName: "article2 - articlearchive",
        path: 'http://www.articlearchive.com/article2',
        url: new URL('http://www.articlearchive.com/article2'),
        createdAt: getMockDate(),
        tags: [ "tag 1" ]
    }
]

listBookmarks.mockReturnValue(mockBookmarkUrls);

// React statas and effects
let columns = [];
let rows = [];
let selected = [];
let alertMessage = {
    status: 'none',
    message: ''
}

const setColumns = jest.fn(async (newColumnSet) => columns = newColumnSet);
const setRows = jest.fn(async (newRowSet) => rows = newRowSet);
const setSelected = jest.fn(async (selectedRows) => selected = selectedRows);
const setAlertMessage = jest.fn(async (newMessage) => alertMessage = newMessage);

beforeEach(() => {
    React.useState = jest.fn()
        .mockReturnValueOnce([columns, setColumns])
        .mockReturnValueOnce([rows, setRows])
        .mockReturnValueOnce([selected, setSelected])
        .mockReturnValueOnce([alertMessage, setAlertMessage]);
    
    React.useEffect = jest.fn()
        .mockImplementationOnce(effectFunction => effectFunction());
})

describe('Manage Bookmark', () => {
    it('renders correctly', () => {
        const tree = render
            .create(<ManageBookmarks />)
            .toJSON();

        expect(tree).toMatchSnapshot();
    })
});