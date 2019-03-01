import React from 'react';
import classNames from 'classnames';

import styles from './styles.scss';

function Gift({gift: {image, name, reserved, url}}) {
    return (
        <div className={classNames(styles.wrapper, {
            [styles.withImage]: !!image,
            [styles.reserved]: reserved,
        })}>
            {image && <img src={image} alt={name} className={styles.image}/>}
            <a href={url} className={styles.name} target={'_blank'}>{name}</a>
            <em className={styles.status}>{reserved ? 'reserved' : 'free'}</em>
        </div>
    )
}

export default Gift;