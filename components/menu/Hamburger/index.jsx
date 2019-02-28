import React, {useState} from 'react';

import Transition from 'Components/Transition';
import HamburgerSvg from 'Svg/hamburger.svg';
import CloseSvg from 'Svg/close.svg';

import styles from './styles.scss';

function Hamburger({items}) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className={styles.wrapper}>
            <Transition name={'fade'}>
                {isOpen && (
                    <ul className={styles.menu}>
                        {items.map(({link, title}) => (
                            <li key={link}>
                                <a href={link} onClick={() => setIsOpen(false)}>{title}</a>
                            </li>
                        ))}
                    </ul>
                )}
            </Transition>
            {isOpen
                ? <CloseSvg className={styles.close} onClick={() => setIsOpen(false)}/>
                : <HamburgerSvg className={styles.hamburger} onClick={() => setIsOpen(true)}/>
            }
        </div>
    )
}

export default Hamburger;