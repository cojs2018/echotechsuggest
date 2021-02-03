import React from 'react';
import render from 'react-test-renderer';

import HeaderCell from "./headerCell";

describe('HeaderCell', () => {
    it('renders correctly', () => {
        const props = {
            field: 'columnId',
            headerName: 'Column Name',
            width: 25
        }

        const tree = render
            .create(<HeaderCell {...props} />)
            .toJSON();

        expect(tree).toMatchSnapshot();
    })
})