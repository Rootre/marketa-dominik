import React, {useEffect, useState} from 'react';
import classNames from 'classnames';

import Gift from 'Components/Gift';

import GiftPrototype from 'Prototypes/Gift';

import globalStyles from 'Sass/global.scss';
import styles from './styles.scss';

const gift = new GiftPrototype();

function Gifts() {
    const [gifts, setGifts] = useState([]);

    const fetchGifts = async () => {
        const data = await gift.getAll();
        setGifts(data);
    };

    useEffect(() => {
        fetchGifts();
    }, []);

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