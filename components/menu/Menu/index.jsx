import React from 'react';
import {useGlobal} from 'reactn';

import Hamburger from '../Hamburger';
import Stripe from '../Stripe';

import {isAboveTablet} from 'Helpers/client'

import styles from './styles.scss';

function Menu() {
    const [breakpoint] = useGlobal('breakpoint');

    return (
        <div className={styles.wrapper}>
            {isAboveTablet(breakpoint)
            ? <Stripe/>
            : <Hamburger/>}
        </div>
    )
}

export default Menu;