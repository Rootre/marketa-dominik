import React, {useEffect, useState} from 'react';
import Dropzone from 'dropzone';
import classNames from 'classnames';

import {IMAGE_UPLOAD_URL} from 'Api/urls';

import globalStyles from 'Sass/global.scss';
import styles from './styles.scss';

const CONTAINER_ID = 'imageUploadZone';
const DROPZONE_SETTINGS = {
    thumbnailWidth: 100,
    thumbnailHeight: 100,
    parallelUploads: 20,
};

console.log('env:', process.env.NODE_ENV);

function FormUploadImages() {
    const [dropzone, setDropzone] = useState(null);

    useEffect(() => {
        setDropzone(new Dropzone(`#${CONTAINER_ID}`, {url: IMAGE_UPLOAD_URL}))
    }, []);

    return (
        <div id={CONTAINER_ID} className={classNames(globalStyles.wrapper, styles.wrapper)}>
            <p>Přatáhni fotky sem</p>
        </div>
    )
}

export default FormUploadImages;