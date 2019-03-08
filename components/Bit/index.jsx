import React from 'react';
import classNames from 'classnames';

import LazyImage from 'Components/LazyImage';
import GoogleMap from 'Components/GoogleMap';

import styles from './styles.scss';

function Bit({even, image, map, text, title}) {
    return (
        <div className={classNames(styles.wrapper, {
            [styles.even]: even,
        })}>
            <div className={styles.content}>
                <h3 className={styles.heading}>{title}</h3>
                {text && <div className={styles.text} dangerouslySetInnerHTML={{__html: text}}/>}
                {map && <GoogleMap className={styles.map} {...map}/>}
            </div>
            <LazyImage className={styles.image} src={image} alt={title}/>
        </div>
    )
}

export default Bit;