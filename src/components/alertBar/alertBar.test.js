import React from 'react';
import render from 'react-test-renderer';
import { mount } from 'enzyme';

import AlertBar from './alertBar';

describe('AlertBar', () => {

    it('renders correctly', () => {
        const props = {
            visible: true,
            setVisible: jest.fn((bool) => visible = bool),
            severity: 'success',
            message: 'This is a test alert message'
        }

        const tree = render
            .create(<AlertBar {...props} />)
            .toJSON();

        expect(tree).toMatchSnapshot();
    })
});

test('Action', async () => {
    const props = {
        visible: true,
        setVisible: jest.fn((bool) => visible = bool),
        severity: 'success',
        message: 'This is a test alert message'
    };

    const wrapper = mount(<AlertBar {...props} />);

    const closeButton = wrapper
        .find('Button')
        .filterWhere(button => button.text() === 'Close')
        .first();

    closeButton.props().onPress();
    wrapper.update();

    await new Promise(resolve => setImmediate(resolve));
    expect(visible).toBeFalsy();
})