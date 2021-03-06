import React from 'react';
import classNames from 'classnames';

import Bits from 'Components/Bits';

import globalStyles from 'Sass/global.scss';
import styles from './styles.scss';

function OurStory({bits}) {
    return (
        <div className={classNames(globalStyles.wrapper, styles.wrapper)}>
            <h2 className={globalStyles.heading}>Naše cesta</h2>
            <Bits bits={bits}/>
        </div>
    )
}

export default OurStory;