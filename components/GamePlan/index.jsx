import React from 'react';
import classNames from 'classnames';

import Bits from 'Components/Bits';

import globalStyles from 'Sass/global.scss';
import styles from './styles.scss';

function GamePlan({bits}) {
    return (
        <div className={classNames(globalStyles.wrapper, styles.wrapper)}>
            <h2 className={globalStyles.heading}>Plán dne</h2>
            <Bits bits={bits}/>
        </div>
    )
}

export default GamePlan;