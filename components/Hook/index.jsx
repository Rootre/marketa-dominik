import React, {useState} from 'react';
import {useGlobal} from 'reactn';
import classNames from 'classnames';

import Content from 'Components/Content';

import useGlobalMap from 'Hooks/useGlobalMap';
import useMap from 'Hooks/useMap';

import ContentPrototype from 'Prototypes/Content';

import PlusSVG from 'Svg/plus.svg';

import globalStyles from 'Sass/global.scss';
import styles from './styles.scss';
import EditContent from "../EditContent";

function Hook({name}) {
    const [isLogged] = useGlobal('isLogged');
    const [showForm, setShowForm] = useState(false);
    const [, addNotification] = useGlobal('notifications');
    const [hooks] = useGlobalMap('hooks');
    const [hookContents] = useGlobalMap('hookContents');

    const hook = hooks.get(name);

    if (!hook) {
        return null;
    }

    const filteredHookContents = [...hookContents.values()].filter(({belongsTo}) => belongsTo === hook._id);

    const [contents, addContent] = useMap(new Map(filteredHookContents.map(content => [content._id, content])));

    if (!isLogged && contents.length === 0) {
        return null;
    }

    const createContent = async (textValue) => {
        const contentModel = new ContentPrototype();

        try {
            const {data: contentData} = await contentModel.create({
                belongsTo: hook._id,
                text: textValue,
            });

            addContent(contentData._id, contentData);
            setShowForm(false);
        } catch (e) {
            addNotification(e.message, 'error');
        }
    };

    if (isLogged) {
        return (
            <div className={classNames(globalStyles.wrapper, styles.wrapper)}>
                <div className={styles.intro}>
                    {!showForm && (
                        <span onClick={() => setShowForm(true)} title={'Přidat nový obsah'}>
                        <PlusSVG className={styles.plus}/>
                    </span>
                    )}
                    <p>Hook {name}:</p>
                </div>
                {showForm && <EditContent className={styles.editor} saveChanges={createContent} setClose={() => setShowForm(false)}/>}
                {[...contents.values()].map(content => <Content key={content._id} content={content}/>)}
            </div>
        )
    }

    return (
        <>
            {[...contents.values()].map(content => <Content key={content._id} content={content}/>)}
        </>
    )
}

export default Hook;