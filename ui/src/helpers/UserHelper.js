export function getCurrentUser() {
    return JSON.parse(localStorage.getItem('userToken'));
}

export function isAuthenticated() {
    const user = getCurrentUser()
    return !!user;
}