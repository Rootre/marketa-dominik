import React from 'react';
import classNames from 'classnames';

import Hook from 'Components/Hook';
import Persona from '../Persona';

import bride from 'Consts/about-us/bride';
import groom from 'Consts/about-us/groom';

import globalStyles from 'Sass/global.scss';
import styles from './styles.scss';

function AboutUs() {
    return (
        <div className={classNames(globalStyles.wrapper, styles.wrapper)}>
            <h2 className={globalStyles.heading}><Hook name={'My'}/></h2>
            <div className={styles.us}>
                <Persona
                    image={bride.image}
                    text={bride.text}
                    title={bride.title}
                    author={bride.author}
                    bride
                />
                <Persona
                    image={groom.image}
                    text={groom.text}
                    title={groom.title}
                    author={groom.author}
                    groom
                />
            </div>
        </div>
    )
}

export default AboutUs;