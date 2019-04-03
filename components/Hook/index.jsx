import React, {useState, useEffect} from 'react';
import {useGlobal} from 'reactn';
import classNames from 'classnames';

import Content from 'Components/Content';

import useMap from 'Hooks/useMap';

import ContentPrototype from 'Prototypes/Content';
import HookPrototype from 'Prototypes/Hook';

import CheckSVG from 'Svg/check.svg';
import CloseSVG from 'Svg/close.svg';
import PlusSVG from 'Svg/plus.svg';

import globalStyles from 'Sass/global.scss';
import styles from './styles.scss';

function Hook({name}) {
    const [isLogged] = useGlobal('isLogged');
    const [showForm, setShowForm] = useState(false);
    const [hook, setHook] = useState(null);
    const [contents, addContent] = useMap();
    const [, addNotification] = useGlobal('notifications');

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
    const fetchHook = async () => {
        const hookModel = new HookPrototype();
        const contentModel = new ContentPrototype();
        const hookData = await hookModel.get(name);

        if (!hookData) {
            console.error('Hook not found:', name);
            return false;
        }

        const contentData = await contentModel.get(hookData._id);

        contentData && contentData.map(content => addContent(content._id, content));
        setHook(hookData);
    };

    useEffect(() => {
        fetchHook();
    }, []);

    if (!hook || !isLogged && contents.length === 0) {
        return null;
    }

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