import React from 'react';

import styles from './styles.scss';

function Stripe({items}) {
    return (
        <div className={styles.wrapper}>
            <ul className={styles.menu}>
                {items.map(({link, title}) => (
                    <li key={link}>
                        <a href={link}>{title}</a>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Stripe;