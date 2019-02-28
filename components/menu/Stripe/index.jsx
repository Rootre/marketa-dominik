import React, {useState} from 'react';
import {useGlobal} from 'reactn';
import classNames from 'classnames';

import styles from './styles.scss';
import {Waypoint} from "react-waypoint";

function Stripe({items}) {
    const [isPinned, setIsPinned] = useState(false);
    const [activeItem] = useGlobal('activeItem');

    return (
        <Waypoint onLeave={() => setIsPinned(true)} onEnter={() => setIsPinned(false)} topOffset={64}>
            <div className={styles.wrapper}>
                <ul className={classNames(styles.menu, {
                    [styles.pinned]: isPinned,
                })}>
                    {items.map(({link, title}, index) => (
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