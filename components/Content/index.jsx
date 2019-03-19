import React from 'react';
import classNames from 'classnames';

import globalStyles from 'Sass/global.scss';
import styles from './styles.scss';

function Content({content: {heading, text}}) {
    return (
        <div className={classNames(globalStyles.wrapper, styles.wrapper)}>
            {heading && <h2>{heading}</h2>}
            <div className={styles.text}>
                {text}
            </div>
        </div>
    )
}

export default Content;