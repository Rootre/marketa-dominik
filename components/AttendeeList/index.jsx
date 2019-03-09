import React from 'react';
import classNames from 'classnames';

import useGlobalMap from 'Hooks/useGlobalMap';

import globalStyles from 'Sass/global.scss';
import styles from './styles.scss';

function AttendeeList() {
    const [attendees] = useGlobalMap('attendees');

    return (
        <div className={classNames(globalStyles.wrapper, styles.wrapper)}>
            <h3>Kdo přijde</h3>
            <ul>
                {[...attendees.values()].map(({_id, guests, name}) => (
                    <li key={_id}>
                        {name} {guests > 0 && `(+${guests})`}
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default AttendeeList;