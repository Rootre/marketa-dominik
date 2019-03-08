import React from 'react';
import classNames from 'classnames';

import Gift from 'Components/Gift';

import useGlobalMap from 'Hooks/useGlobalMap';

import globalStyles from 'Sass/global.scss';
import styles from './styles.scss';

function Gifts() {
    const [gifts] = useGlobalMap('gifts');
    const giftArray = [...gifts.values()];

    return (
        <div className={classNames(globalStyles.wrapper, styles.wrapper)}>
            <h2 className={globalStyles.heading}>Dary</h2>
            <p>Největším darem bude, když přijdete na náš svatební den a budete se radovat spolu s námi.</p>
            <p>Pokud byste nás chtěli něčím obdarovat, zde je pár darů, které by se nám hodily. Jinak necháme prostor vaší fantazii. Finanční dary neodmítáme 😀</p>
            <div className={styles.gifts}>
                {giftArray.length > 0 ? giftArray.map((gift) => (
                    <Gift key={gift._id} gift={gift}/>
                )) : (
                    <p className={styles.empty}><em>Doplňujeme...</em></p>
                )}
            </div>
        </div>
    )
}

export default Gifts;