const tokenStorageName = 'token';
const currentUserStorageName = 'currentUser';

const tokenStorage = {
    set: function (token) {
        localStorage.setItem(tokenStorageName, token);
    },
    get: function () {
        return JSON.parse(localStorage.getItem(tokenStorageName));
    },
    getString: function () {
        return localStorage.getItem(tokenStorageName);
    },
    remove: function () {
        localStorage.removeItem(tokenStorageName);
    },
};

const currentUserStorage = {
    set: function (user) {
        localStorage.setItem(currentUserStorageName, JSON.stringify(user));
    },
    get: function () {
        return JSON.parse(localStorage.getItem(currentUserStorageName));
    },
    getString: function () {
        return localStorage.getItem(currentUserStorageName);
    },
    remove: function () {
        localStorage.removeItem(currentUserStorageName);
    },
};

export { tokenStorage, currentUserStorage };
