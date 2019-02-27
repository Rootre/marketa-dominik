import React from 'react';
import classNames from 'classnames';

import Persona from '../Persona';

import globalStyles from 'Sass/global.scss';
import styles from './styles.scss';

function AboutUs() {
    return (
        <div className={classNames(globalStyles.wrapper, styles.wrapper)}>
            <h2 className={globalStyles.heading}>My</h2>
            <div className={styles.us}>
                <Persona
                    image={'https://via.placeholder.com/700x500'}
                    text={'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'}
                    title={'O Markétě'}
                    bride
                />
                <Persona
                    image={'https://via.placeholder.com/700x500'}
                    text={'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'}
                    title={'O Dominikovi'}
                    groom
                />
            </div>
        </div>
    )
}

export default AboutUs;