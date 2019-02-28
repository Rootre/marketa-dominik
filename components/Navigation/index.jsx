import React from 'react';
import {useGlobal} from 'reactn';
import classNames from 'classnames';
import {Waypoint} from 'react-waypoint';

import globalStyles from 'Sass/global.scss';
import styles from './styles.scss';

function Navigation({children}) {
    const [, setActiveItem] = useGlobal('activeItem');

    const activateWaypoint = (item, e) => {
        console.log(e);
        setActiveItem(item);
    };

    return (
        <div className={classNames(globalStyles.wrapper, styles.wrapper)}>
            {React.Children.map(children, (child, index) => (
                <Waypoint
                    onEnter={e => activateWaypoint(index, e)}
                    onLeave={e => activateWaypoint(index - 1, e)}
                >
                    {child}
                </Waypoint>
            ))}
        </div>
    )
}

export default Navigation;