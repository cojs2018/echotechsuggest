import * as Storage from './storage';

test('Create Bookmark', async () => {
    const urlString = 'http://www.example.com';

    global.fetch = jest.fn()
        .mockReturnValueOnce(new Promise((resolve, reject) => {
            resolve({
                json: jest.fn(() => new Promise((resolve, reject) => {
                    resolve({
                        status: 200,
                        message: "Bookmark created successfullty",
                    });
                })),
            });
        }));

    const createBookmarkResponse = await Storage.createBookmark(urlString);
    expect(createBookmarkResponse).toHaveProperty('status', 200);
});

test('List Bookmarks', async () => {
    global.fetch = jest.fn()
        .mockReturnValueOnce(new Promise((resolve, reject) => {
            resolve({
                json: jest.fn(() => new Promise((resolve, reject) => {
                    resolve({
                        staus: 200,
                        message: "3 bookmarks found",
                        Items: [
                            {
                                id: "0",
                                articleName: "article0 - articlearchive",
                                path: 'http://www.articlearchive.com/article0',
                                url: new URL('http://www.articlearchive.com/article0'),
                                createdAt: (new Date()).toUTCString(),
                                tags: []
                            },
                            {
                                id: "1",
                                articleName: "article1 - articlearchive",
                                path: 'http://www.articlearchive.com/article1',
                                url: new URL('http://www.articlearchive.com/article1'),
                                createdAt: (new Date()).toUTCString(),
                                tags: []
                            },
                            {
                                id: "2",
                                articleName: "article2 - articlearchive",
                                path: 'http://www.articlearchive.com/article2',
                                url: new URL('http://www.articlearchive.com/article2'),
                                createdAt: (new Date()).toUTCString(),
                                tags: [ "tag 1" ]
                            }
                        ]
                    });
                }))
            });
        }));

    const listBookmarksResponse = await Storage.listBookmarks();
    expect(listBookmarksResponse.length).toStrictEqual(3);
})

test('Get bookmark', async () => {
    const mockId = 'y028dnhsiEodWxos-sdis'

    global.fetch = jest.fn()
        .mockReturnValueOnce(new Promise((resolve, reject) => {
            resolve({
                json: jest.fn(() => new Promise((resolve, reject) => {
                    resolve({
                        status: 200,
                        message: `Bookmark ${mockId} found`,
                        Item: {
                            bookmarkId: mockId,
                            articleName: "article0 - articlearchive",
                            path: 'http://www.articlearchive.com/article0',
                            url: new URL('http://www.articlearchive.com/article0'),
                            createdAt: (new Date()).toUTCString(),
                            tags: []
                        }
                    });
                })),
            });
        }));

    const getBookmarkResponse = await Storage.getBookmark(mockId);
    expect(getBookmarkResponse).toHaveProperty("bookmarkId", mockId);
})

test('Update bookmark', async () => {
    const mockId = 'y028dnhsiEodWxos-sdis'
    const tags = {
        tags: ['tag1', 'tag2'],
    };

    global.fetch = jest.fn()
        .mockReturnValueOnce(new Promise((resolve, reject) => {
            resolve({
                json: jest.fn(() => new Promise((resolve, reject) => {
                    resolve({
                        status: 200,
                        message: `Bookmark ${mockId} updated successfullty`,
                    });
                })),
            });
        }));

    const updateBookmarkResponse = await Storage.updateBookmark(mockId, tags);
    expect(updateBookmarkResponse).toHaveProperty('status', 200);
})

test('Delete bookmark', async () => {
    const mockId = 'y028dnhsiEodWxos-sdis'

    global.fetch = jest.fn()
        .mockReturnValueOnce(new Promise((resolve, reject) => {
            resolve({
                json: jest.fn(() => new Promise((resolve, reject) => {
                    resolve({
                        status: 200,
                        message: `Bookmark ${mockId} deleted successfullty`,
                    });
                })),
            });
        }));

    const deleteBookmarkResponse = await Storage.deleteBookmark(mockId);
    expect(deleteBookmarkResponse).toHaveProperty('status', 200);
})

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

test('List Tags', async () => {
    global.fetch = jest.fn()
        .mockReturnValueOnce(new Promise((resolve, reject) => {
            resolve({
                json: jest.fn(() => new Promise((resolve, reject) => {
                    resolve({
                        status: 200,
                        message: `${tags.length} tags found!`,
                        Items: tags,
                    });
                }))
            })
        }));

    const listTagsResponce = await Storage.listTags();
    expect(listTagsResponce.length).toStrictEqual(4);
})