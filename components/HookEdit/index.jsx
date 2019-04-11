import React, {useState} from 'react';
import {useGlobal} from 'reactn';

import EditContent from 'Components/EditContent';
import Content from 'Components/Content';

import ContentPrototype from 'Prototypes/Content';

import PlusSVG from 'Svg/plus.svg';

import styles from './styles.scss';
import useGlobalMap from "../../hooks/useGlobalMap";

function HookEdit({contents, hook, name}) {
    const [, addNotification] = useGlobal('notifications');
    const [, addHookContent] = useGlobalMap('hookContents');
    const [showForm, setShowForm] = useState(false);

    const createContent = async (textValue) => {
        const contentModel = new ContentPrototype();

        try {
            const {data: contentData} = await contentModel.create({
                belongsTo: hook._id,
                text: textValue,
            });

            addHookContent(contentData._id, contentData);
            setShowForm(false);
        } catch (e) {
            addNotification(e.message, 'error');
        }
    };

    return (
        <div className={styles.wrapper}>
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

export default HookEdit;