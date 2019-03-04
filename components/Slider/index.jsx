import React from 'react';
import Slick from 'react-slick';

import styles from './styles.scss';

function Slider({className, slides}) {
    return (
        <div className={styles.wrapper}>
            <Slick
                arrows={false}
                autoplay
                autoplaySpeed={10000}
                fade
                lazyLoad={'progressive'}
                className={className}
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