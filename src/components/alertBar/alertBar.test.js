import React from 'react';
import render from 'react-test-renderer';

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
})