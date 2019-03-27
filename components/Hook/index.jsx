import React, {useState, useEffect} from 'react';
import {useGlobal} from 'reactn';
import classNames from 'classnames';

import Content from 'Components/Content';

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
    const [contents, setContents] = useState([]);

    const headingRef = React.createRef();
    const inputRef = React.createRef();

    const addContent = async () => {

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

        contentData && setContents(contentData);
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
                    <CheckSVG onClick={() => addContent()} className={styles.add}/>
                    <CloseSVG onClick={() => setShowForm(false)} className={styles.close}/>
                </>
            )}
            {contents.map(content => <Content content={content}/>)}
        </div>
    )
}

export default Hook;