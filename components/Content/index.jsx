import React, {useEffect, useState} from 'react';
import {useGlobal} from 'reactn';
import classNames from 'classnames';

import ContentPrototype from 'Prototypes/Content';

import BinSVG from 'Svg/bin.svg';

import globalStyles from 'Sass/global.scss';
import styles from './styles.scss';
import EditContent from "../EditContent";

function Content({content: {_id, heading, text: initialText}}) {
    const [editing, setEditing] = useState(false);
    const [deleted, setDeleted] = useState(false);
    const [text, setText] = useState(initialText);
    const [isLogged] = useGlobal('isLogged');
    const [, addNotifications] = useGlobal('notifications');

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

    const saveChanges = async (textInput) => {
        const content = new ContentPrototype();

        try {
            await content.update({_id}, {text: textInput.value});
            setText(textInput.value);
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
            {editing
                ? <EditContent saveChanges={saveChanges} setClose={() => setEditing(false)} text={text}/>
                : <div className={styles.text} onClick={textClickHandler}>{text}</div>
            }
            {isLogged && (
                <div className={styles.controls}>
                    <BinSVG onClick={() => deleteContent()} className={styles.bin}/>
                </div>
            )}
        </div>
    )
}

export default Content;