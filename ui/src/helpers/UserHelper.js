export function getCurrentUser() {
    return JSON.parse(localStorage.getItem('userToken'));
}

export function isAuthenticated() {
    const user = getCurrentUser()
    return !!user;
}

export function isAdmin() {
    const user = getCurrentUser()
    if (user) {
        return user.Role === "A";
    }

    return false;
}

export function isClient() {
    const user = getCurrentUser()
    if (user) {
        return user.Role === "C";
    }

    return false;
}