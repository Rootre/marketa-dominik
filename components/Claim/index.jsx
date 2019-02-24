import React from 'react';
import classNames from 'classnames';

import WreathSvg from 'Svg/wreath.svg';

import styles from './styles.scss';

function Claim({date, heading}) {
    return (
        <div className={styles.wrapper}>
            <WreathSvg className={classNames(styles.wreath, styles.up)}/>
            <h1 className={styles.heading}>{heading}</h1>
            <p className={styles.date}>{date}</p>
            <WreathSvg className={classNames(styles.wreath, styles.down)}/>
        </div>
    )
}

export default Claim;