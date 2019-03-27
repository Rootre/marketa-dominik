import React, {useState} from 'react';
import {useGlobal} from 'reactn';
import classNames from 'classnames';

import HookPrototype from 'Prototypes/Hook';
import ContentPrototype from 'Prototypes/Content';

import useGlobalMap from 'Hooks/useGlobalMap';

import BinSVG from 'Svg/bin.svg';
import CloseSVG from 'Svg/close.svg';
import PlusSVG from 'Svg/plus.svg';

import globalStyles from 'Sass/global.scss';
import styles from './styles.scss';

function AdminHooks() {
    const [hooks, addHook, removeHook] = useGlobalMap('hooks');
    const [addNotification] = useGlobal('notifications');
    const [showForm, setShowForm] = useState(false);

    const inputRef = React.createRef();

    const createHook = async () => {
        const hook = new HookPrototype();

        try {
            const {data: newHook} = await hook.create({name: inputRef.current.value});

            addHook(newHook._id, newHook);
            setShowForm(false);
        } catch (e) {
            addNotification(e.message, 'error');
        }
    };

    const deleteHandler = async id => {
        if (!confirm('Opravdu smazat?')) {
            return;
        }

        const hook = new HookPrototype();
        const content = new ContentPrototype();

        try {
            await hook.deleteOne(id);
            await content.deleteMany({belongsTo: id});

            removeHook(id);
        } catch (e) {
            addNotification(e.message, 'error');
        }
    };

    const keyUpHandler = e => {
        if (e.keyCode === 13) {
            createHook();
        }
    };

    return (
        <div className={classNames(globalStyles.wrapper, styles.wrapper)}>
            <h2>Správa hooků</h2>
            {showForm
                ? (
                    <>
                        <input placeholder={'Jméno'} ref={inputRef} defaultValue={''} onKeyUp={keyUpHandler}/>
                        <CloseSVG onClick={() => setShowForm(false)} className={styles.close}/>
                    </>
                )
                : <span className={styles.add} onClick={() => setShowForm(true)}><PlusSVG/> Přidat hook</span>
            }
            <ul>
                {[...hooks.values()].map(({_id, name}) => (
                    <li key={_id}>{name} <BinSVG onClick={() => deleteHandler(_id)} className={styles.delete}/></li>
                ))}
            </ul>
        </div>
    )
}

export default AdminHooks;