//guardar datos localmente

export function saveInfoUserLocalStorage(user) {
    const userString=JSON.stringify(user);
    localStorage.setItem('user', userString);
}

export function getInfoUserLocalStorage() {
    const userString=localStorage.getItem('user');
    const user=JSON.parse(userString);
    return user;
}