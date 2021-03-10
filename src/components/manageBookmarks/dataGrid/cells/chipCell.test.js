import React from 'react';
import render from 'react-test-renderer';

import ChipCell from "./chipCell";

describe('Cell', () => {
    it('renders correctly', () => {
        const props = {
            values: [{
                tagId: 'tag0',
                value: 'Artificial Intelligence',
            }]
        }

        const tree = render
            .create(<ChipCell {...props} />)
            .toJSON();

        expect(tree).toMatchSnapshot();
    })
})