jest.mock('../newBookmark/newBookmark');
jest.mock('../manageBookmarks/manageBookmarks');

import React from 'react';
import render from 'react-test-renderer';
import { mount } from 'enzyme';

import NewBookmark from '../newBookmark/newBookmark';
import ManageBookmarks from '../manageBookmarks/manageBookmarks';
import Menu from './menu';

NewBookmark.mockReturnValue(<div><p>New Bookmark</p></div>);
ManageBookmarks.mockReturnValue(<div><p>Manage Bookmarks</p></div>);

describe('Menu', () => {
    it('renders correctly', () => {
        const tree = render
            .create(<Menu />)
            .toJSON();

        expect(tree).toMatchSnapshot();
    })
});

test('Page handlers', async () => {
    let page = 0;
    const setPage = jest.fn(async (newPage) => page = newPage);

    React.useState = jest.fn()
        .mockReturnValueOnce([page, setPage]);

    const wrapper = mount(<Menu />);

    const createButton = wrapper.find('button').find('#create').at(0);
    createButton.simulate('click');

    await new Promise(resolve => setImmediate(resolve))
    expect(page).toStrictEqual(1);

    const manageButton = wrapper.find('button').find('#manage').at(0);
    manageButton.simulate('click');

    await new Promise(resolve => setImmediate(resolve))
    expect(page).toStrictEqual(2);
});