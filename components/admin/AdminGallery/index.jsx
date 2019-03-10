import React from 'react';
import classNames from 'classnames';

import AsyncComponent from 'Components/AsyncComponent';

import globalStyles from 'Sass/global.scss';
import styles from './styles.scss';

function AdminGallery() {
    return (
        <div className={classNames(globalStyles.wrapper, styles.wrapper)}>
            <h2>Správa fotogalerie</h2>
            <AsyncComponent load={() => import('Components/FormUploadImages')}/>
        </div>
    )
}

export default AdminGallery;