import React from 'react';
import GridGallery from 'react-grid-gallery';
import classNames from 'classnames';

import globalStyles from 'Sass/global.scss';
import styles from './styles.scss';

function Gallery({images}) {
    return (
        <div className={classNames(globalStyles.wrapper, styles.wrapper)}>
            <h2 className={globalStyles.heading}>Galerie</h2>
            <GridGallery images={images.map(({thumb: thumbnail, url: src}) => ({
                caption: '',
                src,
                thumbnail,
                thumbnailWidth: 120,
                thumbnailHeight: 120,
            }))}/>
        </div>
    )
}

export default Gallery;