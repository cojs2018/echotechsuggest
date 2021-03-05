jest.mock('../../../utils/storage')

import React from 'react';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';
import TagList from './tagList';
import { listTags, updateBookmark } from '../../../utils/storage';

listTags.mockReturnValue(new Promise((resolve, reject) => {
    resolve([
        {
            "tagId": "0d411a0b-da77-4f30-a6dd-c2deda6618c0",
            "value": "Artificial Intelligence",
            "featured": 4
        },
        {
            "tagId": "b659f09b-9cc7-442b-aa80-bede44772ac4",
            "value": "Machine Learning",
            "featured": 1
        },
    ])
}))

describe('TagList', () => {

    const props = {
        bookmarkId: '047ec796-2eca-417e-865a-e2e187b97689',
        currentTags: [
            {
                "tagId": "94972406-7158-4a27-8a44-52a33b854a74",
                "value": "Artificial Precipitation",
                "featured": 1
            },
            {
                "tagId": "18a2d966-fe32-4d05-9543-fcee703f718c",
                "value": "Energy",
                "featured": 1
            },
            {
                "tagId": "52d91ec3-a18b-4864-8438-56cfd759528c",
                "value": "Quantum Computing",
                "featured": 2
            },
            {
                "tagId": "8b48abe0-98df-4c33-99d4-543ff3f4bf54",
                "value": "Biotechnology",
                "featured": 1
            }
        ], 
        setAlertMessage: jest.fn(async () => {}),
        setVisible: jest.fn(async () => {}),
    }

    it('renders correctly', () => {
        const tree = renderer
            .create(<TagList {...props} />)
            .toJSON();

        expect(tree).toMatchSnapshot();
    })
});

test('Edit', async () => {

    const props = {
        bookmarkId: '047ec796-2eca-417e-865a-e2e187b97689',
        currentTags: [], 
        setAlertMessage: jest.fn(async () => {}),
        setVisible: jest.fn(async () => {}),
    };

    let tagSelection = [];
    let newTags = [];
    let edit = false;
    let dropDown = false;

    const setTagSelection = jest.fn(async (newTagsSelection) => tagSelection = newTagsSelection);
    const setNewTags = jest.fn(async (newTagSet) => newTags = newTagSet);
    const setEdit = jest.fn(async (bool) => edit = bool);
    const setDropDown = jest.fn(async (bool) => dropDown = bool);

    React.useEffect = jest.fn()
        .mockImplementation((effect, deps = null) => effect());
    
    React.useState = jest.fn()
        .mockReturnValueOnce([tagSelection, setTagSelection])
        .mockReturnValueOnce([newTags, setNewTags])
        .mockReturnValueOnce([edit, setEdit])
        .mockReturnValueOnce([dropDown, setDropDown]);

    const wrapper = mount(<TagList {...props} />);

    const editIcon = wrapper
        .find('IconButton')
        .first();

    editIcon.props().onPress();
    wrapper.update();

    await new Promise(resolve => setImmediate(resolve));
    expect(edit).toBeTruthy();
});

test('Cancel', async () => {

    let alertMessage = {};
    let visible = '';

    const props = {
        bookmarkId: '047ec796-2eca-417e-865a-e2e187b97689',
        currentTags: [], 
        setAlertMessage: jest.fn(async (newMessage) => alertMessage = newMessage),
        setVisible: jest.fn(async (bool) => visible = bool),
    };

    let tagSelection = [];
    let newTags = [];
    let edit = true;
    let dropDown = false;

    const setTagSelection = jest.fn(async (newTagsSelection) => tagSelection = newTagsSelection);
    const setNewTags = jest.fn(async (newTagSet) => newTags = newTagSet);
    const setEdit = jest.fn(async (bool) => edit = bool);
    const setDropDown = jest.fn(async (bool) => dropDown = bool);

    React.useEffect = jest.fn()
        .mockImplementation((effect, deps = null) => effect());
    
    React.useState = jest.fn()
        .mockReturnValueOnce([tagSelection, setTagSelection])
        .mockReturnValueOnce([newTags, setNewTags])
        .mockReturnValueOnce([edit, setEdit])
        .mockReturnValueOnce([dropDown, setDropDown]);

    const wrapper = mount(<TagList {...props} />);

    const cancelIcon = wrapper
        .find('IconButton')
        .filterWhere(iconButton => iconButton.props().icon === 'cancel')
        .first();

    cancelIcon.props().onPress();
    wrapper.update();

    await new Promise(resolve => setImmediate(resolve));
    expect(edit).toBeFalsy();
});

