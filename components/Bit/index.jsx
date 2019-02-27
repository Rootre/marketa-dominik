import React from 'react';
import classNames from 'classnames';

import styles from './styles.scss';

function Bit({even, image, text, title}) {
    return (
        <div className={classNames(styles.wrapper, {
            [styles.even]: even,
        })}>
            <div className={styles.content}>
                <h3 className={styles.heading}>{title}</h3>
                <div className={styles.text}>{text}</div>
            </div>
            <img className={styles.image} src={image} alt={title}/>
        </div>
    )
}

export default Bit;