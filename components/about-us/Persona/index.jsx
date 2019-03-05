import React from 'react';
import classNames from 'classnames';

import LazyImage from 'Components/LazyImage';

import styles from './styles.scss';

function Bride({author, bride, groom, image, text, title}) {
    return (
        <div className={styles.wrapper}>
            <LazyImage src={image} alt={title}/>
            <div className={classNames(styles.content, {
                [styles.bride]: bride,
                [styles.groom]: groom,
            })}>
                <h3 className={styles.heading}>{title}</h3>
                <p>{text}</p>
                <em>{author}</em>
            </div>
        </div>
    )
}

export default Bride;