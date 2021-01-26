import { writeFile } from 'fs';

export async function createBookmark(bookmarkUrl) {
    try {
        let bookmarkUrlList = require('../../bookmarkUrls.json');

        let bookmarkLocation = bookmarkUrl;
        if(!bookmarkLocation.includes('http')) {
            bookmarkLocation = `http://${bookmarkLocation}`;
        }

        const newUrlData = new URL(bookmarkLocation);
        const articleName = `${newUrlData.pathname} - ${newUrlData.hostname}`;

        const bookmarkJSON = {
            articleName,
            path: bookmarkLocation,
            url: newUrlData,
            createdAt: (new Date()).toUTCString(),
        }

        bookmarkUrlList.push(bookmarkJSON);

        writeFile(
            '../../bookmarkUrls.json',
            JSON.stringify(bookmarkUrlList, ' ', 4)
        )

        return {
            status: 200,
            message: 'Bookmark created successfully!'
        }
    }
    catch (error) {
        throw new Error(JSON.stringify({ 
            status: 500,
            message: 'Internal service error: Could not create bookmark!' 
        }));
    }
}

export async function listBookmarks() {
    const bookmarkUrlList = require('../../bookmarkUrls.json');
    return bookmarkUrlList;
}

export async function deleteBookmark(bookmarkName) {
    try {
        let bookmarkUrlList = require('../../bookmarkUrls.json');
        
        if(!bookmarkUrlList[bookmarkName]) {
            return {
                status: 200,
            }
        }

        const bookmarkIndex = bookmarkUrlList
            .findIndex(bookmark => {
                bookmark.articleName = bookmarkName;
            })

        bookmarkUrlList.splice();

        writeFile(
            '../../bookmarkUrls.json',
            JSON.stringify(bookmarkUrlList, ' ', 4)
        )

        return {
            status: 200,
            message: 'Bookmark deleted successfully!'
        }
    }
    catch (error) {
        throw new Error(JSON.stringify({ 
            status: 500,
            message: 'Internal service error: Could not delete bookmark!' 
        }));
    }
}