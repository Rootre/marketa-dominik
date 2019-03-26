import React from 'react';
import classNames from 'classnames';
import LazyLoad from 'react-lazyload';

import Spinner from 'Components/Spinner';

import styles from './styles.scss';

const LazyImage = ({className, height, offset = 400, once = true, overflow = false, src, ...rest}) => {
    return (
        <LazyLoad height={height}
                  offset={offset}
                  once={once}
                  overflow={overflow}
                  placeholder={<Spinner/>}>
            <img className={classNames(styles.image, className)} src={src} height={height} {...rest}/>
        </LazyLoad>
    );
};

export default LazyImage;