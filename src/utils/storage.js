export async function createBookmark(bookmarkUrl) {
    return {
        status: 200,
        message: 'Bookmark created successfully!'
    }
}

export async function listBookmarks() {
    return [
        {
            bookmarkId: "0",
            articleName: "article0 - articlearchive",
            path: 'http://www.articlearchive.com/article0',
            url: new URL('http://www.articlearchive.com/article0'),
            createdAt: (new Date()).toUTCString(),
            tags: []
        },
        {
            bookmarkId: "1",
            articleName: "article1 - articlearchive",
            path: 'http://www.articlearchive.com/article1',
            url: new URL('http://www.articlearchive.com/article1'),
            createdAt: (new Date()).toUTCString(),
            tags: []
        },
        {
            bookmarkId: "2",
            articleName: "article2 - articlearchive",
            path: 'http://www.articlearchive.com/article2',
            url: new URL('http://www.articlearchive.com/article2'),
            createdAt: (new Date()).toUTCString(),
            tags: [ "tag 1" ]
        }
    ];
}

export async function deleteBookmark(bookmarkName) {
    return {
        status: 200,
        message: 'Bookmark deleted successfully!'
    }
}