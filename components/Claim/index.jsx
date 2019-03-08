import React, {useEffect, useState} from 'react';
import {useGlobal} from 'reactn';
import classNames from 'classnames';

import Slider from 'Components/Slider';
import WreathSvg from 'Svg/wreath_animated.svg';

import slides from 'Consts/slides';

import styles from './styles.scss';
import Transition from "../Transition";

function Claim({date, heading}) {
    const [isSliderLight] = useGlobal('isSliderLight');
    const [isLoaded, setIsLoaded] = useState(false);

    date = new Date(date);

    useEffect(() => {
        setIsLoaded(true);
    }, []);

    return (
        <div className={styles.wrapper}>
            <Slider className={styles.slider} slides={slides}/>
            <div className={classNames(styles.claim, {
                [styles.light]: isSliderLight,
            })}>
                <WreathSvg className={classNames(styles.wreath, styles.up)}/>
                <Transition name={'slideLeft'}>
                    {isLoaded && (
                        <div>
                            <h1 className={styles.heading}>{heading}</h1>
                            <p className={styles.date}>{date.getDate()}. {date.getMonth() + 1}. {date.getFullYear()}</p>
                        </div>
                    )}
                </Transition>
                <WreathSvg className={classNames(styles.wreath, styles.down)}/>
            </div>
        </div>
    )
}

export default Claim;