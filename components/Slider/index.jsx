import React from 'react';
import {useGlobal} from 'reactn';
import Slick from 'react-slick';

import styles from './styles.scss';

const INITIAL_SLIDE = 0;

function Slider({className, slides}) {
    const [, setIsSliderLight] = useGlobal('isSliderLight');

    return (
        <div className={styles.wrapper}>
            <Slick
                arrows={false}
                autoplay
                autoplaySpeed={10000}
                beforeChange={(_, index) => setIsSliderLight(!!slides[index].light)}
                className={className}
                fade
                initialSlide={INITIAL_SLIDE}
                lazyLoad={'progressive'}
                onInit={() => setIsSliderLight(!!slides[INITIAL_SLIDE].light)}
                pauseOnHover={false}
                speed={800}
            >
                {slides.map(slide => (
                    <div key={slide.image} className={styles.slide}>
                        <img className={styles.image} src={slide.image} alt={slide.alt}/>
                    </div>
                ))}
            </Slick>
        </div>
    )
}

export default Slider;