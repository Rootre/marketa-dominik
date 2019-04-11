import React from 'react';

import Content from 'Components/Content';

import styles from './styles.scss';

function HookContents({contents}) {
    return (
        <div className={styles.wrapper}>
            {[...contents.values()].map(content => <Content key={content._id} content={content}/>)}
        </div>
    )
}

export default HookContents;