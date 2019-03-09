import React from 'react';
import classNames from 'classnames';

import CloseSVG from 'Svg/close.svg';

import useGlobalMap from 'Hooks/useGlobalMap';

import globalStyles from 'Sass/global.scss';
import styles from './styles.scss';
import AttendeePrototype from "../../prototypes/Attendee";
import {useGlobal} from "reactn";

function AttendeeList({attendees, isAdmin}) {
    const [, , deleteAttendee] = useGlobalMap('attendees');
    const [, addNotification] = useGlobal('notifications');

    if (attendees.size === 0) {
        return null;
    }

    const removeAttendee = async id => {
        if (!confirm('Opravdu smazat?')) {
            return;
        }

        const attendee = new AttendeePrototype();

        try {
            await attendee.deleteOne(id);

            deleteAttendee(id);
        } catch (e) {
            addNotification(e.message, 'error');
        }
    };

    return (
        <div className={classNames(globalStyles.wrapper, styles.wrapper)}>
            <h2 className={globalStyles.heading}>Kdo přijde</h2>
            <ul className={styles.list}>
                {[...attendees.values()].map(({_id, guests, name}) => (
                    <li className={styles.attendee} key={_id}>
                        {name} {guests > 0 && `(+${guests})`}
                        {isAdmin && (
                            <span className={styles.delete} onClick={() => removeAttendee(_id)}>
                                <CloseSVG/>
                            </span>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default AttendeeList;