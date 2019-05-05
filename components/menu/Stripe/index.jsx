import React, {useState} from 'react';
import {useGlobal} from 'reactn';
import classNames from 'classnames';
import {Waypoint} from 'react-waypoint';

import styles from './styles.scss';

function Stripe({items}) {
    const [isPinned, setIsPinned] = useState(false);
    const [activeItem] = useGlobal('activeItem');
    const [isLogged] = useGlobal('isLogged');

    return (
        <Waypoint onLeave={() => setIsPinned(true)} onEnter={() => setIsPinned(false)} topOffset={64}>
            <div className={styles.wrapper}>
                <ul className={classNames(styles.menu, {
                    [styles.pinned]: isPinned,
                })}>
                    {items.map(({admin, link, title}, index) => (!admin || isLogged) && (
                        <li key={index}>
                            <a href={link}
                               className={classNames({
                                   [styles.active]: index === activeItem,
                               })}
                            >{title}</a>
                        </li>
                    ))}
                </ul>
            </div>
        </Waypoint>
    )
}

export default Stripe;