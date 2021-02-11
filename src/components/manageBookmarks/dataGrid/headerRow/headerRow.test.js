import React from 'react';
import render from 'react-test-renderer';

import HeaderRow from './headerRow';

describe('HeaderRows', () => {
    it('renders correctly', () => {
        const tree = render
            .create(<HeaderRow />)
            .toJSON();

        expect(tree).toMatchSnapshot();
    })
})