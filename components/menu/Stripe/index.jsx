import React, {useState} from 'react';
import {useGlobal} from 'reactn';
import classNames from 'classnames';

import styles from './styles.scss';
import {Waypoint} from "react-waypoint";

function Stripe({items}) {
    const [isPinned, setIsPinned] = useState(false);
    const [activeItem] = useGlobal('activeItem');

    const pinStripe = (e) => {
        setIsPinned(true);
    };

    return (
        <Waypoint onLeave={pinStripe} topOffset={64}>
            <div className={classNames(styles.wrapper, {
                [styles.pinned]: isPinned,
            })}>
                <ul className={styles.menu}>
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