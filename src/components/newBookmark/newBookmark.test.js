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

    const setBookmarkUrl = jest.fn(async (newUrl) => bookmarkUrl = newUrl);
    const setMessage = jest.fn(async (newMessage) => message = newMessage);
    const setError = jest.fn(async (bool) => error = bool);

    React.useState = jest.fn()
        .mockReturnValueOnce([bookmarkUrl, setBookmarkUrl])
        .mockReturnValueOnce([message, setMessage])
        .mockReturnValueOnce([error, setError]);

    createBookmark.mockImplementationOnce((bookmarkURL) => new Promise((resolve, reject) => {
        resolve({
            status: 200,
            message: 'Bookmark created successfully!'
        })
    }))

    const wrapper = mount(<NewBookmark />);

    const urlInput = wrapper.find('#url').find('input').at(0);
    
    const eventPayload = { target: { value: 'www.example.com' } };
    urlInput.simulate('change', eventPayload);

    await new Promise(resolve => setImmediate(resolve))
    expect(bookmarkUrl).toStrictEqual(eventPayload.target.value);

    const submitButton = wrapper.find('#submit').find('button').at(0);
    submitButton.simulate('click');

    await new Promise(resolve => setImmediate(resolve))
    expect(message).toStrictEqual('Url has now been stored, please await your results.');
    expect(error).toBeFalsy();
});

test('error', async () => {
    let bookmarkUrl = '';
    let message = '';
    let error = false;

    const setBookmarkUrl = jest.fn(async (newUrl) => bookmarkUrl = newUrl);
    const setMessage = jest.fn(async (newMessage) => message = newMessage);
    const setError = jest.fn(async (bool) => error = bool);

    React.useState = jest.fn()
        .mockReturnValueOnce([bookmarkUrl, setBookmarkUrl])
        .mockReturnValueOnce([message, setMessage])
        .mockReturnValueOnce([error, setError]);

    createBookmark.mockImplementationOnce((bookmarkURL) => new Promise((resolve, reject) => {
        reject({
            status: 500,
            message: 'Not a url!'
        })
    }))

    const wrapper = mount(<NewBookmark />);

    const urlInput = wrapper.find('#url').find('input').at(0);
    
    const eventPayload = { target: { value: 'wwwexamplecom' } };
    urlInput.simulate('change', eventPayload);

    await new Promise(resolve => setImmediate(resolve))
    expect(bookmarkUrl).toStrictEqual(eventPayload.target.value);

    const submitButton = wrapper.find('#submit').find('button').at(0);
    submitButton.simulate('click');

    await new Promise(resolve => setImmediate(resolve))
    expect(message).toBeDefined();
    expect(error).toBeTruthy();
})