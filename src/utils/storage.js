import { writeFile } from 'fs';

export async function createBookmark(bookmarkUrl) {
    try {
        let bookmarkUrlList = require('../../bookmarkUrls.json');

        let bookmarkLocation = bookmarkUrl;
        if(!bookmarkLocation.includes('http')) {
            bookmarkLocation = `http://${bookmarkLocation}`;
        }

        const newUrlData = new URL(bookmarkLocation);

        const bookmarkJSON = {
            path: bookmarkUrl,
            url: newUrlData.toJSON(),
            createdAt: Date.now()
        }
        const articleName = `${newUrlData.pathname} - ${newUrlData.hostname}`;

        bookmarkUrlList[articleName] = bookmarkJSON;

        writeFile(
            '../../bookmarkUrls.json',
            JSON.stringify(bookmarkJSON, ' ', 4)
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

        delete bookmarkUrlList[bookmarkName]

        writeFile(
            '../../bookmarkUrls.json',
            JSON.stringify(bookmarkJSON, ' ', 4)
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