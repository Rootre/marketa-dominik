import React from 'react';
import classNames from 'classnames';

import globalStyles from 'Sass/global.scss';
import styles from './styles.scss';

function {{name}}() {
    return (
        <div className={classNames(globalStyles.wrapper, styles.wrapper)}>
            <p>{{name}} Component</p>
        </div>
    )
}

export default {{name}};