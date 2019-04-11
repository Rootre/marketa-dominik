import React from 'react';
import classNames from 'classnames';

import AdminAttendees from 'Components/admin/AdminAttendees';
import AdminHooks from 'Components/admin/AdminHooks';
import AdminGallery from 'Components/admin/AdminGallery';
import AdminGifts from 'Components/admin/AdminGifts';
import Logout from 'Components/admin/Logout';

import globalStyles from 'Sass/global.scss';
import styles from './styles.scss';

function Admin() {
    return (
        <div className={classNames(globalStyles.wrapper, styles.wrapper)}>
            <Logout/>
            <h1>Vítej v administraci</h1>

            <AdminGifts/>
            <AdminAttendees/>
            <AdminHooks/>
            <AdminGallery/>
        </div>
    )
}

export default Admin;