import React, {useState, useEffect} from 'react';
import classNames from 'classnames';

import ContentPrototype from 'Prototypes/Content';
import HookPrototype from 'Prototypes/Hook';

import Content from 'Components/Content';

import globalStyles from 'Sass/global.scss';
import styles from './styles.scss';

function Hook({id}) {
    const [hook, setHook] = useState(null);
    const [contents, setContents] = useState([]);

    const fetchHook = async () => {
        const hookModel = new HookPrototype();
        const contentModel = new ContentPrototype();
        const hookData = await hookModel.get(id);
        const contentData = await contentModel.get(hookData._id);

        contentData && setContents(contentData);
        setHook(hookData);
    };

    useEffect(() => {
        fetchHook();
    }, []);

    if (contents.length === 0) {
        return null;
    }

    return (
        <div className={classNames(globalStyles.wrapper, styles.wrapper)}>
            {contents.map(content => <Content content={content}/>)}
        </div>
    )
}

export default Hook;