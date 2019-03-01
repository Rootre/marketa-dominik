import React from 'react';
import classNames from 'classnames';

import Gift from 'Components/Gift';

import useGlobalMap from 'Hooks/useGlobalMap';

import globalStyles from 'Sass/global.scss';
import styles from './styles.scss';

function Gifts() {
    const [gifts] = useGlobalMap('gifts');

    return (
        <div className={classNames(globalStyles.wrapper, styles.wrapper)}>
            <h2 className={globalStyles.heading}>Dary</h2>
            {[...gifts.values()].map((gift) => (
                <Gift key={gift._id} gift={gift}/>
            ))}
        </div>
    )
}

export default Gifts;