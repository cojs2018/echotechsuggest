jest.mock('../../utils/storage');
jest.mock('./tagList/tagList');

import React from 'react';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';
import ViewBookmark from './viewBookmark';
import TagList from './tagList/tagList';
import { getBookmark, deleteBookmark } from '../../utils/storage';
import { View } from 'react-native';
import { Text } from 'react-native-paper';

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

getBookmark.mockReturnValue(new Promise((resolve, reject) => {
    resolve({
        bookmarkId: '047ec796-2eca-417e-865a-e2e187b97689',
        articleName: 'breakthrough-for-healthcare-agriculture-energy-artificial-intelligence-reveals-recipe-for-building-artificial-proteins - scitechdaily',
        path: 'https://scitechdaily.com/breakthrough-for-healthcare-agriculture-energy-artificial-intelligence-reveals-recipe-for-building-artificial-proteins/',
        url: {},
        title: 'Breakthrough for Healthcare, Agriculture, Energy: Artificial Intelligence Reveals Recipe for Building Artificial Proteins',
        description: 'Proteins are essential to cells, carrying out complex tasks and catalyzing chemical reactions. Scientists and engineers have long sought to harness this power by designing artificial proteins that can perform new tasks, like treat disease, capture carbon or harvest energy, but many of the processes',
        tags,
        images: [],
    })
}));

TagList.mockReturnValue(<View>
    {tags.map(tag => <Text>{tag.value}</Text>)}
</View>);

describe('ViewBookmark', () => {
    const props = {
        bookmarkIdSelected: '047ec796-2eca-417e-865a-e2e187b97689',
        setPage: jest.fn(async () => {}),
    }

    it('reders correctly', () => {
        const tree = renderer
            .create(<ViewBookmark {...props} />)
            .toJSON();

        expect(tree).toMatchSnapshot();
    })
});

test('Close', async () => {
    let page = 3;

    const props = {
        bookmarkIdSelected: '047ec796-2eca-417e-865a-e2e187b97689',
        setPage: jest.fn(async (newPage) => page = newPage),
    }

    const wrapper = mount(<ViewBookmark {...props} />);

    const closeIcon = wrapper
        .find('IconButton')
        .filterWhere(iconButton => iconButton.props().icon === 'close')
        .first();

    closeIcon.props().onPress();
    wrapper.update();

    await new Promise(resolve => setImmediate(resolve));
    expect(page).toStrictEqual(2);
})

test('Delete', async () => {
    let page = 3;

    const props = {
        bookmarkIdSelected: '047ec796-2eca-417e-865a-e2e187b97689',
        setPage: jest.fn(async (newPage) => page = newPage),
    }

    /* let isLoading = false;
    let details = {
        bookmarkId: '047ec796-2eca-417e-865a-e2e187b97689',
        articleName: '',
        path: 'No Path',
        url: 'No URL',
        title: 'No Title',
        description: 'No description',
        tags: [],
        images: [],
    };
    let alertMessage = {
        status: 'none',
        message: ''
    };
    let visible = false;

    const setIsLoading = jest.fn(async (bool) => isLoading = bool);
    const setDetails = jest.fn(async (loadedDetails) => details = loadedDetails);
    const setAlertMessage = jest.fn(async (newMessage) => alertMessage = newMessage);
    const setVisible = jest.fn(async (bool) => visible = bool);

    React.useEffect = jest.fn()
        .mockImplementationOnce((effect, deps = null) => effect());
    
    React.useState = jest.fn()
        .mockReturnValueOnce([isLoading, setIsLoading])
        .mockReturnValueOnce([details, setDetails])
        .mockReturnValueOnce([alertMessage, setAlertMessage])
        .mockReturnValueOnce([visible, setVisible]); */

    deleteBookmark.mockReturnValueOnce(new Promise((resolve, reject) => {
        resolve({
            status: 200,
            message: `Bookmark ${props.bookmarkIdSelected} Deleted Successfully!`
        });
    }));

    const wrapper = mount(<ViewBookmark {...props} />);

    const deleteIcon = wrapper
        .find('IconButton')
        .filterWhere(iconButton => iconButton.props().icon === 'delete')
        .first();

    deleteIcon.props().onPress();
    wrapper.update();

    await new Promise(resolve => setImmediate(resolve));
    //expect(alertMessage.status).toStrictEqual('success');
})