const store = new Map();

export function add(key, value = true) {
    store.set(key, value);
}
export function get(key) {
    return store.get(key);
}
export function has(key) {
    return store.has(key);
}

export default store;