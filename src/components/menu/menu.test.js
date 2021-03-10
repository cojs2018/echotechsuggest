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

const props = {
    switchValue: false, 
    handleSwitch: jest.fn(async () => {}),
}

describe('Menu', () => {
    it('renders correctly', () => {
        const tree = render
            .create(<Menu {...props} />)
            .toJSON();

        expect(tree).toMatchSnapshot();
    })
});

test('Menu buttons', async () => {
    let page = 0;
    const setPage = jest.fn(async (newPage) => page = newPage);
    let bookmarkIdSelected = '';
    const setBookmarkIdSelected = jest.fn(async (newBookarkId) => bookmarkIdSelected = newBookarkId);

    React.useState = jest.fn()
        .mockReturnValueOnce([page, setPage])
        .mockReturnValueOnce([bookmarkIdSelected, setBookmarkIdSelected]);

    const wrapper = mount(<Menu />);

    const createButton = wrapper
        .find('Button')
        .findWhere(button => button.prop('testID') === "create")
        .first();

    createButton.props().onPress();
    wrapper.update();

    await new Promise(resolve => setImmediate(resolve))
    expect(page).toStrictEqual(1);

    const manageButton = wrapper
        .find('Button')
        .findWhere(button => button.prop('testID') === "manage")
        .first();

    manageButton.props().onPress();
    wrapper.update();

    await new Promise(resolve => setImmediate(resolve))
    expect(page).toStrictEqual(2);
});