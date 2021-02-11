import { bookmarksAPI } from './constants';

export async function createBookmark(bookmarkUrl) {
    const bookmarkBody = {
        path: bookmarkUrl,
        url: new URL(bookmarkUrl),
    }
    bookmarkBody["articleName"] = `${bookmarkBody.url.pathname} - ${bookmarkBody.url.hostname}`;

    const request = {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        headers: {
            "Content-Type": 'application/json',
        },
        body: JSON.stringify(bookmarkBody),
    };

    return fetch(bookmarksAPI, request)
        .then(onfulfilled => {
            return onfulfilled.json();
        })
        .catch(reasonForError => {
            throw new Error(reasonForError);
        });
};

export async function listBookmarks() {
    const request = {
        method: 'GET',
        mode: 'cors',
        cache: 'no-cache',
        headers: {
            "Content-Type": 'application/json',
        },
    };

    return fetch(bookmarksAPI, request)
        .then(onfulfilled => {
            return onfulfilled.json()
                .then(response => response.Items);
        })
        .catch(reasonForError => {
            throw new Error(reasonForError);
        });
}

export async function getBookmark(bookmarkId) {
    const bookmarkBody = {
        params: {
            path: {
                bookmarkId,
            }
        }
    }

    const request = {
        method: 'GET',
        mode: 'cors',
        cache: 'no-cache',
        headers: {
            "Content-Type": 'application/json',
        },
        body: JSON.stringify(bookmarkBody),
    };

    return fetch(`${bookmarksAPI}/bookmarks`, request)
        .then(onfulfilled => {
            return onfulfilled.json()
                .then(response => response.Item);
        })
        .catch(reasonForError => {
            throw new Error(reasonForError);
        });
}

export async function updateBookmark(bookmarkId, updatedBookmark) {
    const bookmarkBody = {
        params: {
            path: {
                bookmarkId,
            }
        },
        body: {
            ...updatedBookmark,
        }
    }

    const request = {
        method: 'PATCH',
        mode: 'cors',
        cache: 'no-cache',
        headers: {
            "Content-Type": 'application/json',
        },
        body: JSON.stringify(bookmarkBody),
    };

    return fetch(`${bookmarksAPI}/bookmarks`, request)
        .then(onfulfilled => {
            return onfulfilled.json()
        })
        .catch(reasonForError => {
            throw new Error(reasonForError);
        });
}

export async function deleteBookmark(bookmarkId) {
    const bookmarkBody = {
        params: {
            path: {
                bookmarkId,
            }
        }
    }

    const request = {
        method: 'DELETE',
        mode: 'cors',
        cache: 'no-cache',
        headers: {
            "Content-Type": 'application/json',
        },
        body: JSON.stringify(bookmarkBody),
    };

    return fetch(`${bookmarksAPI}/bookmarks`, request)
        .then(onfulfilled => {
            return onfulfilled.json();
        })
        .catch(reasonForError => {
            throw new Error(reasonForError);
        });
}

