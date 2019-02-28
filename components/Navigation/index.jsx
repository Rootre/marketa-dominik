import React from 'react';
import {useGlobal} from 'reactn';
import classNames from 'classnames';
import {Waypoint} from 'react-waypoint';

import globalStyles from 'Sass/global.scss';
import styles from './styles.scss';

function Navigation({children}) {
    const [, setActiveItem] = useGlobal('activeItem');

    const activateWaypoint = (item, id) => {
        self.location.hash = `#${id}`;
        setActiveItem(item);
    };

    return (
        <div className={classNames(globalStyles.wrapper, styles.wrapper)}>
            {React.Children.map(children, (child, index) => (
                <Waypoint
                    bottomOffset={'40%'}
                    onEnter={() => activateWaypoint(index, child.props.id || `nav-${index}`)}
                    topOffset={'59%'}
                >
                    {child.props.id
                        ? child
                        : (
                            <div id={`nav-${index}`}>
                                {child}
                            </div>
                        )
                    }
                </Waypoint>
            ))}
        </div>
    )
}

export default Navigation;