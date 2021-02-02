import React from 'react';
import render from 'react-test-renderer';
import { mount } from 'enzyme';
import NewBookmark from './newBookmark';

jest.mock('../../utils/storage')
import { createBookmark } from '../../utils/storage';

describe('New Bookmark', () => {
    it('renders correctly', () => {
        const tree = render
            .create(<NewBookmark />)
            .toJSON();

        expect(tree).toMatchSnapshot();
    })
})

test('Add url and submit, no error', async () => {
    let bookmarkUrl = '';
    let message = '';
    let error = false;
    let visible = false;

    const setBookmarkUrl = jest.fn(async (newUrl) => bookmarkUrl = newUrl);
    const setMessage = jest.fn(async (newMessage) => message = newMessage);
    const setError = jest.fn(async (bool) => error = bool);
    const setVisible = jest.fn(async (bool) => visible = bool);

    React.useState = jest.fn()
        .mockReturnValueOnce([bookmarkUrl, setBookmarkUrl])
        .mockReturnValueOnce([message, setMessage])
        .mockReturnValueOnce([error, setError])
        .mockReturnValueOnce([visible, setVisible]);

    createBookmark.mockImplementationOnce((bookmarkURL) => new Promise((resolve, reject) => {
        resolve({
            status: 200,
            message: 'Bookmark created successfully!'
        })
    }))

    const wrapper = mount(<NewBookmark />);

    const urlInput = wrapper
        .find('TextInput')
        .findWhere(testInput => testInput.prop('testID') === "url")
        .first();

    urlInput.props().onChangeText('www.example.com');

    await new Promise(resolve => setImmediate(resolve))
    expect(bookmarkUrl).toStrictEqual('www.example.com');

    const submitButton = wrapper
        .find('Button')
        .findWhere(button => button.prop('testID') === 'send')
        .first();
    
    submitButton.props().onPress();
    wrapper.update();

    await new Promise(resolve => setImmediate(resolve))
    expect(message).toStrictEqual('Url has now been stored, please await your results.');
    expect(error).toBeFalsy();
});

test('error', async () => {
    let bookmarkUrl = '';
    let message = '';
    let error = false;
    let visible = false;

    const setBookmarkUrl = jest.fn(async (newUrl) => bookmarkUrl = newUrl);
    const setMessage = jest.fn(async (newMessage) => message = newMessage);
    const setError = jest.fn(async (bool) => error = bool);
    const setVisible = jest.fn(async (bool) => visible = bool);

    React.useState = jest.fn()
        .mockReturnValueOnce([bookmarkUrl, setBookmarkUrl])
        .mockReturnValueOnce([message, setMessage])
        .mockReturnValueOnce([error, setError])
        .mockReturnValueOnce([visible, setVisible]);

    createBookmark.mockImplementationOnce((bookmarkURL) => new Promise((resolve, reject) => {
        reject(Error('Internal service error'));
    }));

    const wrapper = mount(<NewBookmark />);

    const urlInput = wrapper
        .find('TextInput')
        .findWhere(testInput => testInput.prop('testID') === "url")
        .first();

    urlInput.props().onChangeText('wwwexamplecom');

    await new Promise(resolve => setImmediate(resolve))
    expect(bookmarkUrl).toStrictEqual('wwwexamplecom');

    const submitButton = wrapper
        .find('Button')
        .findWhere(button => button.prop('testID') === 'send')
        .first();
    
    submitButton.props().onPress();
    wrapper.update();

    await new Promise(resolve => setImmediate(resolve))
    expect(message).toStrictEqual('Internal service error');
    expect(error).toBeTruthy();
});