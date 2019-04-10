import React, {useState} from 'react';
import {useGlobal} from 'reactn';
import classNames from 'classnames';

import Content from 'Components/Content';

import {get as getStore} from 'Helpers/store';

import useMap from 'Hooks/useMap';

import ContentPrototype from 'Prototypes/Content';

import CheckSVG from 'Svg/check.svg';
import CloseSVG from 'Svg/close.svg';
import PlusSVG from 'Svg/plus.svg';

import globalStyles from 'Sass/global.scss';
import styles from './styles.scss';

function Hook({name}) {
    const [isLogged] = useGlobal('isLogged');
    const [showForm, setShowForm] = useState(false);
    const [, addNotification] = useGlobal('notifications');
    const hooks = getStore('hooks');
    const hookContents = getStore('hookContents');

    const hook = hooks.get(name);

    if (!hook) {
        return null;
    }

    const filteredHookContents = [...hookContents.values()].filter(({belongsTo}) => belongsTo === hook._id);

    const [contents, addContent] = useMap(filteredHookContents.map(content => [content._id, content]));

    if (!isLogged && contents.length === 0) {
        return null;
    }

    const headingRef = React.createRef();
    const inputRef = React.createRef();

    const createContent = async () => {
        const contentModel = new ContentPrototype();

        try {
            const {data: contentData} = await contentModel.create({
                belongsTo: hook._id,
                heading: headingRef.current.value,
                text: inputRef.current.value,
            });

            addContent(contentData._id, contentData);
            setShowForm(false);
        } catch (e) {
            addNotification(e.message, 'error');
        }


    };

    return (
        <div className={classNames(globalStyles.wrapper, styles.wrapper)}>
            {isLogged && (
                <div>
                    <h3>{name}</h3>
                    {!showForm && <PlusSVG onClick={() => setShowForm(true)} className={styles.plus}/>}
                </div>
            )}
            {showForm && (
                <>
                    <input ref={headingRef} type={'text'} placeholder={'Nadpis'}/>
                    <textarea ref={inputRef} placeholder={'Text'}/>
                    <CheckSVG onClick={() => createContent()} className={styles.add}/>
                    <CloseSVG onClick={() => setShowForm(false)} className={styles.close}/>
                </>
            )}
            {[...contents.values()].map(content => <Content key={content._id} content={content}/>)}
        </div>
    )
}

export default Hook;