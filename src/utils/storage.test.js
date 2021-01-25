jest.mock('fs');

import { writeFile } from 'fs';
import * as Storage from './storage';

test('Create Bookmark', async () => {
    writeFile.mockImplementationOnce((path, dataToWrite) => {
        console.log(path);
        console.log(dataToWrite);
    })

    const urlString = 'www.example.com'

    const createBookmarkResponce = await Storage.createBookmark(urlString);
    expect(createBookmarkResponce).toHaveProperty('status', 200);
});

test('List Bookmarks', async () => {
    const listBookmarksResponce = await Storage.listBookmarks();
    expect(listBookmarksResponce).toBeTruthy();
})

test('Delete bookmark', async () => {
    writeFile.mockImplementationOnce((path, dataToWrite) => {
        console.log(path);
        console.log(dataToWrite);
    })

    const urlString = 'www.example.com'

    const deleteBookmarkResponce = await Storage.deleteBookmark(urlString);
    expect(deleteBookmarkResponce).toHaveProperty('status', 200);
})