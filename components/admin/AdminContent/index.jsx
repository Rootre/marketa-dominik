import React from 'react';
import classNames from 'classnames';

import AdminAttendees from 'Components/admin/AdminAttendees';
import AdminGifts from 'Components/admin/AdminGifts';

import globalStyles from 'Sass/global.scss';
import styles from './styles.scss';

function Admin() {
    return (
        <div className={classNames(globalStyles.wrapper, styles.wrapper)}>
            <h1>Vítej v administraci</h1>

            <AdminGifts/>
            <AdminAttendees/>
        </div>
    )
}

export default Admin;