import React from 'react';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';

import Select from './select';

const tags = [
    {
        "tagId": "94972406-7158-4a27-8a44-52a33b854a74",
        "value": "Artificial Precipitation",
        "featured": 1
    },
    {
        "tagId": "18a2d966-fe32-4d05-9543-fcee703f718c",
        "value": "Energy",
        "featured": 1
    },
    {
        "tagId": "52d91ec3-a18b-4864-8438-56cfd759528c",
        "value": "Quantum Computing",
        "featured": 2
    },
    {
        "tagId": "8b48abe0-98df-4c33-99d4-543ff3f4bf54",
        "value": "Biotechnology",
        "featured": 1
    }
]

describe('Select', () => {

    const mockFn = jest.fn(tag => { console.log(tag) })

    const props = {
        items: tags.map(tag => ({
            tag,
            presshandler: jest.fn(() => mockFn(tag))
        }))
    }

    it('renders correctly', () => {
        const tree = renderer
            .create(<Select {...props} />)
            .toJSON();

        expect(tree).toMatchSnapshot();
    })
});