jest.mock('../../../utils/storage')

import { TestScheduler } from 'jest';
import React from 'react';
import render from 'react-test-renderer';
import { listBookmarks } from '../../../utils/storage';

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

listBookmarks.mockReturnValue(new Promise((resolve, reject) => {
    resolve(mockBookmarkUrls);
}));

let rows = [];
let isLoading = false;
let isError = false;
let errorText = '';
let tablePage = 0;

const setRows = jest.fn(async newRows => rows = newRows);
const setIsLoading = jest.fn(async bool => isLoading = bool);
const setIsError = jest.fn(async bool => isError = bool);
const setErrorText = jest.fn(async newMessage => errorText = newMessage);
const setTablePage = jest.fn(async newTablePage => tablePage = newTablePage);

beforeEach(() => {
    React.useState = jest.fn()
        .mockReturnValueOnce([rows, setRows])
        .mockReturnValueOnce([isLoading, setIsLoading])
        .mockReturnValueOnce([isError, setIsError])
        .mockReturnValueOnce([errorText, setErrorText])
        .mockReturnValueOnce([tablePage, setTablePage]);

    React.useEffect = jest.fn()
        .mockImplementationOnce(fn => fn());
})

describe('DataGrid', () => {
    it('renders correctly', () => {
        const tree = render
            .create(<DataGrid />)
            .toJSON();

        expect(tree).toMatchSnapshot();
    })
});