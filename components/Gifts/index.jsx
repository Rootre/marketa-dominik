import React from 'react';
import classNames from 'classnames';

import Gift from 'Components/Gift';

import GiftPrototype from 'Prototypes/Gift';

import globalStyles from 'Sass/global.scss';
import styles from './styles.scss';

async function Gifts() {
    const gift = new GiftPrototype();
    const gifts = await gift.getAll();

    return (
        <div className={classNames(globalStyles.wrapper, styles.wrapper)}>
            <h2 className={globalStyles.heading}>Dary</h2>
            {gifts.map((gift) => (
                <Gift gift={gift}/>
            ))}
        </div>
    )
}

export default Gifts;