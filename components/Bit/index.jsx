import React from 'react';
import classNames from 'classnames';

import LazyImage from 'Components/LazyImage';

import styles from './styles.scss';

function Bit({even, image, text, title}) {
    return (
        <div className={classNames(styles.wrapper, {
            [styles.even]: even,
        })}>
            <div className={styles.content}>
                <h3 className={styles.heading}>{title}</h3>
                <div className={styles.text} dangerouslySetInnerHTML={{__html: text}}/>
            </div>
            <LazyImage className={styles.image} src={image} alt={title}/>
        </div>
    )
}

export default Bit;