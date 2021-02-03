import React from 'react';
import render from 'react-test-renderer';

import Cell from "./cell";

describe('Cell', () => {
    it('renders correctly', () => {
        const props = {
            value: 'Test Cell'
        }

        const tree = render
            .create(<Cell {...props} />)
            .toJSON();

        expect(tree).toMatchSnapshot();
    })
})