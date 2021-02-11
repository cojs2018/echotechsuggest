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