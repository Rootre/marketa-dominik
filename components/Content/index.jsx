import React, {useState} from 'react';
import {useGlobal} from 'reactn';
import classNames from 'classnames';

import ContentPrototype from 'Prototypes/Content';

import BinSVG from 'Svg/bin.svg';
import CheckSVG from 'Svg/check.svg';
import CloseSVG from 'Svg/close.svg';

import globalStyles from 'Sass/global.scss';
import styles from './styles.scss';

function Content({content: {_id, heading, text: initialText}}) {
    const [editing, setEditing] = useState(false);
    const [deleted, setDeleted] = useState(false);
    const [text, setText] = useState(initialText);
    const [isLogged] = useGlobal('isLogged');
    const [, addNotifications] = useGlobal('notifications');

    const inputRef = React.createRef();

    const deleteContent = async () => {
        if (!confirm('Opravdu smazat?')) {
            return;
        }

        const content = new ContentPrototype();

        try {
            await content.deleteOne(_id);

            setDeleted(true);
        } catch (e) {
            addNotifications(e.message, 'error');
        }
    };

    const saveChanges = async () => {
        const content = new ContentPrototype();

        try {
            await content.update({_id}, {text: inputRef.current.value});
            setText(inputRef.current.value);
            setEditing(false);
        } catch (e) {
            addNotifications(e.message, 'error');
        }
    };

    const textClickHandler = () => {
        if (!isLogged) {
            return;
        }

        setEditing(true);
    };

    if (deleted) {
        return null;
    }

    return (
        <div className={classNames(globalStyles.wrapper, styles.wrapper, {
            [styles.isLogged]: isLogged,
            [styles.editing]: editing,
        })}>
            {heading && <h2>{heading}</h2>}
            <div className={styles.text} onClick={textClickHandler}>
                {editing ? <textarea ref={inputRef} defaultValue={text}/> : text}
            </div>
            {isLogged && (
                <div className={styles.controls}>
                    {editing && (
                        <>
                            <CheckSVG onClick={() => saveChanges()} className={styles.save}/>
                            <CloseSVG onClick={() => setEditing(false)} className={styles.close}/>
                        </>
                    )}
                    <BinSVG onClick={() => deleteContent()} className={styles.bin}/>
                </div>
            )}
        </div>
    )
}

export default Content;