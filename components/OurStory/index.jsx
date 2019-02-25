import React from 'react';
import classNames from 'classnames';

import globalStyles from 'Sass/global.scss';
import styles from './styles.scss';
import Bits from "../Bits";

function OurStory({bits}) {
    return (
        <div className={classNames(globalStyles.wrapper, styles.wrapper)}>
            <h2>Naše cesta</h2>
            <Bits bits={bits}/>
        </div>
    )
}

export default OurStory;