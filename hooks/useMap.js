import React, {useState} from 'react';

function useMap(initialState = []) {
    const [map, setMap] = useState(new Map(initialState));

    function addItem(id, item) {
        setMap(map.set(id, item));
    }

    function deleteItem(id) {
        map.delete(id);
        setMap(map);
    }

    return [map, addItem, deleteItem];
}

export default useMap;