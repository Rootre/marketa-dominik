import React from 'react';
import classNames from 'classnames';

import Spinner from '../Spinner';

import styles from './styles.scss';

function Button({busy, className = '', gray, inline, label = '', red, small, type = 'submit', ...rest}) {

    return (
        <button
            type={type}
            className={classNames(styles.button, className, {
                [styles.gray]: gray,
                [styles.inline]: inline,
                [styles.red]: red,
                [styles.small]: small,
            })}
            {...rest}
        >
            {busy ? <Spinner/> : label}
        </button>
    );
}

export default Button;