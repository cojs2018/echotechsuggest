import React from 'react';
import render from 'react-test-renderer';
import { mount } from 'enzyme';
import NewBookmark from './newBookmark';

describe('New Bookmark', () => {
    it('renders correctly', () => {
        const tree = render
            .create(<NewBookmark />)
            .toJSON();

        expect(tree).toMatchSnapshot();
    })
})

test('Add url and submit', () => {
    let bookmarkUrl = '';
    let message = '';

    const setBookmarkUrl = jest.fn(async (newUrl) => bookmarkUrl = newUrl);
    const setMessage = jest.fn(async (newMessage) => message = newMessage);

    React.useState = jest.fn()
        .mockReturnValueOnce([bookmarkUrl, setBookmarkUrl])
        .mockReturnValueOnce([message, setMessage]);

    const wrapper = mount(<NewBookmark />);

    const urlInput = wrapper.find('#url').find('input').at(0);
    
    const eventPayload = { target: { value: 'www.example.com' } };
    urlInput.simulate('change', eventPayload);

    return new Promise(resolve => setImmediate(resolve))
        .then(() => {
            expect(setBookmarkUrl).toHaveBeenCalled();

            const submitButton = wrapper.find('#submit').find('button').at(0);
            submitButton.simulate('click');

            return new Promise(resolve => setImmediate(resolve))
                .then(() => {
                    expect(setMessage).toHaveBeenCalled();
                })
        })
})