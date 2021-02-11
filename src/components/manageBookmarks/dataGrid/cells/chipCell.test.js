import React from 'react';
import render from 'react-test-renderer';

import ChipCell from "./chipCell";

describe('Cell', () => {
    it('renders correctly', () => {
        const props = {
            values: ['tag0', 'tag1', 'tag2']
        }

        const tree = render
            .create(<ChipCell {...props} />)
            .toJSON();

        expect(tree).toMatchSnapshot();
    })
})