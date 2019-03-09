import React from 'react';
import classNames from 'classnames';

import useGlobalMap from 'Hooks/useGlobalMap';

import globalStyles from 'Sass/global.scss';
import styles from './styles.scss';

function AttendeeList() {
    const [attendees] = useGlobalMap('attendees');

    return (
        <div className={classNames(globalStyles.wrapper, styles.wrapper)}>
            <h2 className={globalStyles.heading}>Kdo přijde</h2>
            <ul className={styles.list}>
                {[...attendees.values()].map(({_id, guests, name}) => (
                    <li className={styles.attendee} key={_id}>
                        {name} {guests > 0 && `(+${guests})`}
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default AttendeeList;