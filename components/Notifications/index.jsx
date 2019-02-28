import React from 'react';
import classNames from 'classnames';

import useGlobalMap from 'Hooks/useGlobalMap';

import globalStyles from 'Sass/global.scss';
import styles from './styles.scss';

function Notifications() {
    const [notifications] = useGlobalMap('notifications');

    return (
        <div className={classNames(globalStyles.wrapper, styles.wrapper)}>
            {[...notifications.entries()].map((notification, index) => (
                <div className={styles.notification} key={index}>
                    {notification}
                </div>
            ))}
        </div>
    )
}

export default Notifications;