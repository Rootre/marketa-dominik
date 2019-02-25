import React from 'react';

import Bit from 'Components/Bit';

import styles from './styles.scss';

function Bits({bits}) {
    return (
        <div className={styles.wrapper}>
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
    )
}

export default Bits;