import React from 'react';
import render from 'react-test-renderer';
import { mount } from 'enzyme';

import CheckboxCell from "./checkboxCell";

describe('CheckboxCell', () => {
    it('renders correctly', () => {
        const props = {
            rowId: 0,
            onChecked: jest.fn()
        }

        const tree = render
            .create(<CheckboxCell {...props} />)
            .toJSON();

        expect(tree).toMatchSnapshot();
    });

    it('handles actions when checked', async () => {
        const props = {
            rowId: 0,
            onChecked: jest.fn(rowId => console.log(`Row ${rowId} has been checked`)),
        }

        let checked = false;
        const setChecked = jest.fn(async (bool) => checked = bool);

        React.useState = jest.fn()
            .mockReturnValueOnce([checked, setChecked]);

        const wrapper = mount(<CheckboxCell {...props} />);

        const checkbox = wrapper.find('Checkbox').first();

        checkbox.props().onPress();
        wrapper.update();

        await new Promise(resolve => setImmediate(resolve));
        expect(checked).toBeTruthy();
    })
});