import React from 'react';
import classNames from 'classnames';

import WreathSvg from 'Svg/wreath.svg';

import styles from './styles.scss';

function Claim({date, heading}) {
    date = new Date(date);

    return (
        <div className={styles.wrapper}>
            <div className={styles.claim}>
                <WreathSvg className={classNames(styles.wreath, styles.up)}/>
                <h1 className={styles.heading}>{heading}</h1>
                <p className={styles.date}>{date.getDate()}. {date.getMonth() + 1}. {date.getFullYear()}</p>
                <WreathSvg className={classNames(styles.wreath, styles.down)}/>
            </div>
        </div>
    )
}

export default Claim;