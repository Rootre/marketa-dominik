import React from 'react';

import styles from './styles.scss';

function Marker({lat, lng, text}) {
    return (
        <a
            className={styles.wrapper}
            data-text={text}
            href={`https://www.google.com/maps/search/?api=1&query=${lat},${lng}`}
            target={'_blank'}
        />
    )
}

export default Marker;