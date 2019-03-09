import React from 'react';
import classNames from 'classnames';

import AttendeeList from 'Components/AttendeeList';

import useGlobalMap from 'Hooks/useGlobalMap';

import globalStyles from 'Sass/global.scss';
import styles from './styles.scss';

function AdminAttendees() {
    const [attendees] = useGlobalMap('attendees');

    return (
        <div className={classNames(globalStyles.wrapper, styles.wrapper)}>
            <h2>Správa účastníků ({[...attendees.values()].reduce((res, {guests}) => {
                res += 1 + guests;

                return res;
            }, 0)})</h2>

            <AttendeeList isAdmin={true} attendees={attendees}/>
        </div>
    )
}

export default AdminAttendees;