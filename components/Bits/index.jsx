import React from 'react';

import Bit from 'Components/Bit';

import styles from './styles.scss';

function Bits({bits}) {
    return (
        <div className={styles.wrapper}>
            {bits.map((bit, index) => (
                <Bit
                    key={index}
                    even={index % 2 === 0}
                    {...bit}
                />
            ))}
        </div>
    )
}

export default Bits;