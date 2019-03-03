import React, {useEffect, useState} from 'react';
import classNames from 'classnames';

import useInterval from 'Hooks/useInterval';

import styles from './styles.scss';

function Slider({className, slides}) {
    const [activeIndex, setActiveIndex] = useState(0);
    const slide = slides[activeIndex];
    const imgRef = React.createRef();

    const _beforeChange = () => {
        if (!imgRef.current) {
            return;
        }

        imgRef.current.style.opacity = 0;
    };
    const _tick = () => {
        let index = activeIndex + 1;

        if (index >= slides.length) {
            index = 0;
        }

        _beforeChange();
        setTimeout(() => setActiveIndex(index), 200);
    };

    useInterval(_tick, 10000);
    useEffect(() => {
        if (!imgRef.current) {
            return;
        }

        imgRef.current.style.opacity = 1;
    });

    return (
        <div className={classNames(className, styles.wrapper)}>
            <img className={styles.image} ref={imgRef} src={slide.image} alt={slide.alt}/>
        </div>
    )
}

export default Slider;