import React from 'react';
import {useGlobal} from 'reactn';

import HookContents from 'Components/HookContents';
import HookEdit from 'Components/HookEdit';

import useGlobalMap from 'Hooks/useGlobalMap';

function Hook({name}) {
    const [isLogged] = useGlobal('isLogged');
    const [hooks] = useGlobalMap('hooks');
    const [hookContents] = useGlobalMap('hookContents');

    const hook = hooks.get(name);

    if (!hook) {
        return null;
    }

    const filteredHookContents = [...hookContents.values()].filter(({belongsTo}) => belongsTo.toString() === hook._id.toString());
    const contents = new Map(filteredHookContents.map(content => [content._id, content]));

    if (!isLogged && contents.size === 0) {
        return null;
    }

    return isLogged
        ? <HookEdit hook={hook} contents={contents} name={name}/>
        : <HookContents contents={contents}/>;
}

export default Hook;