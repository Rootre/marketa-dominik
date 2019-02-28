import React from 'react';

import styles from './styles.scss';

function Gift({gift: {image, name, reserved, url}}) {
    return (
        <div className={styles.wrapper}>
            {image && <img src={image} alt={name} className={styles.image}/>}
            <p>
                <a href={url}>{name}</a>
                {reserved ? 'reserved' : 'free'}
            </p>
        </div>
    )
}

export default Gift;