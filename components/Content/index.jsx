import React, {useState} from 'react';
import {useGlobal} from 'reactn';
import classNames from 'classnames';

import ContentPrototype from 'Prototypes/Content';
import {getHTMLFromStringifiedState} from 'Helpers/wysiwyg';

import BinSVG from 'Svg/bin.svg';

import styles from './styles.scss';
import EditContent from "../EditContent";

/**
 * @return {null}
 */
function Content({content: {_id, text: initialText}}) {
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

    const saveChanges = async (textValue) => {
        const content = new ContentPrototype();

        try {
            await content.update({_id}, {text: textValue});
            setText(textValue);
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

    if (isLogged) {
        return (
            <div className={classNames(styles.wrapper, styles.isLogged, {
                [styles.editing]: editing,
            })}>
                {editing
                    ? <EditContent saveChanges={saveChanges} setClose={() => setEditing(false)} text={text}/>
                    : <div className={styles.text} onClick={textClickHandler} dangerouslySetInnerHTML={{__html: getHTMLFromStringifiedState(text)}}/>
                }
                <BinSVG onClick={() => deleteContent()} className={styles.bin}/>
            </div>
        )
    }

    return <div dangerouslySetInnerHTML={{__html: getHTMLFromStringifiedState(text)}}/>;
}

export default Content;