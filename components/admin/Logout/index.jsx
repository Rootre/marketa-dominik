import React from 'react';
import {useGlobal} from 'reactn';

import UserPrototype from 'Prototypes/User';

import SwitchSVG from 'Svg/switch.svg';

import styles from './styles.scss';

function Logout() {
    const [, setIsLogged] = useGlobal('isLogged');

    const handleLogout = () => {
        const userModel = new UserPrototype('admin');

        userModel.logout();
        setIsLogged(false);
    };

    return (
        <div className={styles.wrapper}>
            <span className={styles.logout} title={'Odhlásit'} onClick={handleLogout}>
                <SwitchSVG/>
            </span>
        </div>
    )
}

export default Logout;