test('Remove Tag', async () => {

    let alertMessage = {};
    let visible = '';

    const props = {
        bookmarkId: '047ec796-2eca-417e-865a-e2e187b97689',
        currentTags: [], 
        setAlertMessage: jest.fn(async (newMessage) => alertMessage = newMessage),
        setVisible: jest.fn(async (bool) => visible = bool),
    };

    let tagSelection = [];
    let newTags = [
        {
            "tagId": "52d91ec3-a18b-4864-8438-56cfd759528c",
            "value": "Quantum Computing",
            "featured": 2
        }
    ];
    let edit = true;
    let dropDown = false;

    const setTagSelection = jest.fn(async (newTagsSelection) => tagSelection = newTagsSelection);
    const setNewTags = jest.fn(async (newTagSet) => newTags = newTagSet);
    const setEdit = jest.fn(async (bool) => edit = bool);
    const setDropDown = jest.fn(async (bool) => dropDown = bool);

    React.useEffect = jest.fn()
        .mockImplementation((effect, deps = null) => effect());
    
    React.useState = jest.fn()
        .mockReturnValueOnce([tagSelection, setTagSelection])
        .mockReturnValueOnce([newTags, setNewTags])
        .mockReturnValueOnce([edit, setEdit])
        .mockReturnValueOnce([dropDown, setDropDown]);

    const wrapper = mount(<TagList {...props} />);

    const tagChip = wrapper
        .find('Chip')
        .first();

    tagChip.props().onClose();
    wrapper.update();

    await new Promise(resolve => setImmediate(resolve));
    expect(newTags.length).toStrictEqual(0);
});

test('New Tag', async () => {

    let alertMessage = {};
    let visible = '';

    const props = {
        bookmarkId: '047ec796-2eca-417e-865a-e2e187b97689',
        currentTags: [], 
        setAlertMessage: jest.fn(async (newMessage) => alertMessage = newMessage),
        setVisible: jest.fn(async (bool) => visible = bool),
    };

    let tagSelection = [];
    let newTags = [];
    let edit = true;
    let dropDown = false;

    const setTagSelection = jest.fn(async (newTagsSelection) => tagSelection = newTagsSelection);
    const setNewTags = jest.fn(async (newTagSet) => newTags = newTagSet);
    const setEdit = jest.fn(async (bool) => edit = bool);
    const setDropDown = jest.fn(async (bool) => dropDown = bool);

    React.useEffect = jest.fn()
        .mockImplementation((effect, deps = null) => effect());
    
    React.useState = jest.fn()
        .mockReturnValueOnce([tagSelection, setTagSelection])
        .mockReturnValueOnce([newTags, setNewTags])
        .mockReturnValueOnce([edit, setEdit])
        .mockReturnValueOnce([dropDown, setDropDown]);

    const wrapper = mount(<TagList {...props} />);

    const nativeSyntheticEvent = {
        nativeEvent: {
            text: 'Artificial Intelligence',
        }
    }

    const textInput = wrapper
        .find('TextInput')
        .first();

    textInput.props().onEndEditing(nativeSyntheticEvent);
    wrapper.update();

    await new Promise(resolve => setImmediate(resolve));
    expect(newTags.length).toStrictEqual(1);
});

test('Save', async () => {

    let alertMessage = {};
    let visible = '';

    const props = {
        bookmarkId: '047ec796-2eca-417e-865a-e2e187b97689',
        currentTags: [], 
        setAlertMessage: jest.fn(async (newMessage) => alertMessage = newMessage),
        setVisible: jest.fn(async (bool) => visible = bool),
    };

    let tagSelection = [];
    let newTags = [];
    let edit = true;
    let dropDown = false;

    const setTagSelection = jest.fn(async (newTagsSelection) => tagSelection = newTagsSelection);
    const setNewTags = jest.fn(async (newTagSet) => newTags = newTagSet);
    const setEdit = jest.fn(async (bool) => edit = bool);
    const setDropDown = jest.fn(async (bool) => dropDown = bool);

    React.useEffect = jest.fn()
        .mockImplementation((effect, deps = null) => effect());
    
    React.useState = jest.fn()
        .mockReturnValueOnce([tagSelection, setTagSelection])
        .mockReturnValueOnce([newTags, setNewTags])
        .mockReturnValueOnce([edit, setEdit])
        .mockReturnValueOnce([dropDown, setDropDown]);

    updateBookmark.mockReturnValueOnce(new Promise((resolve, reject) => {
        resolve({
            status: 200,
            message: `Bookmark ${props.bookmarkId} Updated Successfully!`
        })
    }))

    const wrapper = mount(<TagList {...props} />);

    const saveIcon = wrapper
        .find('IconButton')
        .filterWhere(iconButton => iconButton.props().icon === 'content-save')
        .first();

    saveIcon.props().onPress();
    wrapper.update();

    await new Promise(resolve => setImmediate(resolve));
    expect(alertMessage.status).toStrictEqual('success');
})