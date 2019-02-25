import React from 'react';
import classNames from 'classnames';

import styles from './styles.scss';

function Bride({bride, groom, image, text, title}) {
    return (
        <div className={styles.wrapper}>
            <img src={image} alt={title}/>
            <div className={classNames(styles.content, {
                [styles.bride]: bride,
                [styles.groom]: groom,
            })}>
                <h3 className={styles.heading}>{title}</h3>
                <p>{text}</p>
            </div>
        </div>
    )
}

export default Bride;