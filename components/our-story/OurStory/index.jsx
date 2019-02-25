import React from 'react';
import classNames from 'classnames';

import Bit from '../Bit';

import globalStyles from 'Sass/global.scss';
import styles from './styles.scss';

function OurStory({bits}) {
    return (
        <div className={classNames(globalStyles.wrapper, styles.wrapper)}>
            <h2>Naše cesta</h2>
            <div className={styles.bits}>
                {bits.map(({image, text, title}, index) => (
                    <Bit
                        key={title}
                        even={index % 2 === 0}
                        image={image}
                        text={text}
                        title={title}
                    />
                ))}
            </div>
        </div>
    )
}

export default OurStory;