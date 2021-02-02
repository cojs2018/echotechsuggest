jest.mock('../../utils/storage');
jest.mock('./dataGrid/dataGrid');
jest.mock('../alertBar/alertBar');

import React from 'react';
import { deleteBookmark, listBookmarks } from '../../utils/storage';
import { mount } from 'enzyme';
import render from 'react-test-renderer';
import ManageBookmarks from './manageBookmarks'
import DataGrid from './dataGrid/dataGrid';
import { Button } from 'react-native-paper';
import AlertBar from '../alertBar/alertBar';
import { View } from 'react-native';

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
        tags: []
    },
    {
        id: "1",
        articleName: "article1 - articlearchive",
        path: 'http://www.articlearchive.com/article1',
        url: new URL('http://www.articlearchive.com/article1'),
        createdAt: getMockDate(),
        tags: []
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

listBookmarks.mockReturnValue(new Promise((resolve, reject) => {
    resolve(mockBookmarkUrls);
}));

deleteBookmark.mockReturnValue(new Promise((resolve, reject) => {
    resolve({
        status: 200,
        message: 'Bookmark deleted successfully!'
    });
}));

// React statas and effects
let columns = [];
let rows = [];
let selected = [];
let alertMessage = {
    status: 'none',
    message: ''
}
let visible = false;

const setColumns = jest.fn(async (newColumnSet) => columns = newColumnSet);
const setRows = jest.fn(async (newRowSet) => rows = newRowSet);
const setSelected = jest.fn(async (selectedRows) => selected = selectedRows);
const setAlertMessage = jest.fn(async (newMessage) => alertMessage = newMessage);
const setVisible = jest.fn(async (bool) => visible = bool);

beforeEach(() => {
    React.useState = jest.fn()
        .mockReturnValueOnce([columns, setColumns])
        .mockReturnValueOnce([rows, setRows])
        .mockReturnValueOnce([selected, setSelected])
        .mockReturnValueOnce([alertMessage, setAlertMessage])
        .mockReturnValueOnce([visible, setVisible]);
    
    React.useEffect = jest.fn()
        .mockImplementationOnce(effectFunction => effectFunction());
});

DataGrid.mockReturnValue(
    <View>
        Data Table
    </View>
);

AlertBar.mockImplementation((props) => {
    const {
        visible,
        setVisible,
        severity,
        message
    } = props;

    return (
        <View>
            {`${severity.toUpperCase()}: ${message}`}
        </View>
    );
})

describe('Manage Bookmark', () => {
    it('renders correctly', () => {
        const tree = render
            .create(<ManageBookmarks />)
            .toJSON();

        expect(tree).toMatchSnapshot();
    })
});

test('Manage Bookark actions', async () => {
    const wrapper = mount(<ManageBookmarks />);

    const refresh = wrapper
        .find('IconButton')
        .findWhere(icon => icon.prop('testID') == "refresh")
        .first();

    refresh.props().onPress();
    wrapper.update();

    await new Promise(resolve => setImmediate(resolve));
    expect(setRows.mock.calls.length).toStrictEqual(3);

    const dataGrid = wrapper
        .find('DataGrid');

    dataGrid.props().onSelectionChange([{
        id: "1",
    }])

    await new Promise(resolve => setImmediate(resolve));
    expect(selected.length).toStrictEqual(1);

    const deleteIcon = wrapper
        .find('IconButton')
        .findWhere(icon => icon.prop('testID') == "delete")
        .first();

    deleteIcon.props().onPress();
    wrapper.update();

    await new Promise(resolve => setImmediate(resolve));
    expect(alertMessage).toHaveProperty('status', 'success');
})